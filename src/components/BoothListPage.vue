<template lang="html">
  <div class="  py-5 px-4 outer-container">
    <div class="row">
      <!-- <div class=" col-lg-4  col-sm-12 "> -->
        <!-- <sidemenu class="mx-auto  d-block"></sidemenu> -->
      <!-- </div> -->
      <div class="col-12">
        <div class="container text-center">
        <div class="row">
          <div v-for="booth in booths" class=" col-xl-3 col-lg-4 col-sm-6  py-3">
            <booth :item="booth"></booth>
          </div>
        </div>
        </div>
        <pagination v-if="pages" :pages="pages" @changePage="changePage" style="direction:ltr !important"></pagination>





        <!-- <pagination v-if="pages" :pages="pages" @changePage="changePage" style="direction:ltr !important" :key="key_page"></pagination> -->
      </div>
    <!-- </div> -->
    </div>
  </div>
</template>

<script>
import Booth from './Booth'
import SideFilterMenu from './SideFilterMenu'
import VolatilePagination from './VolatilePagination'

export default {
  data: () => ({
    booths: [],
    pages: 0,
    currentPage: 1,

  }),
  methods: {
    changePage(page) {
      this.currentPage = page;
      this.getBoothsList()
    },
    getBoothsList() {
      this.$store.dispatch('getBooths', {
        page: this.currentPage
      }).
      then(response => {
        this.pages = Math.ceil(response.data.meta.total / 15);
        this.booths = response.data.data
        this.$store.dispatch("afterLoad");

      })
    }
  },
  components: {
    booth: Booth,
    sidemenu: SideFilterMenu,
    pagination: VolatilePagination
  },
  mounted() {
    this.getBoothsList();

  }
}
</script>

<style lang="css" scoped>
 .outer-container{
   background-color: #f2f2f2;
 }
</style>
