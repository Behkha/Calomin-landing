<template lang="html">
  <div class="container-fliud my-5 " >
    <div class="row px-5 text-center">
      <div class="col col-2-5  drawer-container ">
        <drawer></drawer>
      </div>
      <div class="col col-9-5 outer-page-container" >
        <div class="page-container p-5 text-right">
          <div class="my-3">
            <h5 >محصولات</h5>
            <div class="row">
              <div class="col-xl-3 col-lg-4  col-6 py-3 px-4" v-for="product in bookmarked_products">
                <product   :item="product" size="sm"></product>
              </div>
            </div>
          </div>
          <!-- <div class="my-3">
            <h5 >غرفه ها</h5>
            <div class="row">
              <div class="col-xl-3 col-lg-4  col-6 py-3 px-4" v-for="booth in followed_booths">
                <booth   :item="booth" size="sm"></booth>
              </div>
            </div>
          </div> -->
        </div>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
import Product from './Product'
import Booth from './Booth'

import Drawer from './ProfileDrawer'

export default {
  data: () => ({
    bookmarked_products: [],
    followed_booths: []
  }),
  methods: {
    getBookmarkedProducts() {
      this.$store.dispatch('getBookmarkedProductsRequest').then(response => {
        this.bookmarked_products = response.data.data

        this.$store.dispatch("afterLoad");

      })
    },
    getFollowedBooths() {
      this.$store.dispatch('getFollowedBoothsRequest').then(response => {
        this.followed_booths = response.data.data
      })
    }
  },
  mounted() {
    this.getBookmarkedProducts();
    // this.getFollowedBooths();
  },
  components: {
    product: Product,
    booth: Booth,
    drawer: Drawer
  }
}
</script>

<style lang="css" scoped>
.outer-page-container{
  padding: 0 4em 0 4em;
}
@media (max-width: 48em) {
  .p-5{
    padding: 1em !important;
  }
  .outer-page-container{
    padding: 0 ;
  }
  .col-8-5{
      -ms-flex: 0 100% !important;
      -webkit-box-flex: 0;
      flex: 0 100% !important;
      max-width: 100% !important;

  }
  .col-2-5{
      -ms-flex: 0 100% !important;
      -webkit-box-flex: 0;
      flex: 0 100% !important;
      max-width: 100% !important;
      transition: max-width 1s;
      transition: flex 1s;

  }
  .drawer-container{
    padding: 0;
    margin: 2em 0 2em 0;
  }
  .table-header{
    font-size: 0.7em !important;
    color: #191919;
    transition: font-size 0.5s;
  }
  .table-sub{
    font-size: 0.6em !important;
    color: #7F7F7F;
    transition: font-size 1s;
  }
  .p-5{
    padding: 0.5em !important;
  }
  .px-4{
    padding: 1em !important;
  }
}
.button{
  font-size: 1em;
  position: absolute;
  bottom: 3%;
  left: 3%;
}
.profile-input {
  border: 0;
  border-radius: 0;
  text-indent: 10px;
  background-color: #f7f7f7 !important;
}
.input-lg{
  height: 3.8em;
}
.label-input{
  font-weight: bold;
  color: #787878;
  font-size: 1.1em;
}
.form-container{
  background-color: #f7f7f7;
}
.textarea{
  background-color: #f7f7f7;
  border: 0;
  resize: none;
}
.page-container{
  width: 100%;
  min-height: 40em;
  border-radius: 1.5em;
  background-color: white;
  border: 0.1em solid #dadada;
  position: relative;
}
.add-address-btn{
  /* font-size: 2em; */
  font-weight: bold;
  border: 0;
  background-color: inherit;
  color:#6D8D98;
  position: absolute;
  bottom: 2%;
  left: 2%;
}
.col-2-5{
    -ms-flex: 0 0 20%;
    -webkit-box-flex: 0;
    flex: 0 0 20%;
    max-width: 20%;
}
.col-8-5{
    -ms-flex: 0 80% !important;
    -webkit-box-flex: 0;
    flex: 0 80% !important;
    max-width: 80% !important;
}
.table-container{
  height: 30em !important;
  overflow-y: auto;
}
.table-header{
  font-size: 1em;
  color: #191919;
}
.table-sub{

  font-size: 0.9em ;
  color: #7F7F7F;
}
</style>
