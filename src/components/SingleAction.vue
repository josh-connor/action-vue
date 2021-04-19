<template>
  <div class="" :id="'singleAction'+ActionID">
    {{ActionType(ActionID)}}<br>
    {{ActionDate(ActionID)}}
  </div>
</template>

<script>
import data from '../data.json'

export default {
  name: 'SingleAction',
  data() {
    return{
      Actions: data.Actions,
      HelpTypes: data.HelpTypes
    }
  },
  methods: {
    ActionType: function (id) {
      var Action = this.Actions[id]
      var help_type = Action.help_type
        return this.HelpTypes[help_type].name
    },
    ActionDate: function (id) {
      var Action = this.Actions[id]
      var d = new Date(0)
      return d.setUTCSeconds(Action.requested_datetime)
    }
  },
  props: {
    ActionID: Number
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label {
  margin: 40px 0 0;
  font-weight: bold;
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
