import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import 'common/myVant'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
Vue.use(toast)

//解决移动端点击300ms的延迟
FastClick.attach(document.body)
//图片的懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/xr.jpeg')
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
