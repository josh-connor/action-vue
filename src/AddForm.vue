<template>
  <div id="addForm" class="">
    <div class="row">
      <div class="col"><a class="btn" href="../"><span class="fas fa-angle-left"></span></a></div>
      <h2 class="col-auto">Selected resident: {{activeResident.first_name}} {{activeResident.last_name}}</h2>
      <div class="col"><a class="btn btn-lg btn-danger float-right" href="/actions/coordinator">End Call</a></div>
    </div>
    <div class="row">
      <div class="col col-12 col-md-5">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">Current Actions</h3>
            <ul class="list-group list-group-flush">
              <template v-for="(action, index) in residentActions">
                <li v-if="action.action_status !== '7'" class="list-group-item">
                  <a :href="'/actions/coordinator/action/?id='+action.id">{{help_types[action.help_type].name}}</a> - {{readableDate(action)}}
                  <button class="float-right btn text-danger" @click="removeAction(action.id, index)"><i class="fa fa-times" ></i></button>
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
              <template v-for="(referral, index) in filterReferrals">
                <li v-if="action.referral_status !== '3'" class="list-group-item">
                  <a :href="'/admin/actions/referral/'+referral.id+'/change/'">{{referral_types[referral.referral_type].name}}</a>
                  <button class="float-right btn text-danger" @click="removeReferral(referral.id)"><i class="fa fa-times"></i></button>
                </li>
              </template>
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
          <add-action-form class="" :title="'Create New Action'" :action="action" :requirements="requirements" :active-resident="activeResident" :help_types="help_types" @new-action="addNewAction($event)" @discard-form="discardForm"></add-action-form>
        </div>
        <div v-if="createNew && formName == 'referral'" class="col-lg-7">
          <add-referral-form class="" :title="'Create New Referral'"  @discard-form="discardForm" :action="action" :active-resident="activeResident" :referral="referral" :referralTypes="referral_types" :organisations="organisations"  @new-referral="addNewReferral($event)"></add-referral-form>
        </div>
      </transition>
    </div>    
    <!-- Modal -->
    <add-type-modal :requirements="requirements" @new-helptype="addNewHelpType($event)"></add-type-modal>
  </div>
</template>

<script>
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
      coordinator:{},
      createNew: false,
      formName: "",
      action:{
        resident:-1,
        help_type:"",
        minimum_volunteers:"1",
        maximum_volunteers: "1",
        action_priority:"2",
        public_description:"",
        private_description:"",
        volunteer_requirements:[],
        interested_volunteers: [],
        assigned_volunteers: [],
        requested_datetime: "",
        added_by:"",
        coordinator:""
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
      newActions:[],
      newReferrals:[],
      residents:[],
      activeResident: {},
      residentActions: [],
      help_types: {},
      residentReferrals: [],
      referral_types:{},
      organisations:[],
      requirements:{},
      referrals:{}
    }
  },
  watch:{
    help_type_id: function(value){
      if (value) {
      this.action.public_description = this.help_types[value].public_description_template
      this.action.private_description = this.help_types[value].private_description_template
      this.action.volunteer_requirements = this.help_types[value].requirements
      this.action.minimum_volunteers = this.help_types[value].minimum_volunteers
      this.action.maximum_volunteers = this.help_types[value].maximum_volunteers}
    }
  },
  computed: {
    help_type_id: function () {
      return this.action.help_type
    },
    buttonsDisabled: function () {
      if (this.createNew) {
        return 1
      } else {
        return 0
      }
    },
    filterReferrals () {
      var refs = this.activeResident.requested_referrals
      return this.residentReferrals.filter((referral) => {
        return refs.includes(referral.id)
      })
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
      this.residentActions.push(e)
      this.discardForm()
    },
    addNewHelpType: function(e) {
      this.help_types[e.id] = e
      this.action.help_type = e.id
    },
    addNewReferral: function (e) {
      this.activeResident.requested_referrals.push(e.id)
      this.residentReferrals.push(e)
      this.discardForm()
    },
    setResident: function (e) {
      this.action.resident = e.id
      this.referral.resident = e.id
    },
    discardForm (){
      this.createNew = false
      this.action = {
        resident:-1,
        help_type:"",
        volunteers_needed: "1",
        action_priority:"2",
        public_description:"",
        private_description:"",
        volunteer_requirements:[],
        interested_volunteers: [],
        assigned_volunteers: [],
        requested_datetime: "",
        added_by:"",
        coordinator:""
      }
      this.referral = {
        resident:-1,
        referral_type:"",
        referral_organisation:"",
        notes:"",
        status:1,
        added_by:"",
        coordinator:""
      } 
      this.action.resident = this.activeResident.id
      this.referral.resident = this.activeResident.id
      this.action.added_by = this.coordinator.id
      this.action.coordinator = this.coordinator.id
      this.referral.added_by = this.coordinator.id
      this.referral.coordinator = this.coordinator.id
    }
  },
  async created () {
    this.getResidents()
    this.getHelpTypes()
    this.getRequirements()
    this.getReferralTypes()
    this.getCurrentCoordinator((data)=>{
      console.log("Hello")
      this.setData(data[0], "coordinator")
      this.$set(this.action,"coordinator",data[0].id)
      this.$set(this.action,"added_by",data[0].id)
      this.$set(this.referral,"coordinator",data[0].id)
      this.$set(this.referral,"added_by",data[0].id)
    })
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
