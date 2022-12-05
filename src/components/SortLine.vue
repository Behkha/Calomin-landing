<template lang="html">
  <ul class="nav">
    <li class="nav-item " >
      <span class="nav-link d-inline-block mx-0 px-0 sort-item" href="#">مرتب سازی بر اساس:</span>
    </li>
  <li class="nav-item pl-2" v-for="(item, k) in items" :key="k">
    <a class="nav-link d-inline-block ml-0 pl-0 sort-item font-weight-bold"  @click="setSort(item, k)" v-bind:class="{active: (k == selected)}" href="#">{{item.fa}}</a>
    <i class="fas fa-long-arrow-alt-up mr-0 pr-0 active" v-show="k == selected"></i>
  </li>
</ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array
    }
  },
  data: () => ({
    selected: null,
    last_selected: null
  }),
  methods: {
    setSort(item, k) {
      if (k == this.last_selected) {
        this.selected = null;
        this.last_selected = null
        this.$emit("change", null);
      } else {
        this.selected = k;
        this.last_selected = k
        this.$emit("change", item);
      }
    },
    mounted() {}
  }
}
</script>

<style lang="css" scoped>
.active{
  color: #fd446d !important;
}

.sort-item{
  color:#353535;
  font-size: 0.9em;
}
@media (max-width: 48em) {
  .sort-item{
    font-size: 0.5em;
  }
}
</style>
