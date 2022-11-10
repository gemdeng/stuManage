import Vue from 'vue'
import App from './App.vue'

import Elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false
Vue.use(Elementui)

import store from '@/store/listDB'

new Vue({
  render: h => h(App),
  store,
  beforeCreate() {
    Vue.prototype.$bus = this	//安装全局事件总线
  }
}).$mount('#app')
