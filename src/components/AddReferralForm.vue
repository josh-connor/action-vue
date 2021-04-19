<template>
  <form class="container" novalidate>
    <div class="form-group row">
      <label for="referralType" class="col-sm-4 col-lg-4 col-form-label">Referral Type</label>
        <select required v-model="referral.referralType" id="referralType" class="form-control select-picker col-10 col-sm-6">
          <option></option>
          <option :value="type.name" v-for="type in data.HelpTypes">{{type.name}}</option>
        </select>
          <button class="btn btn-secondary rounded-circle ml-3" type="button" data-toggle="modal" data-target="#addNewReferralType"><i class="fas fa-plus"></i></button>
    </div>
    <div class="form-group row">
      <label for="organisation" class="col-sm-4 col-lg-4 col-form-label">Organisation</label>
        <select required v-model="referral.organisation" id="organisation" class="form-control select-picker col-10 col-sm-6">
          <option></option>
          <option :value="type.name" v-for="type in data.HelpTypes">{{type.name}}</option>
        </select>
          <button class="btn btn-secondary rounded-circle ml-3" type="button" data-toggle="modal" data-target="#addNewOrganisation"><i class="fas fa-plus"></i></button>
    </div>
    <div class="form-group row">
      <label class="col-sm-4 col-lg-4 col-form-label" for="referralNotes">Notes</label>
      <textarea required v-model="referral.notes" class="form-control col-sm-8 col-lg-8" id="referralNotes" rows="3"></textarea>
    </div>
    <div class="form-group row">
      <label for="referralStatus" class="col-sm-4 col-lg-4 col-form-label">Referral Type</label>
        <select required v-model="referral.status" id="referralStatus" class="form-control select-picker col-10 col-sm-6">
          <option></option>
          <option :value="type.name" v-for="type in data.HelpTypes">{{type.name}}</option>
        </select>
    </div>
    <div class="text-right"><button type="submit" class="btn btn-primary">Save</button></div>
  </form>
</template>

<script>
export default {

  name: 'AddReferralForm',

  data () {
    return {
      referral:{
        referralType:"",
        organisation:"",
        notes:"",
        status:""
      }
    }
  },
  props: ['data', 'action'],
  methods: {

  }
}
</script>

<style lang="css" scoped>
</style>