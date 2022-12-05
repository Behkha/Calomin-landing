<template lang="html">
  <div class="dropdown  ">
    <button v-if="!selected" class="btn rounded-pill sign-forms text-right w-100  dropdown-toggle py-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{placeholder}}<i class="fas fa-chevron-down float-left icon mt-1">  </i>
    </button>
    <button v-if="selected" class="btn border-0 sign-forms text-right w-100  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{selected.name}}<i class="fas fa-chevron-down float-left  icon mt-1">  </i>
    </button>
    <div class="dropdown-menu " aria-labelledby="dropdownMenuButton" style="width:100%; border-radius:1em;">
      <a v-for="item in items" @click="change(item)" class="dropdown-item" href="#">{{item.name}}</a>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    items: {
      type: Array
    },
    selected: {
      type: Object
    }
  },
  methods: {
    change(selected) {

      // this.selected = item;
      this.$emit('changeSeleted', selected);
    }
  }
}
</script>

<style lang="css" scoped>
.icon{
  color:#BFBFBF;
  /* font-size: 1em; */
  vertical-align: middle;
}
.dropdown button::after{
	content: none !important;
}
.dropdown div{
    height: auto;
    max-height: 200px;
    overflow-x: hidden;
}
.sign-forms{
  border: 2px solid #8F8F8F;
}
.sign-forms::placeholder{
  font-size: 1.2em;
}
@media (max-width:48em) {
  .sign-forms{
    font-size: 0.5em;
    padding: 1.5em 1em !important;
  }
  .icon{
    padding-left: 1em;
    font-size: 0.5em;
  }

}
</style>
