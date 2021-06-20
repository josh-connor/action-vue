import Vue from 'vue'
import AddActionRef from './AddForm.vue'
import SelectCreateResident from './SelectCreateResident.vue'
/*import bootbox from "bootbox"*/
import { loremIpsum } from "lorem-ipsum"
Object.defineProperty(Vue.prototype, '$lorem', { value: loremIpsum });
/*Object.defineProperty(Vue.prototype, '$bootbox', { value: bootbox });*/
Vue.config.productionTip = false
if($("#addActionRef").length){
new Vue({
  data:{
  },
  render: h => h(AddActionRef),
  created() {
  }
}).$mount('#addActionRef')
}

if($("#selectCreate").length){
  new Vue({
  data:{
  },
  render: h => h(SelectCreateResident),
  created() {
  }
}).$mount('#selectCreate')

}

