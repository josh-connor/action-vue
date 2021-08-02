<template>
  <div id=""  v-if="DataLoaded" class="">
    <div class="row align-items-stretch">
      <div class="col-md-8 px-2">
        <action-detail :action_details="action_details" :activeResident="activeResident" :helpTypes="help_types" @discard="refreshAction" @save="patchAction" class=""></action-detail>
      </div>
      <div class="col-md-4 px-2">
        <action-assignments :action_details="action_details" :Volunteers="volunteers_array" @unassignVolunteer="unassignVolunteer" @statusUpdate="patchStatus" class=""></action-assignments>
      </div>
    </div>
    <div class="row">
      <div class="col-12 py-3 px-2">
        <assign-volunteers :action_details="action_details" :Volunteers="volunteers_array" @removeInterest="removeInterest" @assignVolunteer="assignVolunteer" @addInterest="addInterest" class=""></assign-volunteers>
      </div>
      <div class="col-12 py-3 px-2">
        <action-feedback :action_details="action_details" :Volunteers="volunteers_array" class="p-3"></action-feedback>
      </div>
    </div>
    <div id="myModal"class="modal" tabindex="-1">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Assignment Full</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>This action already has the maximum number of volunteers assigned. To add another volunteer please remove one already assigned by clicking on the X next to their name.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" onclick="$('#myModal').modal('hide')">OK</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ActionDetail from './components/ActionDetail.vue'
import ActionAssignments from './components/ActionAssignments.vue'
import AssignVolunteers from './components/AssignVolunteers.vue'
import ActionFeedback from './components/ActionFeedback.vue'
import PersonDetail from './components/PersonDetail.vue'
export default {
  name: 'SingleAction',
  components: {
    ActionDetail,
    ActionAssignments,
    AssignVolunteers,
    ActionFeedback,
    PersonDetail
  },
  data() {
    return{
    action_details:{},
    help_types:{},
    activeResident:{},
    volunteers_array:[]
    }
  },
  computed: {
    DataLoaded() {
      if (typeof this.action_details !== "undefined") {
        return true
      }
      return false
    }
  },
  methods: {
    unassignVolunteer(volunteer) {
      var id = volunteer.pk
      var newAssigned = this.action_details.assigned_volunteers.filter(vol => {
        return vol !== id
      })
      var actionStatus
      if (this.action_details.assigned_volunteers.length - 1 < 1) {
        actionStatus = "2"
      } else {
        actionStatus = "3"
      }
      $.ajax({
            url: "/api/actions/"+this.action_details.id+"/",
            beforeSend: function(xhr) {
              xhr.setRequestHeader('X-CSRFToken', auth.csrfToken)
            },
            method: "PATCH",
            type:"PATCH",
            contentType:'application/json',
            data:JSON.stringify({'assigned_volunteers':newAssigned, "action_status": actionStatus}),
            success: (response) =>{
              this.$set(this, "action_details", response)
            }
          })
    },
    assignVolunteer(volunteer) {
      var id = volunteer.pk
      var newAssigned = $.extend( [], this.action_details.assigned_volunteers)
      newAssigned.push(id)
      const csrftoken = this.getCookie('csrftoken')
      if (newAssigned.length <= this.action_details.maximum_volunteers) {
        $.ajax({
            url: "/api/actions/"+this.action_details.id+"/",
            beforeSend: function(xhr) {
              xhr.setRequestHeader('X-CSRFToken', csrftoken)
            },
            method: "PATCH",
            type:"PATCH",
            contentType:'application/json',
            data:JSON.stringify({'assigned_volunteers':newAssigned,'action_status':'3'}),
            success: (response) =>{
              this.$set(this, "action_details", response)
            }
          })
      } else {//If max assigned reached
        $('#myModal').modal('show')
      }
    },
    removeInterest(volunteer) {
      var id = volunteer.pk
      var newInterested= this.Action.VolunteersInterested.filter(vol => {
        return vol !== id
      })
      this.Action.VolunteersInterested = newInterested
    },
    addInterest(volunteer) {
      this.Action.VolunteersInterested.push(volunteer.id)
    },
    refreshAction(){
      var urlParams = new URLSearchParams(window.location.search)
      var success = (data) =>{
        this.setData(data, "action_details")
        this.getSingle("residents",data.resident,this.setData,"activeResident")
      }
      this.getSingle("actions",urlParams.get('id'),success)
    },
    patchAction(){
      const csrftoken = this.getCookie('csrftoken')
      $.ajax({
        url: "/api/actions/"+this.action_details.id+"/",
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRFToken', csrftoken)
        },
        method: "PATCH",
        type:"PATCH",
        contentType:'application/json',
        data:JSON.stringify(this.action_details),
        success: (response) =>{
          this.$set(this, "action_details", response)
        }
      })
    },
    patchStatus(){
      const csrftoken = this.getCookie('csrftoken')
      $.ajax({
        url: "/api/actions/"+this.action_details.id+"/",
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRFToken', csrftoken)
        },
        method: "PATCH",
        type:"PATCH",
        contentType:'application/json',
        data:JSON.stringify({"action_status":this.action_details.action_status}),
        success: (response) =>{
          this.$set(this, "action_details", response)
        }
      })
    }
  },
  created () {
    this.getHelpTypes()
    var urlParams = new URLSearchParams(window.location.search)
    this.refreshAction()
    this.getList("volunteers",this.setData, "volunteers_array")
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
  height: 100%;
}
</style>
