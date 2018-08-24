import Vue from 'vue'
import Router from 'vue-router'
import Home from '../tab/home'
import SavePass from '../tab/savepass'
import SyncData from '../tab/syncData'
import ErrorPage from '../tab/error'

Vue.use(Router)

const routes = [
  {
    path: '/savepass',
    name: 'SavePass',
    component: SavePass
  },
  {
    path: '/sync',
    name: 'SyncData',
    component: SyncData
  },
  {
    path: '/error',
    name: 'ErrorPage',
    component: ErrorPage
  },
  {
    path: '*',
    name: 'Home',
    component: Home
  },
]

const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
});

router.beforeEach((to, from, next) => {
  console.log('routing...');
  next();
});

export default router;
