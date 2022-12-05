// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/rtl.css'
import store from './store'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.filter('toCurrency', function (str) {
  console.log(str);
  str = String(str)
  str = str.replace(/\,/g, '');
  var objRegex = new RegExp('(-?[0-9]+)([0-9]{3})');
  while (objRegex.test(str)) {
    str = str.replace(objRegex, '$1,$2');
  }
  return str;
});
Vue.component('modal', {
  template: '#modal-template'
})
data: {
    showModal: false
  }
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
