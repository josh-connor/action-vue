<template>
  <div class="action-module" id="assignVolunteers">
    <div class="float-right">
      <label>Override Interest <input type="checkbox" v-model="override.interest" class="checkboxinput" name=""></label> <label>Override Requirements <input type="checkbox" class="checkboxinput" v-model="override.requirements" name=""></label> <input v-model="search" placeholder="search">
    </div>
    <h2>Assign Volunteers</h2>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="volunteer in filterInterested" :key="volunteer.id">
        <div class="btn-group float-right" role="group">
          <button v-if="IsInterested(volunteer)" class="btn btn-danger" v-on:click="$emit('removeInterest', volunteer)">Remove Interest</button>
          <button v-if="!IsInterested(volunteer)" class="btn btn-primary" v-on:click="$emit('addInterest',volunteer)">Add Interest</button>
          <button class="btn btn-success" v-on:click="$emit('assignVolunteer',volunteer)">Assign</button>
        </div>
        <a href=""><div>{{ volunteer.first_name }} {{ volunteer.last_name }}</div></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AssignVolunteers',
  data() {
    return {
      search: "",
      override:{
        interest: false,
        requirements: false
      }
    }
  },
  computed: {
    InterestedVolunteers() {
      if (this.override.interest && this.override.requirements) {
        return this.Volunteers.filter( (volunteer) => {
            return !this.Action.VolunteersAssigned.includes(volunteer.id)
          }
        )
      } else if (this.override.interest) {
        return this.Volunteers.filter( (volunteer) => {
            return !this.Action.VolunteersAssigned.includes(volunteer.id)
          }
        )
      } else if (this.override.requirements) {
        return this.Volunteers.filter( (volunteer) => {
            return this.Action.VolunteersInterested.includes(volunteer.id)
          }
        )
      } else {
        return this.Volunteers.filter( (volunteer) => {
            return this.Action.VolunteersInterested.includes(volunteer.id)
          }
        )
      }
    },
    filterInterested() {
      return this.InterestedVolunteers.filter( (volunteer) => {
        return volunteer.first_name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 || volunteer.last_name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
      })
    }
  },
  props: {
    Action: Object,
    Volunteers: Array
  },
  methods: {
    IsInterested(vol) {
      if (this.Action.VolunteersInterested.includes(vol.id) ){
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label{
  margin: auto;
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
