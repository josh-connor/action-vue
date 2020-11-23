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
        <div v-for="volunteer in AssignedVolunteers" :key="volunteer.id">
          <div>{{ volunteer.FirstName }} {{ volunteer.LastName }}</div>
          <button class="btn btn-danger" v-on:click="removeVol(volunteer)">Remove</button>
        </div>
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
