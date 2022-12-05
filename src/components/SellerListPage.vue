<template lang="html">
<div class="container-fluid py-5 px-4 outer-container">
  <div class="  py-5 px-4 outer-container">
    <div class="row">
      <div class="col-12">
        <div class="container text-center">
        <div class="row">
          <div v-for="seller in sellers" class=" col-xl-3 col-lg-4 col-sm-6  py-3">
            <seller :item="seller"></seller>
          </div>
        </div>
        </div>
        <!-- <pagination v-if="pages" :pages="pages" @changePage="changePage" style="direction:ltr !important" :key="key_page"></pagination> -->
        <pagination v-if="pages" :pages="pages" @changePage="changePage" style="direction:ltr !important"></pagination>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import VolatilePagination from './VolatilePagination'
import Seller from './Seller'
import SideFilterMenu from './SideFilterMenu'

export default {
  data: () => ({
    sellers: [],
    pages: 0,
    currentPage: 1,
  }),
  methods: {
    changePage(page) {
      this.currentPage = page;
      this.getSellersList()
    },
    getSellersList() {
      this.$store.dispatch('getSellers', {
        page: this.currentPage
      }).
      then(response => {
        this.sellers = response.data.data
        this.pages = Math.ceil(response.data.meta.total / 15);
        this.$store.dispatch("afterLoad");

      })
    }
  },
  components: {
    seller: Seller,
    sidemenu: SideFilterMenu,
    pagination: VolatilePagination
  },
  mounted() {
    this.getSellersList();
  }
}
</script>

<style lang="css" scoped>
 .outer-container{
   background-color: #f2f2f2;
 }
</style>
