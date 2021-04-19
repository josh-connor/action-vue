<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col">
        <action-list :ActionsToRender="[1,2]"></action-list>
      </div>
    </div>
  </div>
</template>

<script>
import ActionDetail from './components/ActionDetail.vue'
import ActionAssignments from './components/ActionAssignments.vue'
import AssignVolunteers from './components/AssignVolunteers.vue'
import ActionFeedback from './components/ActionFeedback.vue'
import ActionOccurences from './components/ActionOccurences.vue'
import PersonDetail from './components/PersonDetail.vue'
import ActionList from './components/ActionList.vue'
import data from './data.json'
export default {
  name: 'App',
  components: {
    ActionDetail,
    ActionAssignments,
    AssignVolunteers,
    ActionFeedback,
    ActionOccurences,
    PersonDetail,
    ActionList
  },
  data() {
    return{
      Actions: data.Actions,
      HelpTypes: data.HelpTypes,
      Priorities: data.Priorities,
      Residents: data.Residents,
      Volunteers: data.Volunteers
    }
  },
  methods: {
    unassignVolunteer(volunteer) {
      var id = volunteer.id
      var newAssigned= this.Action.VolunteersAssigned.filter(vol => {
        return vol !== id
      })
      this.Action.VolunteersAssigned = newAssigned
      this.Action.VolunteersInterested.push(id)
    },
    assignVolunteer(volunteer) {
      var id = volunteer.id
      var newInterested = this.Action.VolunteersInterested.filter(vol => {
        return vol !== id
      })
      if (this.Action.VolunteersAssigned.length < this.Action.VolunteersNeeded) {
        this.Action.VolunteersInterested = newInterested
        this.Action.VolunteersAssigned.push(id)
      } else {
        $('#myModal').modal('show')
      }
    },
    removeInterest(volunteer) {
      var id = volunteer.id
      var newInterested= this.Action.VolunteersInterested.filter(vol => {
        return vol !== id
      })
      this.Action.VolunteersInterested = newInterested
    },
    addInterest(volunteer) {
      this.Action.VolunteersInterested.push(volunteer.id)
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
