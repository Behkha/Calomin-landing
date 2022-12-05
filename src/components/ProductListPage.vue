<template lang="html">
<div class="  py-5 px-4 outer-container">
  <div class="row">
    <div class=" col-lg-4  col-sm-12 ">
      <sidefiltermenu class="mx-auto  d-block" @change="getProductsByFilter"></sidefiltermenu>
      <sidecategorymenu class="mx-auto  d-block" @change="getProductsByFilter"></sidecategorymenu>
    </div>
    <!-- <div class=" col-lg-4  col-sm-12 "> -->
    <!-- </div> -->
    <div class="col-lg-8 col-md-12">
      <div class="container text-center">
      <div class="row">
        <div class="col-12">
          <sortable class="float-left mb-3" :items="sorts" @change="changeSort"></sortable>
        </div>
        <div v-for="product in products" class=" col-lg-4   col-sm-6  my-2">
          <product :item="product"></product>
        </div>
      </div>
      </div>
      <pagination v-if="pages" :pages="pages" @changePage="changePage" style="direction:ltr !important" :key="key_page"></pagination>
    </div>
  </div>
</div>
</template>

<script>
import Product from './Product'
import SideFilterMenu from './SideFilterMenu'
import SideCategoryMenu from './SideCategoryMenu'
import SortLine from './SortLine'
import VolatilePagination from './VolatilePagination'
export default {
  data: () => ({
    products: [],
    sort: null,
    pages: 0,
    last_sort: null,
    currentPage: 1,
    selected_filters: [],
    // reset: false,
    key_page: 1,
    sorts: [{
        name: 'sort_by_views',
        fa: 'پربازدیدترین'
      },
      {
        name: 'sort_by_bookmarks',
        fa: 'محبوب ترین'
      },
      {
        name: 'sort_by_highest_price',
        fa: 'بیشترین قیمت'
      },
      {
        name: 'sort_by_lowest_price',
        fa: 'کمترین قیمت'
      },
      {
        name: 'sort_by_sales',
        fa: 'پرفروش ترین'
      },
    ]
  }),
  methods: {
    changeSort(item) {
      this.sort = item;
      this.getProductsList()
    },
    getProductsList() {
      let data = {
        sort: null,
        category_id: null
      }
      if (this.sort) {
        data.sort = this.sort.name;
      }
      if (this.sort != this.last_sort) {
        data.page = 1
        this.currentPage = 1;
        this.key_page += 1;
        this.last_sort = this.sort
      }
      data.category_id = this.$route.query.category_id
      data.page = this.currentPage
      if (this.selected_filters)
        data.filters = this.selected_filters
      this.$store.dispatch('getProductsList', data).
      then(response => {
        this.products = response.data.data
        this.pages = Math.ceil(response.data.meta.total / 15);
        this.$store.dispatch("afterLoad");

      })
    },
    getProductsByFilter(filters) {
      console.log(filters);
      this.selected_filters = filters;
      this.getProductsList(filters)
    },
    changePage(page) {
      this.currentPage = page;
      this.getProductsList()
    }
  },
  components: {
    product: Product,
    sidefiltermenu: SideFilterMenu,
    sidecategorymenu: SideCategoryMenu,
    sortable: SortLine,
    pagination: VolatilePagination
  },
  mounted() {
    this.getProductsList();
  }
}
</script>

<style lang="css" scoped>
 .outer-container{
   z-index: 1;
   background-color: #f2f2f2;
 }
 html {
   z-index: 1;
 }
</style>
