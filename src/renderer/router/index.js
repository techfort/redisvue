import Vue from 'vue';
import Router from 'vue-router';
import screens from '../components/Redis/';

Vue.use(Router);

const {
  Watch, Query, Insert, Sets, History, PubSub,
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
    path: '*',
    redirect: '/',
  },
  ],
});
