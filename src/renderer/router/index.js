import Vue from 'vue';
import Router from 'vue-router';
import screens from '../components/Redis/';

Vue.use(Router);

const {
  Watch, Query, Insert, Sets, History, PubSub, Zsets, Editor,
} = screens;
export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: require('@/components/LandingPage').default,
  },
  {
    path: '/watch',
    name: 'watch',
    component: Watch,
  },
  {
    path: '/sets',
    name: 'sets',
    component: Sets,
  },
  {
    path: '/zsets',
    name: 'zsets',
    component: Zsets,
  },
  {
    path: '/insert',
    name: 'insert',
    component: Insert,
  },
  {
    path: '/query',
    name: 'query',
    component: Query,
  },
  {
    path: '/history/:type/:key',
    name: 'history',
    component: History,
  },
  {
    path: '/pubsub',
    name: 'pubsub',
    component: PubSub,
  },
  {
    path: '/lua',
    name: 'lua',
    component: Editor,
  },
  {
    path: '*',
    redirect: '/',
  },
  ],
});
