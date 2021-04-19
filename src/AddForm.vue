<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col">
        <div>
          <h3>New Actions</h3>
          <div v-for="action in newActions" class="row">
            <div class="col-auto"><a href="">{{data.HelpTypes[(data.Actions[action].help_type)].name}}</a> - {{readableDate(action)}}</div>
            <div class="float-right"><i class="btn text-danger fas fa-times"></i></div>
          </div>
        </div>
        <div>
          <h3>New Referrals</h3>
        </div>
      </div>
      <div class="col col-lg-7">
        <add-action-form :action="action" :data="data"></add-action-form>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-7">
        <add-referral-form :action="action" :data="data"></add-referral-form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <select-resident :Residents="data.Residents"></select-resident>
      </div>
    </div>
    <!-- Modal -->
    <add-type-modal :data="data" :helptype="helptype"></add-type-modal>
  </div>
</template>

<script>
import data from './data.json'
import AddActionForm from "./components/AddActionForm.vue"
import AddReferralForm from "./components/AddReferralForm.vue"
import AddTypeModal from "./components/AddTypeModal.vue"
import SelectResident from "./components/SelectResident.vue"
export default {
  name: 'App',
  components: {
    AddActionForm,
    AddTypeModal,
    AddReferralForm,
    SelectResident
  },
  data() {
    return{
      data,
      action:{
        helpType:"",
        volunteers_needed: "1",
        action_priority:"2",
        public_description:"",
        private_description:"",
        volunteer_requirements:[]
      },
      helptype: {
        name:"",
        publicDescription:"",
        privateDescription:"",
        requirements:[],
        icon:"fas fa-hand-holding"
      },
      newActions:[1,2],
      newReferrals:[]
    }
  },
  computed: {
    icon: function () {
      var icn = this.helptype.icon.split(" ")
      return icn[1]
    }
  },
  methods: {
    readableDate: function (id) {
      var Action = this.data.Actions[id]
      var d = new Date(0)
      d.setUTCSeconds(Action.requested_datetime)
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      return days[d.getUTCDay()] + " " + d.getUTCDate() + " " + months[d.getUTCMonth()] + " " + d.getUTCHours() + ":" + d.getUTCMinutes()
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
.action-module{
  border: 3px solid black;
  height: 100%;
}
</style>
