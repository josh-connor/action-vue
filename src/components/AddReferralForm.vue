<template>
  <form class="container card-body" novalidate @submit="validateForm($event)">
    <h2 class="card-title">{{title}}</h2>
    <div class="form-group row">
      <label class="col-sm-4">Resident</label>
      <div class="col">
        <input class="form-control" type="text" name="" v-model="activeResident.first_name + ' ' + activeResident.last_name" readonly>
      </div>
    </div>
    <div class="form-group row">
      <label for="referralType" class="col-sm-4 col-lg-4 col-form-label">Referral Type</label>
      <div class="col-10 col-sm-6">
        <select required v-model="referral.referral_type" id="referralType" class="form-control select-picker">
          <option></option>
          <option :value="type.id" v-for="type in referralTypes">{{type.name}}</option>
        </select>
      </div>
      <div class="col-2">
        <button class="btn btn-secondary rounded-circle" type="button" data-toggle="modal" data-target="#addNewReferralType"><i class="fas fa-plus"></i></button>
      </div>
    </div>
    <div class="form-group row">
      <label for="organisation" class="col-sm-4 col-lg-4 col-form-label">Organisation</label>
      <div class="col-10 col-sm-6">
        <select required v-model="referral.referral_organisation" id="organisation" class="form-control select-picker">
          <option></option>
          <option :value="organisation.id" v-for="organisation in organisations">{{organisation.name}}</option>
        </select>
      </div>
        <div class="col-2">
          <button class="btn btn-secondary rounded-circle" type="button" data-toggle="modal" data-target="#addNewOrganisation"><i class="fas fa-plus"></i></button>
        </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-4 col-lg-4 col-form-label" for="referralNotes">Notes</label>
      <div class="col-sm-8 col-lg-8">
        <textarea required v-model="referral.notes" class="form-control" id="referralNotes" rows="3"></textarea>
      </div>
    </div>
    <div class="form-group row">
      <label for="referralStatus" class="col-sm-4 col-lg-4 col-form-label">Status</label>
      <div class="col-12 col-sm-8">
        <select required v-model="referral.status" id="referralStatus" class="form-control select-picker">
          <option :value="key" v-for="status, key in statuses" :key="key">{{status}}</option>
        </select>
      </div>
    </div>
    <div class="row form-group mt-3">
      <div class="col">
        <button type="button" class="btn btn-secondary" @click="discardForm">Discard</button>
      </div>
      <div class="text-right col">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {

  name: 'AddReferralForm',

  data () {
    return {
      statuses: {
        1: "Pending",
        2: "Contacted",
        3: "Completed"
      }
    }
  },
  props: ['data', 'action', 'activeResident','title','referralTypes','organisations', 'referral'],
  methods: {
    validateForm: function (event) {
      event.preventDefault()
      if (!event.target.checkValidity()) {
        console.log('not valid')
      } else {
        console.log(event)
        this.addNewReferral(event)
      }
      event.target.classList.add('was-validated')
    },
    addNewReferral: function (e) {
      const csrftoken = this.getCookie('csrftoken');
      var referral = JSON.stringify(this.referral)
      console.log(referral)
      if (!e.target.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          } else{
            event.preventDefault()
            event.stopPropagation()
            $.ajax({
        url: "/api/referrals/",
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRFToken', csrftoken)
        },
        method: "POST",
        type:"POST",
        contentType:'application/json',
        data:referral,
        success: (response) =>{
          this.$emit('new-referral', response)
        }
      })
          }
          e.target.classList.add('was-validated')
    },
    discardForm: function () {
      bootbox.confirm("Are you sure you want to discard this referral?", (result) =>{
        if (result === true) {
          this.$emit('discard-form')
        }
      })
    }
  },
  created() {
  }
}
</script>

<style lang="css" scoped>
</style>