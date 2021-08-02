<template>
  <div class="" id="ActionsList">

    <div class="row no-gutters align-items-stretch">
      <div class="col">
          <div class="row">
            <h3 class="col">Actions</h3>
            <div class="col-auto">
              <button class="btn btn-primary float-right disabled" type="button" @click="">Add Action</button>
            </div>
          </div>
          <div class="">
            <div class="row no-gutters flex-column-reverse flex-sm-row align-items-sm-start">
            <table class="table table-sm table-striped table-responsive-lg col-auto col-sm">
              <thead class="thead-light">
                <tr>
                  <th>id</th>
                  <list-sort-header :sorting="sorting" table="actionTable" target="help_type" heading="Help Type"></list-sort-header>
                  <th>Resident</th>
                  <list-sort-header :sorting="sorting" table="actionTable" target="requested_datetime" heading="Due"></list-sort-header>
                  <th>Assigned</th>
                  <list-sort-header :sorting="sorting" table="actionTable" target="action_status" heading="Status"></list-sort-header>
                  <list-sort-header :sorting="sorting" table="actionTable" target="action_priority" heading="Priority"></list-sort-header>
                </tr>
              </thead>
              <tbody>
                <tr v-for="action in filterTable('actionTable','sortedActions')">
                  <td>{{action.id}}</td>
                  <td><a class="text-info" :href="'/actions/coordinator/action/?id='+action.id">{{helpTypeName(action.help_type)}}</a></td>
                  <td>{{residentsName(action.resident, "full")}}</td>
                  <td>{{readableDate(action.requested_datetime)}}</td>
                  <td>{{action.assigned_volunteers.length}}/{{action.maximum_volunteers}}</td>
                  <td>{{actionStatus(action)}}</td>
                  <td>{{actionPriority(action.action_priority)}}</td>
                </tr>
              </tbody>
            </table>
            <div class="col-auto col-sm-2">
              <div class="card-header">
                <button class="btn btn-sm btn-link text-danger float-right" type="button" @click="clearFilters('actionTable')">Clear</button>
                <h4 class="card-title">Filter</h4>
              </div>
              <div class="card-body p-0">
                <div id="actionFilters">
                  <div class="card">
                    <div class="card-header" id="filterHeadingOne">
                      <h5 class="mb-0">
                        <button class="btn btn-block text-left p-0" data-toggle="collapse" data-target="#filterCollapseOne" aria-expanded="true" aria-controls="filterCollapseOne">
                         Help Type<small v-show="filters.actionTable.help_type.length>0"> ({{filters.actionTable.help_type.length}})</small></button>
                        </button>
                      </h5>
                    </div>

                    <div id="filterCollapseOne" class="collapse show" aria-labelledby="filterHeadingOne" data-parent="#actionFilters">
                      <div class="card-body">
                        <div class="form-check"v-for="type, key in help_types">
                          <input class="form-check-input" type="checkbox" :id="'helpFilter'+key" :value="key" v-model="filters.actionTable.help_type">
                          <label :for="'helpFilter'+key" type="" class="form-check-label">{{type.name}}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="filterHeadingTwo">
                      <h5 class="mb-0">
                        <button class="btn btn-block text-left p-0" data-toggle="collapse" data-target="#filterCollapseTwo" aria-expanded="false" aria-controls="filterCollapseTwo">
                         Status<small v-show="filters.actionTable.action_status.length>0"> ({{filters.actionTable.action_status.length}})</small></button>
                        </button>
                      </h5>
                    </div>

                    <div id="filterCollapseTwo" class="collapse" aria-labelledby="filterHeadingTwo" data-parent="#actionFilters">
                      <div class="card-body">
                        <div class="form-check"v-for="status, key in action_statuses">
                          <input class="form-check-input" type="checkbox" :id="'statusFilter'+key" :value="key" v-model="filters.actionTable.action_status">
                          <label :for="'statusFilter'+key" type="" class="form-check-label">{{status}}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="filterHeadingThree">
                      <h5 class="mb-0">
                        <button class="btn btn-block text-left collapsed p-0" data-toggle="collapse" data-target="#filterCollapseThree" aria-expanded="false" aria-controls="filterCollapseThree">
                          Priority<small v-show="filters.actionTable.action_priority.length>0"> ({{filters.actionTable.action_priority.length}})</small>
                        </button>
                      </h5>
                    </div>
                    <div id="filterCollapseThree" class="collapse" aria-labelledby="filterHeadingThree" data-parent="#actionFilters">
                      <div class="card-body">
                        <div class="form-check"v-for="priority, key in action_priorities">
                          <input class="form-check-input" type="checkbox" :id="'priorityFilter'+key" :value="key" v-model="filters.actionTable.action_priority">
                          <label :for="'priorityFilter'+key" type="" class="form-check-label">{{priority}}</label>
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="filterHeadingThree">
                        <h5 class="mb-0">
                          <button class="btn btn-block text-left collapsed p-0" data-toggle="collapse" data-target="#filterCollapseFour" aria-expanded="false" aria-controls="filterCollapseFour">
                            Assigned Volunteers<small v-show="filters.actionTable.assigned_volunteers.length>0"> ({{filters.actionTable.assigned_volunteers.length}})</small>
                          </button>
                        </h5>
                      </div>
                      <div id="filterCollapseFour" class="collapse" aria-labelledby="filterHeadingFour" data-parent="#actionFilters">
                        <div class="card-body">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="assignedFilterNone" value="0" v-model="filters.actionTable.assigned_volunteers">
                            <label for="assignedFilterNone" type="" class="form-check-label">None</label>
                          </div>
                          <!-- <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="assignedFilterNone" value="full" v-model="filters.actionTable.assigned_volunteers">
                            <label for="assignedFilterNone" type="" class="form-check-label">Full</label>
                          </div> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div class="card-footer">
            <div class="d-flex">
              <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item" v-for="num in pages">
                  <a class="page-link" href="#">{{num}}</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
              </ul>
            </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import ActionList from "./components/ActionList.vue"
import ListSortHeader from "./components/ListSortHeader.vue"
export default {
  name: 'Dashboard',
  data() {
    return{
      Actions:[],
      help_types:{},
      residents:{},
      sorting:{
        actionTable:{
          sortBy: 'requested_datetime',
          sortDirection: 'asc'
        }
      },
      filters:{
        actionTable:{
          help_type:[],
          action_status:[],
          action_priority:[],
          assigned_volunteers:[],
        }
      },
      display:{
        list:""
      }
    }
  },
  provide: {

  },
  methods: {
    startCall() {
      window.location.href = "./call/"
    },
    helpTypeName(id){
      return this.help_types[id].name
    },
    actionStatus(action){
      return this.action_statuses[action.action_status]
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
    },
    filterTable(table, source) {
      var filtered = this[source]
      var filters = this.filters
      var activeFilters = this.activeFilters
      if (!activeFilters[table]) {
        return filtered
      } else {
        
        for (var i = activeFilters[table].length - 1; i >= 0; i--) {
          if (activeFilters[table].[i] === "assigned_volunteers") {
            filtered = filtered.filter((item) => {
              return item.assigned_volunteers.length <= filters[table].assigned_volunteers[0]
            })
          } else {
            filtered = filtered.filter((item) => {
              return filters[table].[activeFilters[table].[i]].includes(item.[activeFilters[table].[i]].toString())
            })
          }
        }
        return filtered
      }
    },
    clearFilters(table) {
      var activeFilters = this.activeFilters
      var filters = this.filters
      for (var i = activeFilters[table].length - 1; i >= 0; i--) {
          filters[table].[activeFilters[table].[i]] = []
        }
    }
  },
  computed:{
    activeFilters(){
      var filters = {}
      const tables = this.filters
      for (const table in tables){
        filters[table] = false
        for (const filter in tables[table]) {
          if (tables[table].[filter].length>0) {
            if (!filters[table]) {filters[table] = []}
            filters[table].push(filter)
          }
        }
      }
        return filters
    },
    sortedActions: function(){
      /*return this.Actions.sort((p1,p2) => {
          let modifier = 1;
          if(this.sorting.actionTable.sortDirection === 'desc') modifier = -1;
          if(p1[this.sorting.actionTable.sortBy] < p2[this.sorting.actionTable.sortBy]) return -1 * modifier; if(p1[this.sorting.actionTable.sortBy] > p2[this.sorting.actionTable.sortBy]) return 1 * modifier;
          return 0;
      });*/
      return _.orderBy(this.Actions, [this.sorting.actionTable.sortBy], [this.sorting.actionTable.sortDirection])
    },
    pages(){
      var d = []
      for (var i = 0; i <= this.sortedActions.length/2 - 1; i++) {
         d.push(i+1)
       } 
       return d
    }
  },
  props: {
  },
  components: {
    ActionList,
    ListSortHeader
  },
  created(){
    this.getHelpTypes()
    this.getList('actions', this.setData, 'Actions')
    this.getResidents()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#actionFilters .card .card-body{
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
  #actionFilters .card::before {
    box-shadow: none;
  }
</style>
