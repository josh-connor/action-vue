import Vue from 'vue'
import App from './AddForm.vue'
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
