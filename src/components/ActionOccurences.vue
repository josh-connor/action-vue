<template>
  <div class="action-module">
    <h2>Upcoming Occurences</h2>
    <div class="row row-cols-1 row-cols-md-4 p-3">
      <div v-for="Occurence in OccurencesUpcoming" class="col border p-3">
        <div>{{Occurence.date}}</div>
        <div>{{Occurence.VolunteersAssigned.length}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionOccurences',
  data() {
    return {
      
    }
  },
  props: {
    Action: Object,
    Occurences: Array
  },
  computed: {
    OccurencesUpcoming() {
      return this.Occurences.filter( (occurence) => {
          return this.Action.Occurences.includes(occurence.id)
        }
      )
    }
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
