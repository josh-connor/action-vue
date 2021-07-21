<template>
  <div class="action-module" id="actionDetils">
    <div class="list-group">
      <single-action v-for="Action in ActionsToRender" :Action="Action"></single-action>
    </div>
  </div>
</template>

<script>
import SingleAction from './SingleAction.vue'
import data from '../data.json'
export default {
  name: 'ActionList',
  data() {
    return{
    }
  },
  computed:{
  },
  props: {
    ActionsToRender: Array
  },
  components: {
    SingleAction
  },
  created(){
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
