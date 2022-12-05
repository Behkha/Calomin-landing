<template lang="html">
  <div class=" bg-light text-right outer-container">
      <nav id="sidebar" >
          <div class="  sidebar-header p-3">
              <h3 class="d-inline-block " style="color:#000; font-weight:710">دسته بندی ها</h3>
          </div>
          <div class="full-line">
          </div>
          <ul class="list-unstyled components side-menu-item  px-3 py-4">
              <li v-for="(category, k) in categories"  class="active filter-header" >
                <div class="justify-between">
                  <a :href="'/product/list?category_id='+category.id" class=" p-1 m-0 h5 side-menu-head d-block">{{category.name}}</a>
                </div>
                  <ul v-if="category.children"  class=" list-unstyled side-menu-sub" >
                      <li v-for="child in category.children.slice(0, category_checker[k].category_counter)" class=" px-4 pt-2">
                        <a :href="'/product/list?category_id='+child.id">{{child.name}}</a>
                      </li>
                      <button v-if="(category.children.length > 4)" class="category-show-more font-weight-bold px-4 align-middle" @click="showMoreCategory(category, k)" v-html="category_checker[k].category_status"></button>
                  </ul>
              </li>
          </ul>
      </nav>
  </div>
</template>
<script>
export default {
  data: () => ({
    categories: [],
    category_checker: []
  }),
  methods: {
    getCategories() {
      this.$store.dispatch('getCategories').
      then(response => {
        this.categories = response.data
        this.categories.forEach(item => {
          this.category_checker.push({
            category_counter: 4,
            category_status: '<b class="align-middle">+</b> نمایش بیشتر'
          })
        });

      })
    },
    getCategoryValues() {
      this.$store.dispatch('getCategoryValuesRequest', {
        category_id: this.$route.query.category_id
      }).
      then(response => {
        this.categories = response.data.children
        this.categories.forEach(item => {
          this.category_checker.push({
            category_counter: 4,
            category_status: '<b class="align-middle">+</b> نمایش بیشتر'
          })
        });
      })
    },
    showMoreCategory(category, k) {
      if (this.category_checker[k].category_counter < 5) {
        this.category_checker[k].category_counter = category.children.length
        this.category_checker[k].category_status = ' <b class="align-middle">-</b> نمایش کمتر'
      } else {
        this.category_checker[k].category_counter = 4
        this.category_checker[k].category_status = '<b class="align-middle">+</b> نمایش بیشتر'
      }
    },
    // setFilters(filter, selected_value) {
    //   let exist = 0;
    //   this.selected_filters.forEach((item, i) => {
    //     if ((item.value == selected_value.value) && (item.id == filter.key_id)) {
    //       this.selected_filters.splice(i, 1);
    //       exist = 1;
    //     }
    //   });
    //   if (!exist) {
    //     this.selected_filters.push({
    //       id: filter.key_id,
    //       value: selected_value.value
    //     })
    //   }
    //   this.$emit('change', this.selected_filters);
    // }
  },
  mounted() {
    if (this.$route.query.category_id) {
      this.getCategoryValues()
    } else {
      this.getCategories();
    }
  }
}
</script>
<style lang="scss">
@import '~pretty-checkbox/src/pretty-checkbox.scss';
</style>
<style lang="css" scoped>
.outer-container {
    width: 70%;
    border-radius: 4%;
    transition: width 1s;
}
@media (max-width: 90em) {
    .outer-container {
        width: 100%;
        transition: width 1s;
    }
}
.custom-control-input {
    color: black;
    border-radius: 0!important;
}
*::-ms-expand {
    display: none;
    font-size: 20px;
}
.dropdown-toggle::after {
    display: none;
    /* font-size: 20px; */

}
.side-menu-head {
    font-weight: bold;
    font-size: 20px;
    color: black;
    text-decoration: none;
}
.side-menu-sub a{
    font-size: 15px;
    color: #57585a;
    text-decoration: none;
}
.side-menu-item .filter-header::after {
    content: ' ';
    display: block;
    margin-top: 20px;
    margin-bottom: 20px;
    border-bottom: 2px solid #ccc;
    background-color: #ccc;
}
.side-menu-item :last-child::after {
    display: none;
}
.single-filter li::after {
    content: ' ';
    display: block;
    background-color: #ccc;
    border-radius: 100%;
    margin-top: 20px;
    height: 1.9px;
    width: 95%;
    background-image: linear-gradient(to right, rgb(245,245,245), #ccc, rgb(245,245,245));
}

.full-line::after {
    content: ' ';
    display: block;
    background-color: #ccc;
    height: 2px;
    width: 100%;
}
.category-show-more{
  border:0;
  background-color: inherit;
}
</style>
