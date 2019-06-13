import Vuex from 'vuex';
import Vue from 'vue';
import { createClient } from 'redis';
import { promisifyAll } from 'bluebird';
import to, { entry, TYPES, GETTERS } from '../helpers';

Vue.use(Vuex);

const state = {
  redisURL: '',
  db: 0,
  pattern: '*',
  isConnected: false,
  redis: null,
  client: null,
  ps: null,
  errorMessage: '',
  errors: [],
  entries: [],
  string: {},
  hash: {},
  set: {},
  zset: {},
  list: {},
  del: {},
  expire: {},
  messages: {},
  pschannels: [],
  subchannels: [],
  publisher: null,
  script: 'return redis.call("PUBLISH", "dbg_lua", "test")',
};

const k = str => str.replace('__keyspace@0__:', '');
const addEntry = (state, e) => {
  state.entries.unshift(e);
  if (!state[e.type][e.key]) {
    state[e.type][e.key] = Object.assign({}, {
      current: null,
      history: [],
    });
  }
  state[e.type][e.key].current = e;
  state[e.type][e.key].history.unshift(e);
  return state;
};

const loadChannels = async (state) => {
  if (!state.redis) {
    return state;
  }
  state.pschannels = [];
  const { data, error } = await to(state.client.pubsubAsync('CHANNELS', '*'));
  if (!error) {
    state.pschannels = data;
  }
  return state;
};

const initClient = async (state, client) => {
  state.redis = client;
  state.client = await promisifyAll(createClient({ url: state.redisURL }));
  const { error } = await to(state.client.send_commandAsync('config', ['set', 'notify-keyspace-events', 'KEA']));
  if (error) {
    state.errors.push(error);
  }
  state.client.zget = key => state.client.zrangeAsync(key, 0, -1, 'WITHSCORES');
  state.client.getList = key => state.client.lrangeAsync(key, 0, -1);
  await state.redis.psubscribe(`__keyspace@${state.db}__:${state.pattern}`);
  state.redis.on('pmessage', async (_pattern, ch, op) => {
    const key = k(ch);
    const type = TYPES[op];
    if (op === 'expire') {
      const { error, data } = await to(state.client.ttlAsync(key));
      if (error) {
        return;
      }
      const date = new Date();
      addEntry(state, entry(key, op, `TTL at ${date.toUTCString()}: ${data}`));
      return;
    }
    if (op === 'del') {
      addEntry(state, entry(key, op, {}));
      return;
    }
    if (!GETTERS[type]) {
      return;
    }
    const { error, data } = await to(state.client[GETTERS[type]](key));
    if (error) {
      return;
    }
    const e = entry(key, type, data);
    addEntry(state, e);
  });
  state = await loadChannels(state);
  return state;
};

const initPS = async (state) => {
  if (state.ps && state.ps.connected) {
    return state;
  }
  state.ps = promisifyAll(createClient({ url: state.redisURL }));
  state.ps.on('message', (channel, message) => {
    if (!state.messages) {
      state.messages = [];
    }
    state.messages.unshift(entry(state.messages.length, channel, message));
  });
  state.messages = [];
  state.ps.on('error', (err) => {
    state.errorMessage = err;
    state.ps = null;
  });
  return state;
};

const subscribe = async (state, channel) => {
  state = await initPS(state);
  await state.ps.subscribeAsync(channel);
  // TODO: error handling of subscription failure
  state.subchannels.push(channel);
  return state;
};

const unsubscribe = async (state, channel) => {
  if (state.subchannels.indexOf(channel) === -1) {
    return state;
  }
  state = await initPS(state);
  await state.ps.unsubscribeAsync(channel);
  const index = state.subchannels.indexOf(channel);
  state.subchannels.splice(index, 1);
  return state;
};

const publish = async (state, { channel, message }) => {
  if (!state.publisher || !state.publisher.connected) {
    state.publisher = promisifyAll(createClient({ url: state.redisURL }));
  }
  await state.publisher.publishAsync(channel, message);
  return state;
};

const mutations = {
  ADD_ENTRY(state, e) {
    state = addEntry(state, e);
    return state;
  },
  CONNECT(state, e) {
    state = initClient(state, e);
    return state;
  },
  SET_ERROR_MSG(state, e) {
    state.errorMessage = e;
    return state;
  },
  DISCONNECT(state, err) {
    if (state.client) {
      state.client.quit();
    }
    if (state.redis) {
      state.redis.quit();
    }
    state.redis = null;
    state.client = null;
    state.errors.push(err);
    return state;
  },
  SET_URL(state, url) {
    state.redisURL = url;
    return state;
  },
  SET_PATTERN(state, pattern) {
    state.pattern = pattern;
    return state;
  },
  SET_DB(state, db) {
    state.db = db;
    return state;
  },
  RESET(state) {
    state.errors = [];
    state.entries = [];
    state.hash = {};
    state.list = {};
    state.zset = {};
    state.set = {};
    state.string = {};
    state.messages = {};
    return state;
  },
  SUB(state, channel) {
    state = subscribe(state, channel);
    return state;
  },
  UNSUB(state, channel) {
    state = unsubscribe(state, channel);
    return state;
  },
  LOAD_CHANNELS(state) {
    return loadChannels(state);
  },
  LOG_ERROR(state, err) {
    state.errors.push(err);
    return state;
  },
  CLEAR_MESSAGES(state) {
    state.messages = [];
    return state;
  },
  PUBLISH(state, obj) {
    state = publish(state, obj);
    return state;
  },
  LUA_CHANGE(state, script) {
    state.script = script;
    return state;
  },
};

const actions = {
  connect({ commit }, e) {
    commit('CONNECT', e);
  },
  reset({ commit }) {
    commit('RESET');
  },
  setErrorMessage({ commit }, err) {
    commit('SET_ERROR_MSG', err);
  },
  disconnect({ commit }, err) {
    commit('DISCONNECT', err);
  },
  setUrl({ commit }, e) {
    commit('SET_URL', e);
  },
  setPattern({ commit }, pattern) {
    commit('SET_PATTERN', pattern);
  },
  setDb({ commit }, db) {
    commit('SET_DB', db);
  },
  addEvent({ commit }, e) {
    commit('ADD_ENTRY', e);
  },
  subscribe({ commit }, channel) {
    commit('SUB', channel);
  },
  unsubscribe({ commit }, channel) {
    commit('UNSUB', channel);
  },
  loadChannels({ commit }) {
    commit('LOAD_CHANNELS');
  },
  logError({ commit }, err) {
    commit('LOG_ERROR', err);
  },
  clearMessages({ commit }) {
    commit('CLEAR_MESSAGES');
  },
  publish({ commit }, obj) {
    commit('PUBLISH', obj);
  },
  luaChange({ commit }, script) {
    commit('LUA_CHANGE', script);
  },
};

const getters = {
  URL: state => state.redisURL,
  REDIS: state => state.redis,
  ERRORS: state => state.errors,
  CONNECTED: state => (state.redis ? state.redis.connected : false),
  EVENTS: state => state.entries,
  CLIENT: state => state.client,
  SET: state => state.set,
  HASH: state => state.hash,
  ZSET: state => state.zset,
  LIST: state => state.list,
  STRING: state => state.string,
  getKeyHistory: state => (type, key) => state[type][key].history,
  INFO: state => state.redis.server_info,
  ERROR_MSG: state => state.errorMessage,
  PUBSUB: (state) => {
    if (!state.messages) {
      state.messages = [];
    }
    return state.messages;
  },
  CHANNELS: state => state.pschannels,
  MESSAGES: state => state.messages,
  SUBCHANNELS: state => state.subchannels,
  SCRIPT: state => state.script,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

