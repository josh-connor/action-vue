<template>
  <form class="container needs-validation" novalidate @submit="postForm($event)">
    <h2>{{title}}</h2>
    <fieldset class="form-group">
      <div class="form-group row">
        <label for="first_name" class="col-sm-4 col-form-label">First Name</label>
        <div class="col-8 col-md-6 col-lg-4">
          <input type="text" required v-model="resident.first_name" id="first_name" name="first_name" class="form-control">
        </div>
      </div>
      <div class="form-group row">
        <label for="last_name" class="col-sm-4 col-form-label">Last Name</label>
        <div class="col-8 col-md-6 col-lg-4">
          <input type="text" required v-model="resident.last_name" id="last_name" name="last_name" class="form-control">
        </div>
      </div>
    </fieldset>
    <fieldset class="form-group">
      <div class="form-group row">
        <label for="email" class="col-sm-4 col-form-label text-muted">Email Address</label>
        <div class="col-10 col-sm-8 col-lg-6">
          <input type="email" v-model="resident.email" id="email" name="email" class="form-control">
        </div>
      </div>
      <div class="form-group row">
        <label for="phone" class="col-sm-4 col-form-label text-muted">Phone Number</label>
        <div class="col-6 col-md-4 col-lg-3">
          <input type="tel" v-model="resident.phone" id="phone" name="phone" class="form-control">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-4 col-form-label-info">
        <label for="phone_secondary" class="col-form-label text-muted">Secondary Phone</label>
        <small id="addressLine3Help" class="form-text text-muted">(optional)</small></div>
        <div class="col-6 col-md-4 col-lg-3">
          <input type="tel" v-model="resident.phone_secondary" id="phone_secondary" name="phone_secondary" class="form-control">
        </div>
      </div>
    </fieldset>
    <fieldset class="form-group">
      <div class="row form-group">
        <legend class="col-sm-4 col-form-label">Address</legend>
        <div class="col-10 col-sm-8 address-group"><small id="addressLine1Help" class="form-text text-muted">Address Line 1</small>
          <input required class="form-control" type="text" name="address_line_1" v-model="resident.address_line_1">
          <small id="addressLine2Help" class="form-text text-muted">Address Line 2 (optional)</small>
          <input class="form-control" type="text" name="address_line_2" v-model="resident.address_line_2">
          <small id="addressLine3Help" class="form-text text-muted">Address Line 3 (optional)</small>
          <input class="form-control" type="text" name="address_line_3" v-model="resident.address_line_3">
        </div>
      </div>
      <div class="row form-group">
        <label class="col-form-label col-sm-4">Postcode</label>
        <div class="col-5 col-sm-4 col-lg-3">
          <input required class="form-control" type="text" name="postcode" v-model="resident.postcode">
        </div>
      </div>
      <div class="row form-group">
        <label class="col-form-label col-sm-4">Ward</label>
        <div class="col col-sm-auto">
          <select class="form-control">
            <option></option>
            <option v-for="ward in wards" :value="ward.id">
              {{ward.name}}
            </option>
          </select>
        </div>
      </div>
    </fieldset>
    <fieldset class="form-group">
      <div class="row">
      <legend class="col-form-label col-sm-4">Status</legend>
      <div class="col">
        <div class="form-check">
          <input type="checkbox" v-model="resident.shielded" class="form-check-input" id="shieldedCheck" name="shieldedCheck">
          <label for="shieldedCheck" class="form-check-label">Shielded</label>
          <small id="shieldedHelp" :class="{active: showHelp}" class="form-text text-info help-text">Is this person shielded?</small>
        </div>
        <div class="form-check">
          <input type="checkbox" v-model="resident.internet_access" class="form-check-input" id="internetAccessCheck" name="internetAccessCheck">
          <label for="internetAccessCheck" class="form-check-label">Internet access</label>
          <small id="internetAccessHelp" :class="{active: showHelp}" class="form-text text-info help-text">Does this person have internet access?</small>
        </div>
        <div class="form-check">
          <input type="checkbox" v-model="resident.smart_device" class="form-check-input" id="smartDeviceCheck" name="smartDeviceCheck">
          <label for="smartDeviceCheck" class="form-check-label">Smart device</label>
          <small id="smartDeviceHelp" :class="{active: showHelp}" class="form-text text-info help-text">Does this person have a Smart Device</small>
        </div>
        <div class="form-check">
          <input type="checkbox" v-model="resident.confident_online_shopping" class="form-check-input" id="confidentShopCheck" name="confidentShopCheck">
          <label for="confidentShopCheck" class="form-check-label">Confident online shopping</label>
          <small id="confidentShopHelp" :class="{active: showHelp}" class="form-text help-text text-info">Is this person confident shopping online?</small>
        </div>
        <div class="form-check">
          <input type="checkbox" v-model="resident.confident_online_comms" class="form-check-input" id="confidentOnlineCheck" name="confidentOnlineCheck">
          <label for="confidentOnlineCheck" class="form-check-label">Confident online comms</label>
          <small id="confidentOnlineHelp" :class="{active: showHelp}" class="form-text text-info help-text">Is this person confident communicating online?</small>
        </div>
      </div>
      <div class="col-1">
        <i class="fas fa-question text-info" data-toggle="tooltip" title="Click for more help" data-placement="top" @click="toggleHelp"></i>
      </div>
    </div>
    </fieldset>
     <div class="form-group row">
      <label class="col-sm-4 col-form-label text-muted" for="residentNotes">Notes</label>
      <div class="col-sm-8">
        <textarea class="form-control" id="residentNotes" name="residentNotes" v-model="resident.notes" rows="3"></textarea>
      </div>
    </div>
    <div class="form-group row">
      <label for="consentRecieved" class="col-sm-4 col-lg-4 col-form-label">Consent Recieved</label>
      <div class="col-12 col-sm-8 col-md-auto">
        <input required type="date" class="form-control w-auto" id="dueDate" placeholder="" v-model="resident.data_consent_date">
      </div>
    </div>
    <div class="text-right"><button type="submit" class="btn btn-primary"">Save</button></div>
  </form>
</template>

<script>
export default {

  name: 'NewResidentForm',

  data () {
    return {
      resident: {
        "first_name":null,
        "last_name":null,
        "email":null,
        "phone":null,
        "phone_secondary":null,
        "address_line_1":null,
        "address_line_2":null,
        "address_line_3":null,
        "postcode":null,
        "shielded":false,
        "internet_access":false,
        "smart_device":false,
        "confident_online_shopping":false,
        "confident_online_comms":false,
        "permission":false,
        "notes":null,
        "time_received":null,
        "data_consent_date":null,
      },
      wards: [],
      showHelp: false
    }
  },
  props: ['title', ''],
  watch: {

  },
  methods: {
    toggleHelp: function () {
      this.showHelp = !this.showHelp
    },
    postForm: function (e) { 
      function getCookie(name) {
          let cookieValue = null;
          if (document.cookie && document.cookie !== '') {
              const cookies = document.cookie.split(';');
              for (let i = 0; i < cookies.length; i++) {
                  const cookie = cookies[i].trim();
                  // Does this cookie string begin with the name we want?
                  if (cookie.substring(0, name.length + 1) === (name + '=')) {
                      cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                      break;
                  }
              }
          }
          return cookieValue;
      }
      const csrftoken = getCookie('csrftoken');
      console.log(e)
      var resident = JSON.stringify(this.resident)
      console.log(resident)
      if (!e.target.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          } else{
            event.preventDefault()
            event.stopPropagation()
            $.ajax({
        url: "/api/residents/",
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRFToken', csrftoken)
        },
        method: "POST",
        type:"POST",
        contentType:'application/json',
        data:resident,
        success: function(response){
          console.log(response.id)
          this.$emit('set-resident', {id:response.id})
        }
      })
          }
          e.target.classList.add('was-validated')
    },
    fetchWards: function () {
      $.getJSON(
        "http://localhost:8000/api/wards",
        response => {
          this.wards = response.results
        }
        )
    }
  },
  mounted: function(){
    /*jQuery('[data-toggle="tooltip"]').tooltip()
    //Bootstrap validation
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
   /* Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', event => {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          } else{
            event.preventDefault()
            event.stopPropagation()
            postForm(event)
          }
          form.classList.add('was-validated')
        }, false)
      })*/
    this.fetchWards()
  }
}
</script>

<style lang="css" scoped>
  .address-group label {
    font-size: 0.6em;
    line-height: 0.6em;
    padding: 0;
  }
  .help-text {
    display: none;
    margin-top: 0;
  }
  .help-text.active {
    display: block;
  }
  .col-form-label-info label{
    padding-bottom: 0;
  }
  .col-form-label-info small{
    margin-top: 0;
  }
</style>