<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-md-8 px-2">
        <action-detail :Action="Action" class="p-3"></action-detail>
      </div>
      <div class="col-md-4 px-2">
        <action-assignments :Action="Action" :Volunteers="Volunteers" @unassignVolunteer="unassignVolunteer" class="p-3"></action-assignments>

      </div>
    </div>
    <div class="row">
      <div class="col-12 py-3 px-2">
        <assign-volunteers :Action="Action" :Volunteers="Volunteers" @removeInterest="removeInterest" @assignVolunteer="assignVolunteer" @addInterest="addInterest" class="p-3"></assign-volunteers>
      </div>
      <div class="col-12 px-2">
        <action-feedback :Action="Action" :Volunteers="Volunteers" :Assignments="Assignments" class="p-3"></action-feedback>
      </div>
    </div>
  </div>
</template>

<script>
import ActionDetail from './components/ActionDetail.vue'
import ActionAssignments from './components/ActionAssignments.vue'
import AssignVolunteers from './components/AssignVolunteers.vue'
import ActionFeedback from './components/ActionFeedback.vue'

export default {
  name: 'App',
  components: {
    ActionDetail,
    ActionAssignments,
    AssignVolunteers,
    ActionFeedback
  },
  data() {
    return{
      Action: {
        ResidentName: "John Smith",
        ActionType: "Dog Walking",
        PublicDescription: this.$lorem({count:3}),
        PrivateDescription: this.$lorem({count:3}),
        DueDate: "11/12/20",
        DueTime:"11:00",
        ActionPriority:"High",
        requirements: [
          {name: "Enhanced DBS check"},
          {name: "Experience with dogs"}
        ],
        VolunteersNeeded: 3,
        VolunteersInterested:[156],
        VolunteersAssigned:[153,184],
        AutoAssign: false,
      },
      Volunteers: [
        {
          id: 153,
          FirstName: "Eric",
          LastName: "Carter"
        },
        {
          id: 156,
          FirstName: "Erin",
          LastName: "Cater"
        },
        {
          id: 184,
          FirstName: "Bob",
          LastName: "Ross"
        },
        {
          id: 182,
          FirstName: "Mad",
          LastName: "Max"
        }
      ],
      Assignments: [
        {
          id: 393,
          volunteer: 156,
          CompletedDate: "11/11/20",
          feedback: this.$lorem({count:1})
        },
        {
          id: 393,
          volunteer: 184,
          CompletedDate: "13/11/20",
          feedback: this.$lorem({count:1})
        }
      ]
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
        alert("Assignment full. Please remove a volunteer if you want to assign another")
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
