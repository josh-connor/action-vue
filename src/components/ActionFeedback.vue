<template>
  <div class="action-module" id="actionFeedback">
    <h2>Feedback left</h2>
    <table class="table">
      <tr>
        <td>Volunteer</td>
        <td>Date Completed</td>
        <td>Feedback</td>
      </tr>
      <tr v-for="assignment in Assignments">
        <td><a href="">{{volunteer(assignment.volunteer).first_name}} {{volunteer(assignment.volunteer).last_name}}</a></td>
        <td>{{assignment.CompletedDate}}</td>
        <td>{{assignment.feedback}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ActionFeedback',
  data() {
    return {

    }
  },
  props: {
    Action: Object,
    Volunteers: Array,
    Assignments: Array
  },
  methods:{
    volunteer(id) {
      return this.Volunteers.find(vol => vol.id === id)
    }
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
