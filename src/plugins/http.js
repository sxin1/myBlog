import http from '../api/http'
import Vue from 'vue'
const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  Object.defineProperties(Vue.prototype, {
    $api: {
      get () {
        return http
      },
      enumerable: false, // 不可枚举
      configurable: false // 不可重写
    }
  })
}
Vue.use(install)