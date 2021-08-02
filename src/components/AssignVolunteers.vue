<template>
  <div class="action-module card" id="assignVolunteers">
    <div class="card-header">
      <div class="row align-items-center ">
        <div class="col-12 col-md-5">
          <h2 class="card-title">Assign Volunteers</h2>
        </div>
      
      
        <div class="col-md-auto form-check-inline">
          <input type="checkbox" v-model="override.interest" class="checkboxinput form-check-input" name="orrInterest" id="orrInterest"><label class="ml-3 form-check-label" for="orrInterest">Override Interest</label>
        </div>
        
        <div class="col-md-auto form-check-inline">
          
          <input type="checkbox" class="checkboxinput form-check-input" v-model="override.requirements" name="orrRequirements" id="orrRequirements" :disabled="override.interest !== true"><label for="orrRequirements" class="ml-3 form-check-label" :class="{disabled: !override.interest}">Override Requirements</label>
        </div>
        
        <div class="col">
          <input class="form-control" type="search" v-model="search" placeholder="search">
        </div>
        
      </div>
    </div>
    <div v-if="DataLoaded" class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="volunteer in filterAvailable" :key="volunteer.pk">
          <div class="btn-group float-right" role="group">
            <button class="btn btn-success" v-on:click="$emit('assignVolunteer',volunteer)">Assign</button>
          </div>
          <a class="text-info" :href="'/actions/coordinator/volunteer/?id='+volunteer.pk"><div>{{ volunteer.first_name }} {{ volunteer.last_name }}</div></a>
        </li>
      </ul>
    </div>
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
    DataLoaded() {
      if (typeof this.action_details !== "undefined") {
        return true
      }
      return false
    },
    AvailableVolunteers() {
      if (typeof this.action_details !== "undefined") {
      if (this.override.interest && this.override.requirements) {
        return this.Volunteers.filter( (volunteer) => {
            return !this.action_details.assigned_volunteers.includes(volunteer.pk)
          }
        )
      } else if (this.override.interest) {
        return this.PotentialVolunteers.filter( (volunteer) => {
            return !this.action_details.assigned_volunteers.includes(volunteer.pk)
          }
        )
      } /*else if (this.override.requirements) {
        return this.Volunteers.filter( (volunteer) => {
            return this.action_details.potential_volunteer_ids.includes(volunteer.pk)
          }
        )
      }*/ else {
        return this.InterestedVolunteers.filter( (volunteer) => {
          return !this.action_details.assigned_volunteers.includes(volunteer.pk)
        })
      }}
      return ""
    },
    filterAvailable() {
      return this.AvailableVolunteers.filter( (volunteer) => {
        return volunteer.first_name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 || volunteer.last_name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
      })
    },
    PotentialVolunteers(){
      return this.Volunteers.filter( (volunteer) => {
            return this.action_details.potential_volunteer_ids.includes(volunteer.pk)
          }
        )
    },
    InterestedVolunteers(){
      return this.Volunteers.filter( (volunteer) => {
          return this.action_details.interested_volunteers.includes(volunteer.pk)
        }
      )
    }
  },
  props: {
    action_details: Object,
    Volunteers: Array
  },
  methods: {
    IsInterested(vol) {
      if (this.action_details.potential_volunteer_ids.includes(vol.pk) ){
        return true
      } else {
        return false
      }
    },
    IsAssigned(vol){
      if (this.action_details.assigned_volunteers.includes(vol.pk) ){
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
</style>
