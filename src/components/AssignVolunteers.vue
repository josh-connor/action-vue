<template>
  <div class="action-module" id="assignVolunteers">
    <div class="row align-items-center">
      <div class="col-12 col-md-5">
        <h2>Assign Volunteers</h2>
      </div>
    
    
      <div class="col-md-auto">
        <input type="checkbox" v-model="override.interest" class="checkboxinput" name="orrInterest" id="orrInterest"><label class="ml-3" for="orrInterest">Override Interest</label>
      </div>
      
      <div class="col-md-auto">
        
        <input type="checkbox" class="checkboxinput" v-model="override.requirements" name="orrRequirements" id="orrRequirements"><label for="orrRequirements" class="ml-3">Override Requirements</label>
      </div>
      
      <div class="col">
        <input class="form-control" type="search" v-model="search" placeholder="search">
      </div>
      
    </div>
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
