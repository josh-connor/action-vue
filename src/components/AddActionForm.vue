<template>
  <form class="container" novalidate>
    <div class="form-group row">
      <label for="helpType" class="col-sm-4 col-lg-4 col-form-label">Help Type</label>
        <select required v-model="action.helpType" id="helpType" class="form-control select-picker col-10 col-sm-6">
          <option></option>
          <option :value="type.name" v-for="type in data.HelpTypes">{{type.name}}</option>
        </select>
          <button class="btn btn-secondary rounded-circle ml-3" type="button" data-toggle="modal" data-target="#addNewHelpType"><i class="fas fa-plus"></i></button>
    </div>
    <div class="form-group row">
      <label for="volNeeded" class="col-sm-4 col-lg-4 col-form-label">Volunteers Needed</label>
      <input type="number" v-model="action.volunteers_needed" class="form-control w-auto col-3 col-sm-3" id="volNeeded" aria-describedby="" placeholder="" value="1" min="1">
    </div>
    <div class="form-group row">
      <label for="dueDate" class="col-sm-4 col-lg-4 col-form-label">Due Date</label>
      <input required type="date" class="form-control w-auto col-12 col-sm-8 col-md-auto" id="dueDate" placeholder="">
    </div>
    <div class="form-group row">
      <label for="dueTime" class="col-sm-4 col-lg-4 col-form-label">Due Time</label>
      <input required type="time" class="form-control w-auto col-12 col-sm-8 col-md-auto" id="dueTime" placeholder="">
      <div class="invalid-feedback">
        Please set a time.
      </div>
    </div>
    <fieldset class="form-group">
      <div class="row">
        <legend class="col-sm-4 col-lg-4 col-form-label">Priority</legend>
        <div class="col-sm-8 col-lg-6">
          <div v-for="(priority, key) in data.Priorities" :key="key" class="form-check">
            <input v-model="action.action_priority" class="form-check-input" type="radio" name="actionPriority" :id="'priorityRadio' + key" :value="key">
            <label class="form-check-label" :for="'priorityRadio' + key">
              {{priority}}
            </label>
          </div>
        </div>
      </div>
    </fieldset>
    <fieldset class="form-group">
      <div class="row">
        <legend  class="col-sm-4 col-lg-4 col-form-label">Volunteer Requirements</legend>
        <div class="col-sm-8 col-lg-8">
          <div class="form-check" v-for="(requirement, key) in data.Requirements" :key="key">
            <input v-model="action.volunteer_requirements" :id="'requirement' + key" name="checkbox" type="checkbox" class="form-check-input" :value="key"/>
            <label class="form-check-label" :for="'requirement' + key">
             {{requirement}}
            </label>
          </div>
        </div>
      </div>
    </fieldset>
    <div class="form-group row">
      <label class="col-sm-4 col-lg-4 col-form-label" for="publicDescription">Public Description</label>
      <textarea required v-model="action.public_description" class="form-control col-sm-8 col-lg-8" id="publicDescription" rows="3"></textarea>
    </div>
     <div class="form-group row">
      <label class="col-sm-4 col-lg-4 col-form-label" for="privateDescription">Private Description</label>
      <textarea required v-model="action.private_description" class="form-control col-sm-8 col-lg-8" id="privateDescription" rows="3"></textarea>
    </div>
    <div class="text-right"><button type="submit" class="btn btn-primary">Save</button></div>
  </form>
</template>

<script>
export default {

  name: 'AddActionForm',

  data () {
    return {
    }
  },
  props: ['data', 'action'],
  methods: {
    
  }
}
</script>

<style lang="css" scoped>
</style>