<template>
  <div id="app" class="container">
    <div class="row">
      <a class="btn" href="../"><span class="fas fa-angle-left"></span></a><div class="">Selected resident: {{activeResident.id}} - {{activeResident.first_name}} {{activeResident.last_name}}</div>
    </div>
    <div class="row">
      <div class="col col-12 col-md-5">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">New Actions</h3>
            <ul class="list-group list-group-flush">
              <li v-for="action in newActions" class="list-group-item">
                <a href="">{{data.HelpTypes[(data.Actions[action].help_type)].name}}</a> - {{readableDate(action)}}
                <div class="float-right"><i class="btn text-danger fas fa-times" @click="removeAction(action)"></i></div>
              </li>
            </ul>
            <div class="text-right">
              <button class="btn btn-primary my-3" :disabled="buttonsDisabled == 1" @click="createNew = true; formName = 'action'">Add New Action</button>
            </div>
          </div>
        </div>
        <div class="card mt-4">
          <div class="card-body">
            <h3 class="card-title">New Referrals</h3>
            <ul class="list-group list-group-flush">
              <li v-for="referral in newReferrals" class="list-group-item">
                <a href="">{{data.ReferralTypes[(data.Referrals[referral].referral_type)].name}}</a>
                <div class="float-right"><i class="btn text-danger fas fa-times" @click="removeReferral(referral)"></i></div>
              </li>
            </ul>
            <div class="text-right">
              <button class="btn btn-primary my-3" :disabled="buttonsDisabled == 1" @click="createNew = true; formName = 'referral'">Add New Referral</button>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="col-7"><action-view></action-view></div> -->
      <transition name="fade">
        <div v-if="createNew && formName == 'action'" class="col col-lg-7">
          <add-action-form class="" :title="'Create New Action'" :action="action" :data="data" :active-resident="activeResident" @new-action="addNewAction()" @discard-form="createNew = false"></add-action-form>
        </div>
        <div v-if="createNew && formName == 'referral'" class="col-lg-7">
          <add-referral-form class="" :title="'Create New Referral'"  @discard-form="createNew = false" :action="action" :data="data" :active-resident="activeResident"></add-referral-form>
        </div>
      </transition>
    </div>    
    <!-- Modal -->
    <add-type-modal :data="data" :helptype="helptype" @set-action-type="setActionType"></add-type-modal>
  </div>
</template>

<script>
import data from './data.json'
import AddActionForm from "./components/AddActionForm.vue"
import AddReferralForm from "./components/AddReferralForm.vue"
import AddTypeModal from "./components/AddTypeModal.vue"
import SelectResident from "./components/SelectResident.vue"
import ActionView from "./App.vue"
export default {
  name: 'App',
  components: {
    AddActionForm,
    AddTypeModal,
    AddReferralForm,
    SelectResident,
    ActionView
  },
  data() {
    return{
      data,
      createNew: false,
      formName: "",
      action:{
        resident:-1,
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
      newActions:[],
      newReferrals:[],
      resList:[],
      activeResident: {}
    }
  },
  computed: {
    icon: function () {
      var icn = this.helptype.icon.split(" ")
      return icn[1]
    },
    buttonsDisabled: function () {
      if (this.createNew) {
        return 1
      } else {
        return 0
      }
    }
  },
  methods: {
    readableDate: function (id) {
      var Action = this.data.Actions[id]
      var d = new Date(Action.requested_datetime)
      return d.toDateString()
    },
    removeAction: function (actionID) {
      bootbox.confirm("Are you sure you want to remove this action? This cannot be undone", (result) =>{
        if (result === true) {
          this.newActions = this.newActions.filter( (ele) => {
          return ele != actionID
          })
        }
      })
    }, 
    removeReferral: function (referralID) {
      bootbox.confirm("Are you sure you want to remove this referral? This cannot be undone", (result) =>{
        if (result === true) {
          this.newReferrals = this.newActions.filter( (ele) => {
          return ele != referralID
          })
        }
      })
    },
    addNewAction: function () {
      var actionID = Object.keys(this.data.Actions).length + 1
      this.newActions.push(actionID)
      const newAction = this.action
      this.data.Actions[actionID] = JSON.parse(JSON.stringify(newAction))
    },
    setResident: function (e) {
      this.action.resident = e.id
    },
    setActionType: function (e) {
      this.action.help_type = e.helptype
    },
    fetchResidents: function() {
      $.getJSON(
        "http://localhost:8000/api/residents",
        response => {
          this.resList = response.results
        }
        )
      /*fetch("http://localhost:8000/api/residents", {
          "method": "GET",
          "headers": {
            'Content-Type': 'application/json'
          }
      })
      .then(response => { 
          if(response.ok){
              return response.json()    
          } else{
              alert("Server returned " + response.status + " : " + response.statusText);
          }                
      })
      .then(response => {
        this.resList = response.results
          console.log(response.results) 
      })
      .catch(err => {
          console.log(err);
      });*/
    }

  },
  mounted () {
    this.fetchResidents()
    var urlParams = new URLSearchParams(window.location.search)
    $.getJSON(
      "http://localhost:8000/api/residents/"+urlParams.get('id'),
      response => {
        this.activeResident = response
      }
    )
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
.fade-enter-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.action-list::before, .card::before {
    content: "";
    position: absolute;
    top: 0.25rem;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    box-shadow: 0px 10px 0px 5px rgba(0, 0, 0, 0.075);
    border-radius: 0.375rem;
}
</style>
