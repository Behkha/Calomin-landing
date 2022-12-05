<template lang="html">
  <div class=" bg-light text-right outer-container">
      <!-- Sidebar -->
      <nav id="sidebar" >
          <div class="  sidebar-header p-3">
              <h3 class="d-inline-block " style="color:#000; font-weight:710">فیلترها</h3>
              <span class=" align-top float-left fas fa-sliders-h" style="font-size:30px;"></span>
          </div>
          <div class="full-line">
          </div>
          <!-- <ul class="list-unstyled px-3 single-filter ">
            <li v-for="n in 4" class="py-3 px-2 ">
              <input type="checkbox" name="" value="" class="align-middle ">
              <span class="">عنوان شماره 1 (35)</span>
            </li>
          </ul> -->
          <ul class="list-unstyled components side-menu-item  px-3 py-4">
              <li v-for="(filter, k) in filters"  class="active filter-header" >
                <div class="justify-between">
                  <a :href="'#filter'+k" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle p-1 m-0 h5 side-menu-head d-block">{{filter.key_name}} <i class="float-left fas fa-chevron-down "></i></a>
                </div>
                  <ul v-if="filter.values"  class="collapse list-unstyled side-menu-sub" :id="'filter'+k">
                      <li v-for="(value, i) in filter.values" class=" px-2 pt-2">
                        <div class="pretty p-svg p-curve " >
                          <input type="checkbox" :id="'checkbox'+'f'+k+'v'+i" @click="setFilters(filter, value)"/>
                          <div class="state p-primary">
                            <label></label>
                              <!-- svg path -->
                              <svg  class="svg svg-icon" viewBox="0 0 20 20">
                                  <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style="stroke: white;fill:white;"></path>
                              </svg>
                          </div>
                      </div>
                      <label :for="'checkbox'+'f'+k+'v'+i" style="">{{value.value}}</label>
                      </li>
                  </ul>
              </li>
              <!-- <li  class="active filter-header">
                <div class="justify-between">
                  <a href="#homeSubmenu2" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle pb-5 h5 side-menu-head">فیلتر شماره 1</a>
                  <i class="float-left fas fa-chevron-down "></i>
                </div>
                  <ul  class="collapse list-unstyled side-menu-sub" id="homeSubmenu2">
                      <li v-for="n in 4" class="pt-3 px-2">
                          <input type="checkbox" name="" value="" class="align-middle">
                          <span class="">عنوان شماره 2 (35)</span>
                      </li>
                  </ul>
              </li> -->
          </ul>
      </nav>
  </div>
</template>
<script>
export default {
  data: () => ({
    filters: [],
    selected_filters: []
  }),
  methods: {
    getProductFilters() {
      this.$store.dispatch('getProductsFiltersRequest', {
        category_id: this.$route.query.category_id
      }).
      then(response => {
        if (this.$route.query.category_id) {
          this.filters = response.data
        } else {
          this.filters = response.data.data
        }
      })
    },
    setFilters(filter, selected_value) {
      let exist = 0;
      this.selected_filters.forEach((item, i) => {
        if ((item.value == selected_value.value) && (item.id == filter.key_id)) {
          this.selected_filters.splice(i, 1);
          exist = 1;
        }
      });
      if (!exist) {
        this.selected_filters.push({
          id: filter.key_id,
          value: selected_value.value
        })
      }
      this.$emit('change', this.selected_filters);
    }
  },
  mounted() {
    this.getProductFilters();
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
.side-menu-sub {
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
</style>
