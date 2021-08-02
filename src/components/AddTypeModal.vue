<template>
  <div class="modal fade" id="addNewHelpType" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="newHelpTypeTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="newHelpTypeTitle">Create new Help Type</h5>
          <button type="reset" class="close" data-dismiss="modal" aria-label="Close" @click="clearHelpType">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group row">
              <label for="typeName" class="col-sm-4 col-lg-4 col-form-label">Name</label>
              <input type="text" required class="form-control w-auto col-12 col-sm-7" id="typeName" placeholder="" v-model="helptype.name">
            </div>
            <div class="form-group row">
              <label class="col-sm-4 col-lg-4 col-form-label" for="defaultPublicDescription">Default Public Description</label>
              <textarea class="form-control col-sm-7" id="defaultPublicDescription" rows="3" v-model="helptype.public_description_template"></textarea>
            </div>
             <div class="form-group row">
              <label class="col-sm-4 col-lg-4 col-form-label" for="defaultPrivateDescription">Default Private Description</label>
              <textarea class="form-control col-sm-7" id="defaultPrivateDescription" rows="3" v-model="helptype.private_description_template"></textarea>
            </div>
            <fieldset class="form-group">
              <div class="row">
                <legend  class="col-sm-4 col-lg-4 col-form-label">Default Volunteer Requirements</legend>
                <div class="col-sm-8 col-lg-8">
                  <div class="form-check" v-for="(requirement, key) in requirements" :key="key">
                    <input :id="'defaultRequirement' + key" name="checkbox" type="checkbox" class="form-check-input" :value="key" v-model="helptype.requirements"/>
                    <label class="form-check-label" :for="'defaultRequirement' + key">
                     {{requirement.name}}
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
            <div class="row form-group flex-wrap validate-me">
              <div class="col-12 detail-field"><label class="">Number of Volunteers</label></div>
              <div class="col detail-field">
                <div class="row flex-wrap">
                  <label for="minimumVolunteers" class="col-form-label col-auto">Minimum</label>
                  <input class="form-control col" type="number" name="minimumVolunteers" min="1" :max="helptype.maximum_volunteers"v-model="helptype.minimum_volunteers">
                  <div class="invalid-feedback col-12">Cannot be more than max or less than 1</div>
                </div>
            </div>
            <div class="col detail-field">
              <div class="row">
                  <label for="maximumVolunteers" class="col-form-label col-auto">Maximum</label>
                  <input class="form-control col" type="number" :min="helptype.minimum_volunteers" name="maximumVolunteers" v-model="helptype.maximum_volunteers"><div class="invalid-feedback col-12">Cannot be less than min</div>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-4 col-lg-4 col-form-label" for="iconPicker">Icon</label>
              <div class="col-1"><i :class="faIcon"></i></div>
              <font-awesome-picker required class="w-auto col-11 col-sm-7" id="iconPicker" v-model="faIcon"></font-awesome-picker>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="reset" class="btn btn-secondary" data-dismiss="modal" @click="clearHelpType">Cancel</button>
          <button type="submit" class="btn btn-primary" @click="createHelpType">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FontAwesomePicker from "bootstrap-vue-font-awesome-picker"
export default {
  name: "AddTypeModal",
  components: {
    FontAwesomePicker
  },
  props:["requirements"],
  data() {
    return {
      helptype: {
        name:"",
        public_description_template:"",
        private_description_template:"",
        requirements:[],
        minimum_volunteers:"1",
        maximum_volunteers:"1",
        icon_name:"hand-holding"
      }
    };
  },
  methods: {
    createHelpType: function (e) {
      const csrftoken = this.getCookie('csrftoken');
      var helptype = JSON.stringify(this.helptype)
      if (!e.target.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          } else{
            event.preventDefault()
            event.stopPropagation()
            $.ajax({
        url: "/api/helptypes/",
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRFToken', csrftoken)
        },
        method: "POST",
        type:"POST",
        contentType:'application/json',
        data:helptype,
        success: (response) =>{
          this.$emit('new-helptype', response)
          this.clearHelpType()
        }
      })
          }
          e.target.classList.add('was-validated')

      /*Object.size = function(obj) {
        var size = 0,
          key;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
        }
        return size;
      };
      var size = Object.size(this.help_types)
      this.helptype.icon = this.icon
      this.help_types[size+1] = this.helptype
      this.$emit('set-action-type', {helptype: size+1})
      this.helptype = {name:"",
        publicDescription:"",
        privateDescription:"",
        requirements:[],
        icon:"hand-holding"}
      $('#addNewHelpType').modal('hide')*/
    },
    clearHelpType: function () {
      this.helptype = {
        name:"",
        public_description_template:"",
        private_description_template:"",
        requirements:[],
        minimum_volunteers:"1",
        maximum_volunteers:"1",
        icon_name:"hand-holding"
      }
      $('#addNewHelpType').modal('hide')
    }
  },
  computed:{
    faIcon:{
      get() {
        return "fas fa-" + this.helptype.icon_name
      },
      set(value) {
        var icon = value.split("fa-")
        this.helptype.icon_name = icon[1]
      }
    }
  }
};
</script>


<style scoped>

</style>