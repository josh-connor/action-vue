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
              <textarea class="form-control col-sm-7" id="defaultPublicDescription" rows="3" v-model="helptype.publicDescription"></textarea>
            </div>
             <div class="form-group row">
              <label class="col-sm-4 col-lg-4 col-form-label" for="defaultPrivateDescription">Default Private Description</label>
              <textarea class="form-control col-sm-7" id="defaultPrivateDescription" rows="3" v-model="helptype.privateDescription"></textarea>
            </div>
            <fieldset class="form-group">
              <div class="row">
                <legend  class="col-sm-4 col-lg-4 col-form-label">Default Volunteer Requirements</legend>
                <div class="col-sm-8 col-lg-8">
                  <div class="form-check" v-for="(requirement, key) in data.Requirements" :key="key">
                    <input :id="'defaultRequirement' + key" name="checkbox" type="checkbox" class="form-check-input" :value="key" v-model="helptype.requirements"/>
                    <label class="form-check-label" :for="'defaultRequirement' + key">
                     {{requirement}}
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
            <div class="form-group row">
              <label class="col-sm-4 col-lg-4 col-form-label" for="iconPicker">Icon</label>
              <div class="col-1"><i :class="helptype.icon"></i></div>
              <font-awesome-picker required class="w-auto col-11 col-sm-7" id="iconPicker" v-model="helptype.icon"></font-awesome-picker>
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
  props:["data","helptype"],
  data() {
    return {

    };
  },
  methods: {
    createHelpType: function () {
      Object.size = function(obj) {
        var size = 0,
          key;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
        }
        return size;
      };
      var size = Object.size(this.data.HelpTypes)
      this.helptype.icon = this.icon
      this.data.HelpTypes[size+1] = this.helptype
      this.$emit('set-action-type', {helptype: size+1})
      this.helptype = {name:"",
        publicDescription:"",
        privateDescription:"",
        requirements:[],
        icon:"fas fa-hand-holding"}
      $('#addNewHelpType').modal('hide')
    },
    clearHelpType: function () {
      this.helptype = {name:"",
          publicDescription:"",
          privateDescription:"",
          requirements:[],
          icon:"fas fa-hand-holding"}
      $('#addNewHelpType').modal('hide')
    }
  }
};
</script>


<style scoped>

</style>