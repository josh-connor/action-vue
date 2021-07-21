<template>
  <div class="" id="dashboardVue">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header">
            <div class="card-title">Actions</div>
          </div>
          <div class="card-body"></div>
          <action-list :ActionsToRender="ActionsToRender"></action-list>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header">
            <div class="card-title">Referrals</div>
          </div>
          <div class="card-body"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ActionList from "./components/ActionList.vue"
export default {
  name: 'Dashboard',
  data() {
    return{
      Actions:[]
    }
  },
  methods: {
  },
  computed:{
    ActionsToRender(){
      return this.Actions
    }
  },
  props: {
  },
  components: {
    ActionList
  },
  created(){
    this.getList('actions', this.setData, 'Actions')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
