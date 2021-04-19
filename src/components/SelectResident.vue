<template>
  <div class="" id="selectResident">
    <h2>Select Resident</h2>
    <input v-model="search" placeholder="search">
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="(resident,key) in filterSearch" :key="key">
        <div class="btn-group float-right" role="group">
          <button class="btn btn-success" v-on:click="">Select</button>
        </div>
        <a href=""><div>{{ resident.first_name }} {{ resident.last_name }}</div></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SelectResident',
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
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
