/*
import Vue from 'vue';
import Vuex from 'vuex';

import { createPersistedState, createSharedMutations } from 'vuex-electron';

import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState(),
    createSharedMutations(),
  ],
  strict: process.env.NODE_ENV !== 'production',
});
*/
/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

/*
const files = require.context('.', false, /\.js$/);
const modules = {};

files.keys().forEach((key) => {
  if (key === './index.js') return;
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

export default modules;
*/
import Vuex from 'vuex';
import Vue from 'vue';
import { createClient } from 'redis';
import { promisifyAll } from 'bluebird';
import to, { entry, TYPES, OPS } from '../helpers';

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
  state[e.type][e.key].history.push(e);
  return state;
};

const initClient = (state, client) => {
  state.redis = client;
  state.client = promisifyAll(createClient({ url: state.redisURL }));
  state.redis.psubscribe('__keyspace@0__:*');
  state.redis.on('pmessage', async (pattern, ch, op) => {
    const key = k(ch);
    const type = TYPES[op];
    const { err, data } = await to(state.client[OPS[op]](key));
    if (err) {
      return;
    }
    const e = entry(key, type, data);
    addEntry(state, e);
  });
};

const mutations = {
  ADD_ENTRY(state, e) {
    state = addEntry(state, e);
  },
  CONNECT(state, e) {
    initClient(state, e);
  },
  DISCONNECT(state, err) {
    state.client.quit();
    state.redis.quit();
    state.redis = null;
    state.client = null;
    state.errors.push(err);
  },
  SET_URL(state, url) {
    state.redisURL = url;
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
  REDIS: state => state.redis,
  CONNECTED: state => (state.redis ? state.redis.connected : false),
  EVENTS: state => state.entries,
  CLIENT: state => state.client,
  SETS: state => state.set,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

