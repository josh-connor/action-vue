import Vue from 'vue'
import App from './App.vue'
import Form from './AddForm.vue'
import { loremIpsum } from "lorem-ipsum"
Object.defineProperty(Vue.prototype, '$lorem', { value: loremIpsum });
Vue.config.productionTip = false
new Vue({
  data:{
  },
  render: h => h(App),
  created() {
  }
}).$mount('#app')
new Vue({
  data:{
  },
  render: h => h(Form),
  created() {
  }
}).$mount('#form')

