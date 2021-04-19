import Vue from 'vue'
import App from './App.vue'
import Form from './AddForm.vue'
/*import bootbox from "bootbox"*/
import { loremIpsum } from "lorem-ipsum"
Object.defineProperty(Vue.prototype, '$lorem', { value: loremIpsum });
/*Object.defineProperty(Vue.prototype, '$bootbox', { value: bootbox });*/
Vue.config.productionTip = false
/*new Vue({
  data:{
  },
  render: h => h(App),
  created() {
  }
}).$mount('#app')*/
new Vue({
  data:{
  },
  render: h => h(Form),
  created() {
  }
}).$mount('#form')

