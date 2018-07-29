import Vue from 'vue'
import Router from 'vue-router'
import Home from '../tab/home'
import SavePass from '../tab/savepass'


Vue.use(Router)

const routes = [
  {
    path: '/savepass',
    name: 'SavePass',
    component: SavePass
  },
  {
    path: '*',
    name: 'Home',
    component: Home
  },
]

export default new Router({
  mode: 'history',
  routes,
  scrollBehavior() {
    return {x: 0, y: 0}
  }
})
