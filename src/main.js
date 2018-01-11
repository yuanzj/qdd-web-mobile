// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import router from './router'
import Vue from 'vue'
import store from './store/index'

import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'

Vue.use(MintUI)
Vue.prototype.axios = axios

axios.defaults.baseURL = 'http://cjl3.rokyinfo.net:8110'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: { App },
  methods: {
    getUrlParameters () {
      // 返回当前 URL 的查询部分（问号 ? 之后的部分）。
      let urlParameters = location.search
      // 声明并初始化接收请求参数的对象
      let requestParameters = {}
      // 如果该求青中有请求的参数，则获取请求的参数，否则打印提示此请求没有请求的参数
      if (urlParameters.indexOf('?') !== -1) {
        // 获取请求参数的字符串
        let parameters = decodeURI(urlParameters.substr(1))
        // 将请求的参数以&分割中字符串数组
        let parameterArray = parameters.split('&')
        // 循环遍历，将请求的参数封装到请求参数的对象之中
        for (let i = 0; i < parameterArray.length; i++) {
          requestParameters[parameterArray[i].split('=')[0]] = (parameterArray[i].split('=')[1])
        }
        this.$store.commit('setQddUserId', requestParameters.id)
      } else {
        console.info('There is no request parameters')
      }
      return requestParameters
    }
  },
  mounted () {
    this.getUrlParameters()
  }
})
