<template>
  <div class="" id="selectResident">
    <h2>Select Resident</h2>
    <ul class="nav nav-pills nav-fill mb-3" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="existing-resident-tab" data-toggle="tab" href="#existing" role="tab" aria-controls="existingResident" aria-selected="true">Existing Resident</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="new-resident-tab" data-toggle="tab" href="#new" role="tab" aria-controls="newResident" aria-selected="false">New Resident</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="existing" role="tabpanel" aria-labelledby="existing-resident-tab">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="card">
              <input v-model="search" class="form-control card-header" type="search" placeholder="Search">
              <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(resident,key) in filterSearch" :key="key">
                  <div class="btn-group float-right" role="group">
                    <button class="btn btn-success" v-on:click="setResident(resident.id)">Select</button>
                  </div>
                  <a href=""><div>{{ resident.first_name }} {{ resident.last_name }}</div></a>
                  <div class="text-muted">{{ resident.address_line_1 }}</div>
                </li>
                <li v-if="filterSearch.length <= 0" class="list-group-item">No resident found</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="new" role="tabpanel" aria-labelledby="new-resident-tab">
        <div class="row justify-content-center">
          <div class="col col-lg-10">
            <div class="card">
              <new-resident-form class="card-body" :title="'Create New Resident'" @set-resident="setResident($event)"></new-resident-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import NewResidentForm from "./NewResidentForm.vue"
export default {
  name: 'SelectResident',
  components: {
    NewResidentForm
  },
  data() {
    return {
      search: ""
    }
  },
  computed: {
    filterSearch() {
      return this.Residents.filter( (resident) => {
        return resident.first_name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 || resident.last_name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
      })
    }
  },
  props: {
    Residents: Array
  },
  methods: {
    setResident: function (id) {
      window.location.href = "./add/?id=" + id;
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
a {
  color: #42b983;
}
</style>
