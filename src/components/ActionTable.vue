<template>
  <table class="table table-striped table-responsive-lg">
    <thead class="thead-light">
      <tr>
        <th>id</th>
        <list-sort-header :sorting="sorting" table="actionTable" target="help_type" heading="Action Type"></list-sort-header>
        <th>Resident</th>
        <list-sort-header :sorting="sorting" table="actionTable" target="requested_datetime" heading="Due"></list-sort-header>
        <th>Assigned volunteers</th>
        <list-sort-header :sorting="sorting" table="actionTable" target="action_priority" heading="Priority"></list-sort-header>
      </tr>
    </thead>
    <tbody>
      <tr v-for="action in sortedActions">
        <td>{{action.id}}</td>
        <td><a class="text-info" :href="'/actions/coordinator/action/?id='+action.id">{{helpTypeName(action.help_type)}}</a></td>
        <td>{{residentsName(action.resident, "full")}}</td>
        <td>{{readableDate(action.requested_datetime)}}</td>
        <td>{{action.assigned_volunteers.length}}</td>
        <td>{{actionPriority(action.action_priority)}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import ListSortHeader from "./ListSortHeader.vue"

export default {
  name: 'ActionTable',
  data() {
    return{

    }
  },
  computed:{
    sortedActions: function(){
      return this.Actions.sort((p1,p2) => {
          let modifier = 1;
          if(this.sorting.actionTable.sortDirection === 'desc') modifier = -1;
          if(p1[this.sorting.actionTable.sortBy] < p2[this.sorting.actionTable.sortBy]) return -1 * modifier; if(p1[this.sorting.actionTable.sortBy] > p2[this.sorting.actionTable.sortBy]) return 1 * modifier;
          return 0;
      });
    },

  },
  methods: {
    readableDate: function (datetime) {
      var d = new Date(datetime)
      return d.toDateString()
    },
    helpTypeName(id){
      return this.help_types[id].name
    },
    residentsName(id, length){
      if (length === "full"){
        return this.residents[id].first_name + " " + this.residents[id].last_name
      } else if (length === "last") {
        return this.residents[id].last_name
      } else {
        return this.residents[id].first_name
      }
    },
    actionPriority(p){
      return this.action_priorities[p]
    }
  },
  props: {
    actions: Array,
    sorting: Object,
  },
  components: {
    ListSortHeader
  }
}
</script>

<style scoped>
.sortable{
    cursor: pointer;
  }
  .sort-arrows{
    font-size: 0.8rem;
  }
  .inactive{
   color: lightgrey;
  }
</style>
