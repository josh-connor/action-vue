<template>
  <div v-if="DataLoaded" class="action-module card" id="actionAssignments">
    <div class="card-header">
      <h2 class="card-title">Assigned</h2>
      <div></div>
    </div>    
    <div class="card-body">
      <div class="d-flex flex-column h-100">
        <div class="col-auto">
          <div class="row">
            <label class="col col-auto col-form-label">Status</label>
          <select class="form-control col" v-model="action_details.action_status">
            <option v-for="value,key in action_statuses" :value="key">
              {{value}}
            </option>
          </select>
        </div>
        </div>
        <div class="col scroll-list-group p-2 align-self-stretch">
          <ul id="assignedList" class="list-group">
            <li class="list-group-item" v-for="volunteer in AssignedVolunteers" :key="volunteer.id">
              <div class="appendable">
                <a class="text-info" href=""><div>
                  {{ volunteer.first_name }} {{ volunteer.last_name }}
                </div></a>
                <div class="button-append">
                  <button type="button" class="btn btn-danger" aria-label="Close" v-on:click="removeVol(volunteer)">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </li>
            <li v-for="item in action_details.maximum_volunteers - AssignedVolunteers.length" class="unassigned list-group-item disabled">Unassigned</li>
          </ul>
        </div>
        <div class="col-auto ml-auto">
          <div>Volunteers assigned: {{ action_details.assigned_volunteers.length }}/{{ action_details.maximum_volunteers }}</div>
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
    action_details: Object,
    Volunteers: Array
  },
  computed: {
    DataLoaded() {
      if (typeof this.action_details !== "undefined") {
        return true
      }
      return false
    },
    IsAutoAssign() {
      if (this.action_details){
        return "Yes"
      } else {
        return "No"
      }
    },
    AssignedVolunteers() {
        return this.Volunteers.filter( (volunteer) => {
          return this.action_details.assigned_volunteers.includes(volunteer.pk)
        }
      )
    },
    actionStatus() {
      var status = this.action_details.action_status
      return status
    }
  },
  methods: {
    removeVol(vol) {
      this.$emit('unassignVolunteer', vol)
    }
  },
  watch: {
    actionStatus: function(val, oldVal){
      if (typeof oldVal !== "undefined") {
        if (val === "2") {
          if(window.confirm("This will clear all assigned volunteers")){
            this.$emit("statusUpdate")
          }
        } else {
        this.$emit("statusUpdate")}
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scroll-list-group{
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  flex-basis: 0;
  max-height: 550px;
  flex-shrink: 1;
  flex-grow: 1;
  }
.remove {
  color: red;
}
.appendable{
  display: flex;
  justify-content: space-between;
  align-items: center; 
  margin-right: -1.25rem;
  margin-top: -0.75rem;
  margin-bottom: -0.75rem;
}
.appendable a {
  flex: 1;
}
.button-append{
  margin-left: -1px;
  flex-basis: 0;
  display: flex;
}
.list-group-item:first-child .appendable,.list-group-item:first-child  .button-append,.list-group-item:first-child .btn {
  border-top-right-radius: inherit;
}
.list-group-item:last-child .appendable,.list-group-item:last-child  .button-append,.list-group-item:last-child .btn {
  border-bottom-right-radius: inherit;
}
.button-append .btn{
  border-radius: 0;
  position: relative;
  z-index: 2;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
</style>
