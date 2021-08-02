<template>
  <th class="sortable" @click="sort(target,table)">
    <div class="d-flex align-items-center">
      <div>{{heading}}</div>
      <div class="d-flex flex-column sort-arrows ml-2" >
        <i class="fa fa-caret-up " v-bind:class="sortArrows(table,target,'asc')"></i>
        <i class="fa fa-caret-down" v-bind:class="sortArrows(table,target,'desc')"></i>
      </div>
    </div>
  </th>
</template>

<script>
export default {
  name: 'ListSortHeader',
  data() {
    return{

    }
  },
  methods: {
    sort(target, table) {
        if(target === this.sorting.[table].sortBy) {
            this.sorting.[table].sortDirection = this.sorting.[table].sortDirection === 'asc' ? 'desc' : 'asc';
        }
        this.sorting.[table].sortBy = target;
    },
    sortArrows(table, target, dir){
      return {
        inactive: this.sorting.[table].sortBy !== target || this.sorting.[table].sortDirection !== dir,
        'text-primary': this.sorting.[table].sortBy === target && this.sorting.[table].sortDirection === dir,
      }
    }
  },
  props: {
    table: String,
    target: String,
    heading: String,
    sorting: Object
  },
  components: {
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
