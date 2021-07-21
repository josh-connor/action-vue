import Vue from 'vue'
import AddActionRef from './AddForm.vue'
import SelectCreateResident from './SelectCreateResident.vue'
import SingleActionView from './App.vue'
import Dashboard from './Dashboard.vue'
import bootbox from "bootbox"
import { loremIpsum } from "lorem-ipsum"
Object.defineProperty(Vue.prototype, '$lorem', { value: loremIpsum });
/*Object.defineProperty(Vue.prototype, '$bootbox', { value: bootbox });*/
Vue.config.productionTip = false

Vue.mixin({
    data(){
      return{
        test: "test",
        action_priorities:{
          1:"Low",
          2:"Normal",
          3:"High"
        },
        referral_statuses:{
          1: "Pending",
          2: "Contacted",
          3: "Completed"
        },
      }
    },
    methods:{
      baseURL: function(){
        return window.location.origin
      },
      setData: function(data, target) {
          this.$set(this, target, data)
      },
      getCookie: function(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
      },
      multiPageGetLoop: function(next_page, current_array, final_function, ...function_options) {
        $.getJSON(next_page,
          response => {
            var new_array = current_array.concat(response.results)
            if (response.next !== null) {
              this.multiPageGetLoop(response.next, new_array, final_function, ...function_options)
            } else {
              final_function(new_array, ...function_options)
            }
          }
        )
      },
      getList: function(type, success, ...success_options) {
        $.getJSON(
            this.baseURL()+"/api/"+type+"/",
            response => {
              if(response.next !== null) {
                this.multiPageGetLoop(response.next, response.results, success, ...success_options)
              } else {
                success(response.results,...success_options)
              }
            }
          )
      },
      getSingle: function(type, id, success, ...success_options) {
        $.getJSON(
            this.baseURL()+"/api/"+type+"/"+id+"/",
            response => {
              success(response, ...success_options)
            }
         )
      },
      getActions: function(action_id_array) {
        $.getJSON(
          this.baseURL()+"/api/actions/isin/"+action_id_array.toString()+"/",
          response => {
            if(response.next !== null) {
              this.multiPageGetLoop(response.next, response.results, this.setData, "residentActions")
            } else {
              this.$set(this, "residentActions", response.results)
            }
          }
        )
      },
      getReferalls: function(action_id_array) {
        $.getJSON(
          this.baseURL()+"/api/referalls/isin/"+action_id_array.toString()+"/",
          response => {
            if(response.next !== null) {
              this.multiPageGetLoop(response.next, response.results, this.setData, "residentReferrals")
            } else {
              this.$set(this, "residentReferrals", response.results)
            }
          }
        )
      },
      getHelpTypes: function(){
        const setHelpTypeObject = (help_types_array) =>{
          for (var i = help_types_array.length - 1; i >= 0; i--) {
           this.$set(this.help_types, help_types_array[i].id , help_types_array[i])
          }
        }
        $.getJSON(
          this.baseURL()+"/api/helptypes/",
          response => {
            if(response.next !== null) {
              this.multiPageGetLoop(response.next, response.results, setHelpTypeObject)
            } else {
              setHelpTypeObject(response.results)
            }
          }
        )
      },
      getRequirements: function(){
        const setRequirementsObject = (requirements_array) =>{
          for (var i = requirements_array.length - 1; i >= 0; i--) {
           this.$set(this.requirements, requirements_array[i].id , requirements_array[i])
          }
        }
        $.getJSON(
          this.baseURL()+"/api/requirements/",
          response => {
            if(response.next !== null) {
              this.multiPageGetLoop(response.next, response.results, setHelpTypeObject)
            } else {
              setRequirementsObject(response.results)
            }
          }
        )
      },
      getResidents: function() {
        $.getJSON(
          this.baseURL()+"/api/residents",
          response => {
            if(response.next !== null) {
              this.multiPageGetLoop(response.next, response.results, this.setData, "residents")
            } else {
              this.$set(this, "residents", response.results)
            }
          }
        )
      }
    },
    created(){
    }
  })

if($("#dashboard").length){
new Vue({
  data:{
  },  
  render: h => h(Dashboard),
  created() {
  }
}).$mount('#dashboard')
}
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

if($("#singleActionView").length){
  new Vue({
  data:{
  },
  render: h => h(SingleActionView),
  created() {
  }
}).$mount('#singleActionView')

}