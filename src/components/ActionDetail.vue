<template>
  <div class="action-module card" id="actionDetils">
    <div class="card-header">
      <h2 class="card-title d-inline-block">Action Details</h2>
      <div class="float-right">
        <button v-if="!editable" class="btn btn-secondary" v-on:click="editable = true">Edit</button>
      </div>
      <div class="float-right btn-group">
        <button v-if="editable" class="btn btn-danger" v-on:click="discardDetails">Discard</button>
        <button v-if="editable" type="submit" class="btn btn-success" form="detailsForm">Save Changes</button>
      </div>
      
    </div>
    
    <div class="card-body">
      <form class="row needs-validation" id="detailsForm" novalidate @submit="saveDetails($event)">
        <div class="col-md-7 form-group">
          <div class="detail-field form-group">
            <label class="" for="name">Resident</label>
            <a :href="'/actions/coordinator/resident/?id='+activeResident.id" class="text-info"><div v-if="!editable">{{ activeResident.first_name }} {{ activeResident.last_name }}</div></a>
            <input class="form-control" type="text" name="name" readonly disabled v-if="editable" v-model="fullName">
          </div>
          <div class="detail-field form-group"">
            <label for="helpType" class="">Action Type</label>
            <div v-if="!editable">{{ HelpType }}</div>
            <select class="form-control" v-if="editable" id="helpType" v-model="action_details.help_type">
              <option v-for="type in helpTypes" :value="type.id">{{type.name}}</option>
            </select>
          </div>
          <div class="detail-field form-group validate-me">
            <label for="publicDescription" class="">Public Description</label><button v-if="editable" class="btn float-right btn-secondary btn-sm" type="button" @click="CopyDefaultDescription('public')">Use Default</button><br>
            <div v-if="!editable">{{ action_details.public_description }}</div>
            <textarea required class="form-control" id="publicDescription" rows="5" v-if="editable" type="textarea" v-model="action_details.public_description" name=""></textarea>
            <div class="invalid-feedback">Must have public description</div>
          </div>
          <div class="detail-field form-group validate-me">
            <label for="privateDescription" class="">Private Description</label><button v-if="editable" class="btn float-right btn-secondary btn-sm" type="button" @click="CopyDefaultDescription('private')">Use Default</button>
            <div v-if="!editable">{{ action_details.private_description }}</div>
            <textarea required id="privateDescription" class="form-control no-validate" rows="5" v-if="editable" type="textarea" v-model="action_details.private_description" name=""></textarea>
            <div class="invalid-feedback">Must have private description</div>
          </div>
          <div class="row form-group flex-wrap validate-me">
            <div class="col-12 detail-field"><label class="">Number of Volunteers</label></div>
            <div class="col detail-field">
              <div class="row flex-wrap">
                <label for="minimumVolunteers" class="col-form-label col-auto">Minimum</label>
                <div class="col col-form-label" v-if="!editable">{{ action_details.minimum_volunteers }}</div>
                <input v-if="editable" class="form-control col" type="number" name="minimumVolunteers" min="1" :max="action_details.maximum_volunteers"v-model="action_details.minimum_volunteers">
                <div class="invalid-feedback col-12">Cannot be more than max or less than 1</div>
              </div>
            </div>
            <div class="col detail-field">
              <div class="row">
                <label for="maximumVolunteers" class="col-form-label col-auto">Maximum</label>
                <div class="col col-form-label" v-if="!editable">{{ action_details.maximum_volunteers }}</div>
                <input v-if="editable" class="form-control col" type="number" :min="action_details.minimum_volunteers" name="maximumVolunteers" v-model="action_details.maximum_volunteers"><div class="invalid-feedback col-12">Cannot be less than min</div>
              </div>
            </div>

          </div>
        </div>
        <div class="col">
          <div class="detail-field form-group">
            <label for="dueDate" class="">Due Date</label>
            <div v-if="!editable">{{ DueDate }}</div>
            <input v-if="editable" required type="date" class="form-control w-auto" id="dueDate" placeholder="" v-model="date">
          </div>
          <div class="detail-field form-group">
            <label for="dueTime" class="" >Due Time</label>
            <div v-if="!editable">{{ DueTime }}</div>
            <input v-if="editable" required type="time" class="form-control w-auto" id="dueTime" placeholder="" v-model="time">
          </div>
          <div class="detail-field form-group">
            <label for="actionPriority" class="">Priority</label>
            <div v-if="!editable">{{ Priority }}</div>
            <div v-if="editable">
              <select id="actionPriority" name="actionPriority" class="form-control" v-model="action_details.action_priority">
                <option value="3">High</option>
                <option value="2">Normal</option>
                <option value="1">Low</option>
              </select>
            </div>
          </div>
          <div class="detail-field form-group">
            <label for="volRequirements" class="">Volunteer Requirements</label>
            <div>
              <ul v-if="!editable">
                <li v-for="requirement in action_details.requirements">
                  {{ Requirement(requirement) }}
                </li>
              </ul>
              <div v-if="editable">
                <div class="form-check" v-for="requirement in requirements">
                  <input id="volRequirements" class="form-check-input class" v-model="action_details.requirements" type="checkbox" :name="requirement.name" :id="requirement.name" :value="requirement.id"><label class="form-check-label" :for="requirement.name">{{ requirement.name }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionDetail',
  data() {
    return{
      editable: false,
      requirements:{},
      priorities:{
        1:"Low",
        2:"Normal",
        3:"High"
      },
      date:"",
      time:""
    }
  },
  props: {
    action_details: Object,
    helpTypes: Object,
    activeResident: Object
  },
  watch: {
    date: function(val) {
      this.action_details.requested_datetime = val + " " + this.time
    },
    time: function(val) {
      this.action_details.requested_datetime = this.date + " " + val
    },
    editable: function(val) {
      if(this.action_details){
        var arr = this.action_details.requested_datetime.split("T")
        arr[1] = arr[1].slice(0,-1)
        this.$set(this, "date", arr[0])
        this.$set(this, "time", arr[1])
      }
    }
  },
  computed:{
    fullName: {
      get() {
        return `${this.activeResident.first_name} ${this.activeResident.last_name}`;
      },
      set(newValue) {
        const m = newValue.match(/(\S*)\s+(.*)/);

        this.activeResident.first_name = m[1];
        this.activeResident.last_name = m[2];
      }
    },
    HelpType: function() {
      var id = this.action_details.help_type
      if (this.helpTypes[id]){
      return this.helpTypes[id].name} else {
        return ""
      }
    },
    DueDate: function(){
      var d = new Date(this.action_details.requested_datetime)
      return d.toDateString()
    },
    DueTime: function(){
      var d = new Date(this.action_details.requested_datetime)
      return d.toTimeString()
    },
    Priority: function(){
      return this.priorities[this.action_details.action_priority]
    }
  },
  methods: {
    Requirement: function(id){
      return this.requirements[id].name
    },
    CopyDefaultDescription (type){
      if (type === "public") {
        this.action_details.public_description = this.helpTypes[this.action_details.help_type].public_description_template
      } else if (type === "private"){
        this.action_details.private_description = this.helpTypes[this.action_details.help_type].private_description_template
      }

    },
    discardDetails(){      
      var validateGroup = document.getElementsByClassName('validate-me'); 
      for (var i = 0; i < validateGroup.length; i++) {
          validateGroup[i].classList.remove('was-validated');
      }
      this.editable = false
      this.$emit("discard")

    },
    saveDetails(e){
      var validateGroup = document.getElementsByClassName('validate-me'); 
      if (e.target.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          event.stopPropagation();
          this.editable = false
          this.$emit("save")
          for (var i = 0; i < validateGroup.length; i++) {
              validateGroup[i].classList.remove('was-validated');
          }
        }
      for (var i = 0; i < validateGroup.length; i++) {
          validateGroup[i].classList.add('was-validated');
      }
      
    }
  },
  created() {
    this.getRequirements()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea {
  width: 100%;
  height: auto;
}
label {
  margin-bottom: 0.25rem;
  /*font-weight: bold;*/
}
.detail-field > label{
  font-weight: bold;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0;
}
a {
  color: #42b983;
}
</style>
