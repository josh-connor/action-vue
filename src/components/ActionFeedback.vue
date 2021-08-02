<template>
  <div class="action-module" id="actionFeedback">
    <h2>Feedback left</h2>
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th>Date Completed</th>
          <th>Volunteer</th>
          <th>Time Taken</th>
          <th>Feedback</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="feedback, key in action_feedback" :key="key" :id="'feedbackRow'+feedback.id">
          <td>{{readableDate(feedback.created_date_time)}}</td>
          <td><a href="">{{volunteerName(feedback.volunteer).first_name}} {{volunteerName(feedback.volunteer).last_name}}</a></td>
          <td>{{feedback.time_taken}}</td>
          <td>{{feedback.notes}}</td>
          <td><div class="btn-group"><button class="btn btn-secondary btn-sm" type="button">Edit</button><button class="btn btn-danger btn-sm" type="button">Delete</button></div></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ActionFeedback',
  data() {
    return {
      action_feedback: []
    }
  },
  props: {
    action_details: Object,
    Volunteers: Array,
    Assignments: Array
  },
  methods:{
    volunteerName(id) {
      return this.Volunteers.find(vol => vol.pk === id)
    },
    
  },
  created(){
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
