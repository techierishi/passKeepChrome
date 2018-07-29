import Vue from 'vue'
import root from './root.vue'
import router from '../router'
import store from '../store'
import MtAdmin from '../packages/index'

Vue.use(MtAdmin)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#root',
  router,
  store,
  render: h => h(root)
})
