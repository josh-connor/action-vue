<template>
  <div class="action-module" id="actionDetils">
    <button v-if="!editable" class="btn float-right" v-on:click="editable = true">Edit</button>
    <button v-if="editable" class="btn float-right" v-on:click="editable = false">Save</button>
    <h2>Action Details</h2>
    
    <div class="row">
      <div class="col-md-7">
        <div class="">
          <label>Resident Name</label>
          <div>{{ Action.ResidentName }}</div>
        </div>
        <div class="">
          <label>Action Type</label>
          <div v-if="!editable">{{ Action.ActionType }}</div>
          <div v-if="editable">
            <select v-model="Action.ActionType">
            <option>Dog Walking</option>
            <option>Food Delivery</option>
          </select>
        </div>
        </div>
        <div class="">
          <label>Public Description</label><br>
          <div v-if="!editable">{{ Action.PublicDescription }}</div>
          <textarea rows="5" v-if="editable" type="textarea" v-model="Action.PublicDescription" name=""></textarea>
        </div>
        <div class="">
          <label>Private Description</label>
          <div v-if="!editable">{{ Action.PrivateDescription }}</div>
          <textarea rows="5" v-if="editable" type="textarea" v-model="Action.PrivateDescription" name=""></textarea>
        </div>
      </div>
      <div class="col">
        <div class="">
          <label>Due Date</label>
          <div>{{ Action.DueDate }}</div>
        </div>
        <div class="">
          <label>Due Time</label>
          <div>{{ Action.DueTime }}</div>
        </div>
        <div class="">
          <label>Priority</label>
          <div v-if="!editable">{{ Action.ActionPriority }}</div>
          <div v-if="editable">
            <select v-model="Action.ActionPriority">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
        <div class="">
          <label>Volunteer Requirements</label>
          <div>
            <ul>
              <li v-for="requirement in Action.requirements" :key="requirement.name">
                {{ requirement.name }}
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
    Action: Object
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
