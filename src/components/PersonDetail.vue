<template>
  <div class="action-module" id="actionDetils">
    <button v-if="!editable" class="btn float-right" v-on:click="editable = true">Edit</button>
    <button v-if="editable" class="btn float-right" v-on:click="editable = false">Save</button>
    <h2>{PersonType}</h2>
    
    <div class="row">
      <div class="col-md-7">
        <div class="">
          <label>Name</label>
          <div>{{  }}</div>
        </div>
      </div>
      <div class="col">
        <div class="">
          <label>Due Date</label>
          <div>{{  }}</div>
        </div>
        <div class="">
          <label>Due Time</label>
          <div>{{  }}</div>
        </div>
        <div class="">
          <label>Volunteer Requirements</label>
          <div>
            <ul>
              <li v-for="" :key="">
                {{  }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionDetail',
  data() {
    return{
      editable: false
    }
  },
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea {
  width: 100%;
  height: auto;
}
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
