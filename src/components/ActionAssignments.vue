<template>
  <div class="action-module" id="actionAssignments">
    <h2>Assigned Volunteers</h2>
    <div class="row">
      <div class="col">
        <label>Volunteers Needed</label>
        <div>{{ Action.VolunteersAssigned.length }}/{{ Action.VolunteersNeeded }}</div>
      </div>
      <div class="col">
        <label>Auto Assignment</label>
        <div>{{ IsAutoAssign }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>Volunteers Assigned</label>
        <ul id="assignedList" class="list-group list-group-flush mt-3">
          <li class="list-group-item" v-for="volunteer in AssignedVolunteers" :key="volunteer.id">
            <button type="button" class="close float-right remove" aria-label="Close" v-on:click="removeVol(volunteer)">
              <span aria-hidden="true">&times;</span>
            </button>
            <a href=""><div>
              {{ volunteer.FirstName }} {{ volunteer.LastName }}
            </div></a>
          </li>
          <li v-if="AssignedVolunteers.length < 1">No volunteers assigned</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionAssignments',
  data() {
    return {
      
    }
  },
  props: {
    Action: Object,
    Volunteers: Array
  },
  computed: {
    IsAutoAssign() {
      if (this.Action.AutoAssign){
        return "Yes"
      } else {
        return "No"
      }
    },
    AssignedVolunteers() {
      return this.Volunteers.filter( (volunteer) => {
          return this.Action.VolunteersAssigned.includes(volunteer.id)
        }
      )
    }
  },
  methods: {
    removeVol(vol) {
      this.$emit('unassignVolunteer', vol)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#assignedList{
  border:3px solid black;
  overflow-y: auto;
  max-height: 400px;
  }
.remove {
  color: red;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
