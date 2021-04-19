<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col">
        <div>
          <h3>New Actions</h3>
          <div v-for="action in newActions" class="row">
            <div class="col-auto"><a href="">{{data.HelpTypes[(data.Actions[action].help_type)].name}}</a> - {{readableDate(action)}}</div>
            <div class="float-right"><i class="btn text-danger fas fa-times" @click="removeAction(action)"></i></div>
          </div>
          <button class="btn btn-secondary my-3">Add New Action</button>
        </div>
        <div>
          <h3>New Referrals</h3>
          <button class="btn btn-secondary my-3">Add New Referral</button>
        </div>
      </div>
      <div class="col col-lg-7">
        <add-action-form :action="action" :data="data" @new-action="addNewAction()"></add-action-form>
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
        help_type:"",
        volunteers_needed: "1",
        action_priority:"2",
        public_description:"",
        private_description:"",
        volunteer_requirements:[],
        interested_volunteers: [],
        assigned_voluneteers: [],
        requested_datetime: "",
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
      var d = new Date(Action.requested_datetime)
      return d.toDateString()
    },
    removeAction: function (actionID) {
      bootbox.confirm("Are you sure you want to remove this action?", (result) =>{
        if (result === true) {
          this.newActions = this.newActions.filter( (ele) => {
          return ele != actionID
          })
        }
      })
    },
    addNewAction: function () {
      var actionID = this.newActions.length + 1
      this.newActions.push(actionID)
      const newAction = this.action
      this.data.Actions[actionID] = JSON.parse(JSON.stringify(newAction))
    }
  }
}
</script>

<style scoped>
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
