import Vuex from 'vuex';
import Vue from 'vue';
import { createClient } from 'redis';
import { promisifyAll } from 'bluebird';
import to, { entry, TYPES, GETTERS } from '../helpers';

Vue.use(Vuex);

const state = {
  redisURL: '',
  isConnected: false,
  redis: null,
  client: null,
  errors: [],
  entries: [],
  string: {},
  hash: {},
  set: {},
  zset: {},
  list: {},
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

const initClient = (state, client) => {
  state.redis = client;
  state.client = promisifyAll(createClient({ url: state.redisURL }));
  state.redis.psubscribe('__keyspace@0__:*');
  state.redis.on('pmessage', async (_pattern, ch, op) => {
    const key = k(ch);
    const type = TYPES[op];
    if (op === 'expire' ||
    op === 'del'
    ) {
      return;
    }
    const { err, data } = await to(state.client[GETTERS[type]](key));
    if (err) {
      return;
    }
    const e = entry(key, type, data);
    addEntry(state, e);
  });
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
  DISCONNECT(state, err) {
    state.client.quit();
    state.redis.quit();
    state.redis = null;
    state.client = null;
    state.errors.push(err);
    return state;
  },
  SET_URL(state, url) {
    state.redisURL = url;
    return state;
  },
};

const actions = {
  connect({ commit }, e) {
    commit('CONNECT', e);
  },
  disconnect({ commit }, err) {
    commit('DISCONNECT', err);
  },
  setUrl({ commit }, e) {
    commit('SET_URL', e);
  },
  addEvent({ commit }, e) {
    commit('ADD_ENTRY', e);
  },
};

const getters = {
  URL: state => state.redisURL,
  REDIS: state => state.redis,
  CONNECTED: state => (state.redis ? state.redis.connected : false),
  EVENTS: state => state.entries,
  CLIENT: state => state.client,
  SET: state => state.set,
  HASH: state => state.hash,
  STRING: state => state.string,
  getKeyHistory: state => (type, key) => state[type][key].history,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

