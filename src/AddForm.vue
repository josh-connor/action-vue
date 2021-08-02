<template>
  <div id="addForm" class="">
    <div class="row">
      <a class="btn" href="../"><span class="fas fa-angle-left"></span></a><div class="">Selected resident: {{activeResident.id}} - {{activeResident.first_name}} {{activeResident.last_name}}</div>
    </div>
    <div class="row">
      <div class="col col-12 col-md-5">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">Current Actions</h3>
            <ul class="list-group list-group-flush">
              <template v-for="(action, index) in residentActions">
                <li v-if="action.action_status !== '7'" class="list-group-item">
                  <a href="">{{help_types[action.help_type].name}}</a> - {{readableDate(action)}}
                  <div class="float-right"><i class="btn text-danger fas fa-times" @click="removeAction(action.id, index)"></i></div>
                </li>
              </template>
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
          <add-action-form class="" :title="'Create New Action'" :action="action" :data="data" :active-resident="activeResident" @new-action="addNewAction($event)" @discard-form="discardForm"></add-action-form>
        </div>
        <div v-if="createNew && formName == 'referral'" class="col-lg-7">
          <add-referral-form class="" :title="'Create New Referral'"  @discard-form="discardForm" :action="action" :data="data" :active-resident="activeResident" :referral="referral" :referralTypes="referralTypes" :organisations="organisations"  @new-referral="addNewReferral($event)"></add-referral-form>
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
export default {
  name: 'AddForm',
  components: {
    AddActionForm,
    AddTypeModal,
    AddReferralForm,
    SelectResident
  },
  data() {
    return{
      data,
      createNew: false,
      formName: "",
      action:{
        resident:-1,
        help_type_id:"",
        volunteers_needed: "1",
        action_priority:"2",
        public_description:"",
        private_description:"",
        volunteer_requirements:[],
        interested_volunteers: [],
        assigned_volunteers: [],
        requested_datetime: "",
        added_by:3,
        coordinator:3
      },
      referral:{
        resident:-1,
        referral_type:"",
        referral_organisation:"",
        notes:"",
        status:1,
        added_by:3,
        coordinator:3
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
      residents:[],
      activeResident: {},
      residentActions: [],
      help_types: {},
      residentReferrals: [],
      referralTypes:[],
      organisations:[]
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
    readableDate: function (action) {
      var d = new Date(action.requested_datetime)
      return d.toDateString()
    },
    removeAction: function (action_id, index) {
      bootbox.confirm("Mark this action as 'No Longer Needed'?", (result) =>{
        if (result === true) {
          const csrftoken = this.getCookie('csrftoken')
          $.ajax({
            url: "/api/actions/"+action_id+"/",
            beforeSend: function(xhr) {
              xhr.setRequestHeader('X-CSRFToken', csrftoken)
            },
            method: "PATCH",
            type:"PATCH",
            contentType:'application/json',
            data:JSON.stringify({'action_status':'7'}),
            success: (response) =>{
              this.$set(this.residentActions, index, response)
            }
          })
        }
      })
    }, 
    removeReferral: function (referralID) {
      bootbox.confirm("Are you sure you want to remove this referral? This cannot be undone", (result) =>{
        if (result === true) {
          
        }
      })
    },
    addNewAction: function (e) {
      console.log(e)
      this.residentActions.push(e)
    },
    addNewReferral: function (e) {
      console.log(e)
      this.residentReferrals.push(e)
    },
    setResident: function (e) {
      this.action.resident = e.id
      this.referral.resident = e.id
    },
    setActionType: function (e) {
      this.action.help_type = e.helptype
    },
    discardForm (){
      this.createNew = false
      this.action = {
        resident:-1,
        help_type_id:"",
        volunteers_needed: "1",
        action_priority:"2",
        public_description:"",
        private_description:"",
        volunteer_requirements:[],
        interested_volunteers: [],
        assigned_volunteers: [],
        requested_datetime: "",
        added_by:3,
        coordinator:3
      }
      this.action.resident = this.activeResident.id
      this.referral = {
        resident:-1,
        referral_type:"",
        referral_organisation:"",
        notes:"",
        status:1,
        added_by:3,
        coordinator:3
      }
      this.referral.resident = this.activeResident.id
    }
  },
  async created () {
    this.getResidents()
    this.getHelpTypes()
    this.getList("referraltypes",(data)=>{this.setData(data, "referralTypes")})
    const getOrganisations = await this.getList("organisations",(data)=>{this.setData(data, "organisations")})
    this.getList("referrals",(data)=>{this.setData(data, "residentReferrals")})
    var urlParams = new URLSearchParams(window.location.search)
    $.getJSON(
      this.baseURL()+"/api/residents/"+urlParams.get('id'),
      response => {
        this.$set(this,"activeResident", response)
        this.setResident(response)
        this.getActions(response.requested_actions)
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
