<template>
  <div class="col" id="dashboardVue">
    <div class="row no-gutters mx-xl-n2 align-items-stretch">
      <div class="px-1 px-xl-2 col-xl-6 col-8">
        <div class="card">
            <div class="card-header">
              <h3 class="card-title">Actions</h3>
            </div>
            <div class="card-body p-0">
              <div class="row no-gutters flex-column-reverse flex-sm-row align-items-sm-start">
              <div class="table-responsive">
                <table class="table table-striped">
                <thead class="thead-light">
                  <tr>
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
                    <td><a class="text-info" :href="'/actions/coordinator/action/?id='+action.id">{{helpTypeName(action.help_type)}}</a></td>
                    <td><a class="text-info" :href="'/admin/users/resident/'+action.resident+'/change/'">{{residentsName(action.resident, "full")}}</a></td>
                    <td>{{readableDate(action.requested_datetime)}}</td>
                    <td>{{action.assigned_volunteers.length}}/{{action.maximum_volunteers}}</td>
                    <td>{{actionStatus(action)}}</td>
                    <td>{{actionPriority(action.action_priority)}}</td>
                  </tr>
                </tbody>
                </table>
              </div>
            </div>
            </div>
            <div class="card-footer">
              <div class="d-flex">
                <!-- <a v-for="num in pages">
                 {{num}}
                </a> -->
              </div>
          </div>
        </div>
      </div>
      <div class="px-1 d-xl-none col-4">
        <div class="card">
          <div class="card-header">
            <button class="btn btn-sm btn-link text-danger float-right" type="button" @click="clearFilters('actionTable')">Clear</button>
            <h4 class="card-title">Action Filters</h4>
          </div>
          <div class="card-body p-0">
            <div id="actionFiltersSm">
              <div class="card">
                <div class="card-header" id="filterHeadingOne">
                  <h5 class="mb-0">
                    <button class="btn btn-block text-left p-0" data-toggle="collapse" data-target="#filterCollapseOne" aria-expanded="true" aria-controls="filterCollapseOne">
                     Help Type<small v-show="filters.actionTable.help_type.length>0"> ({{filters.actionTable.help_type.length}})</small></button>
                    </button>
                  </h5>
                </div>

                <div id="filterCollapseOne" class="collapse show" aria-labelledby="filterHeadingOne" data-parent="#actionFiltersSm">
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

                <div id="filterCollapseTwo" class="collapse" aria-labelledby="filterHeadingTwo" data-parent="#actionFiltersSm">
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
                <div id="filterCollapseThree" class="collapse" aria-labelledby="filterHeadingThree" data-parent="#actionFiltersSm">
                  <div class="card-body">
                    <div class="form-check"v-for="priority, key in action_priorities">
                      <input class="form-check-input" type="checkbox" :id="'priorityFilter'+key" :value="key" v-model="filters.actionTable.action_priority">
                      <label :for="'priorityFilter'+key" type="" class="form-check-label">{{priority}}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="px-1 px-xl-2 col-xl-4 col-8">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Referrals</h3>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-striped">
                <thead class="thead-light">
                  <tr>
                    <list-sort-header :sorting="sorting" table="referralTable" target="referral_type" heading="Referral Type"></list-sort-header>
                    <th>Resident</th>
                    <list-sort-header :sorting="sorting" table="referralTable" target="created_datetime" heading="Created"></list-sort-header>
                    <list-sort-header :sorting="sorting" table="referralTable" target="referral_status" heading="Status"></list-sort-header>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="ref, key in filterTable('referralTable', 'referrals')" :key="key">
                    <td><a class="text-info" :href="'/admin/actions/referral/'+ref.id+'/change/'">{{referralTypeName(ref)}}</a></td>
                    <td><a class="text-info" :href="'/admin/users/resident/'+ref.resident+'/change/'">{{residentsName(ref.resident, "full")}}</a></td>
                    <td>{{readableDate(ref.created_datetime)}}</td>
                    <td>{{referral_statuses[ref.referral_status]}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="px-1 px-xl-2 col-4 col-xl-2">
        <div class="card d-none d-xl-block mb-2">
          <div class="card-header">
            <button class="btn btn-sm btn-link text-danger float-right" type="button" @click="clearFilters('actionTable')">Clear</button>
            <h4 class="card-title">Action Filters</h4>
          </div>
          <div class="card-body p-0">
            <div id="actionFilters">
              <div class="card">
                <div class="card-header" id="filterHeadingOne">
                  <h5 class="mb-0">
                    <button class="btn btn-block text-left p-0" data-toggle="collapse" data-target="#actionFilterCollapseOne" aria-expanded="true" aria-controls="actionFilterCollapseOne">
                     Help Type<small v-show="filters.actionTable.help_type.length>0"> ({{filters.actionTable.help_type.length}})</small></button>
                    </button>
                  </h5>
                </div>

                <div id="actionFilterCollapseOne" class="collapse show" aria-labelledby="filterHeadingOne" data-parent="#actionFilters">
                  <div class="card-body">
                    <div class="form-check"v-for="type, key in help_types">
                      <input class="form-check-input" type="checkbox" :id="'actionTypeFilter'+key" :value="key" v-model="filters.actionTable.help_type">
                      <label :for="'actionTypeFilter'+key" type="" class="form-check-label">{{type.name}}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-header" id="filterHeadingTwo">
                  <h5 class="mb-0">
                    <button class="btn btn-block text-left p-0" data-toggle="collapse" data-target="#actionFilterCollapseTwo" aria-expanded="false" aria-controls="actionFilterCollapseTwo">
                     Status<small v-show="filters.actionTable.action_status.length>0"> ({{filters.actionTable.action_status.length}})</small></button>
                    </button>
                  </h5>
                </div>

                <div id="actionFilterCollapseTwo" class="collapse" aria-labelledby="filterHeadingTwo" data-parent="#actionFilters">
                  <div class="card-body">
                    <div class="form-check"v-for="status, key in action_statuses">
                      <input class="form-check-input" type="checkbox" :id="'actionStatusFilter'+key" :value="key" v-model="filters.actionTable.action_status">
                      <label :for="'actionStatusFilter'+key" type="" class="form-check-label">{{status}}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-header" id="filterHeadingThree">
                  <h5 class="mb-0">
                    <button class="btn btn-block text-left collapsed p-0" data-toggle="collapse" data-target="#actionFilterCollapseThree" aria-expanded="false" aria-controls="actionFilterCollapseThree">
                      Priority<small v-show="filters.actionTable.action_priority.length>0"> ({{filters.actionTable.action_priority.length}})</small>
                    </button>
                  </h5>
                </div>
                <div id="actionFilterCollapseThree" class="collapse" aria-labelledby="filterHeadingThree" data-parent="#actionFilters">
                  <div class="card-body">
                    <div class="form-check"v-for="priority, key in action_priorities">
                      <input class="form-check-input" type="checkbox" :id="'priorityFilter'+key" :value="key" v-model="filters.actionTable.action_priority">
                      <label :for="'priorityFilter'+key" type="" class="form-check-label">{{priority}}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <button class="btn btn-sm btn-link text-danger float-right" type="button" @click="clearFilters('referralTable')">Clear</button>
            <h4 class="card-title">Referral Filters</h4>
          </div>
          <div class="card-body p-0">
            <div id="referralFilters">
              <div class="card">
                <div class="card-header" id="filterHeadingOne">
                  <h5 class="mb-0">
                    <button class="btn btn-block text-left p-0" data-toggle="collapse" data-target="#referralFilterCollapseOne" aria-expanded="true" aria-controls="referralFilterCollapseOne">
                     Referral Type<small v-show="filters.referralTable.referral_type.length>0"> ({{filters.referralTable.referral_type.length}})</small></button>
                    </button>
                  </h5>
                </div>

                <div id="referralFilterCollapseOne" class="collapse show" aria-labelledby="filterHeadingOne" data-parent="#referralFilters">
                  <div class="card-body">
                    <div class="form-check"v-for="type, key in referral_types">
                      <input class="form-check-input" type="checkbox" :id="'referralFilter'+key" :value="key" v-model="filters.referralTable.referral_type">
                      <label :for="'referralFilter'+key" type="" class="form-check-label">{{type.name}}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-header" id="filterHeadingTwo">
                  <h5 class="mb-0">
                    <button class="btn btn-block text-left p-0" data-toggle="collapse" data-target="#referralFilterCollapseTwo" aria-expanded="false" aria-controls="referralFilterCollapseTwo">
                     Status<small v-show="filters.referralTable.referral_status.length>0"> ({{filters.referralTable.referral_status.length}})</small></button>
                    </button>
                  </h5>
                </div>

                <div id="referralFilterCollapseTwo" class="collapse" aria-labelledby="filterHeadingTwo" data-parent="#referralFilters">
                  <div class="card-body">
                    <div class="form-check"v-for="status, key in referral_statuses">
                      <input class="form-check-input" type="checkbox" :id="'referralStatusFilter'+key" :value="key" v-model="filters.referralTable.referral_status">
                      <label :for="'referralStatusFilter'+key" type="" class="form-check-label">{{status}}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card d-none">
                <div class="card-header" id="filterHeadingThree">
                  <h5 class="mb-0">
                    <button class="btn btn-block text-left collapsed p-0" data-toggle="collapse" data-target="#referralFilterCollapseThree" aria-expanded="false" aria-controls="referralFilterCollapseThree">
                      Priority<small v-show="filters.actionTable.action_priority.length>0"> ({{filters.actionTable.action_priority.length}})</small>
                    </button>
                  </h5>
                </div>
                <div id="referralFilterCollapseThree" class="collapse" aria-labelledby="filterHeadingThree" data-parent="#referralFilters">
                  <div class="card-body">
                    <div class="form-check"v-for="priority, key in action_priorities">
                      <input class="form-check-input" type="checkbox" :id="'priorityFilter'+key" :value="key" v-model="filters.actionTable.action_priority">
                      <label :for="'priorityFilter'+key" type="" class="form-check-label">{{priority}}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
      referrals:{},
      referral_types:{},
      sorting:{
        actionTable:{
          sortBy: 'requested_datetime',
          sortDirection: 'asc'
        },
        referralTable:{
          sortBy: 'created_datetime',
          sortDirection: 'asc'
        }
      },
      filters:{
        actionTable:{
          help_type:[],
          action_status:["1","2","3","6"],
          action_priority:[],
        },
        referralTable:{
          referral_type:[],
          referral_status:["1","2"]
        }
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
    referralTypeName(ref){
      return this.referral_types[ref.referral_type].name
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
          filtered = filtered.filter((item) => {
            return filters[table].[activeFilters[table].[i]].includes(item.[activeFilters[table].[i]].toString())
          })
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
    this.getList('referrals', this.setData, 'referrals')
    this.getReferralTypes()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#actionFilters .card .card-body{
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
  #actionFilters .card::before, #referralFilters .card::before, #actionFiltersSm .card::before{
    box-shadow: none;
  }
</style>
