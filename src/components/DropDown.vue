<template lang="html">
  <div class="dropdown  px-2 py-2">
    <button v-if="!selected" class="btn border-0 sign-forms text-right w-100  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{placeholder}}<i class="fas fa-chevron-down float-left h4">  </i>
    </button>
    <button v-if="selected" class="btn border-0 sign-forms text-right w-100  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{selected.name}} {{selected.title}}<i class="fas fa-chevron-down float-left h4 align-middle">  </i>
    </button>
    <div class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton" style="width:100%">
      <a v-for="item in items" @click="change(item)" class="dropdown-item" href="#">{{item.name}} {{item.title}}</a>
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
    },
    placeholder: {}
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
.dropdown button::after{
	content: none !important;
}
.dropdown div{
    height: auto;
    max-height: 200px;
    overflow-x: hidden;
}
.sign-forms::placeholder{
  font-size: 1.2em;
  color: red;
  overflow-x: hidden;
}
@media (max-width: 48em) {
  .dropdown{
    height: 2.5em !important ;
  }
}
</style>
