<template lang="html">
  <div class="">

  <!-- <navbar v-if="!this.$store.getters.onLoad"></navbar> -->
    <div class="container-fluid text-center" >
      <slider :images="slider_images"></slider>
    <button class="btn btn-sm title-button  d-block mx-auto  rounded-pill "  style="margin-top:-30px;">دسته بندی ها</button>
    <div class="container  mt-5 " style="max-width: 1430px;   ">
      <div class="row ">
        <div v-for="category in categories.slice(0, category_number)" class=" col-md-3   col-6  ">
          <a :href="'/product/list?category_id='+category.id">
          <div  class=" card  text-white category-card shadow center my-2">
            <img :src="category.logo" class="card-img w-100 h-100" alt="category">
            <div class="card-img-overlay ">
              <h4 class="card-title center-el p-0 m-0">{{category.name}}</h4>
            </div>
          </div>
          </a>
        </div>
        <div class="w-100 my-4">
          <button :to="{ name: '', params: {} }" class="link-text" @click="showAllCategories()" v-if="category_number ==8"> مشاهده لیست کامل</button>
        </div>
        <div class="col-12 my-4">
          <span class="g-line"></span>
          <button class="btn btn-sm  title-button  d-block mx-auto  rounded-pill " style="margin-top:-25px;"  >جدیدترین محصولات</button>
        </div>
      </div>
      <div class="row ">
      <div class="container text-center " style="max-width: 1300px;   ">
        <div class="row">
          <div v-for="product in new_products.slice(0,4)" class=" col-lg-3   col-sm-6  my-2">
            <product :item="product"></product>
          </div>
          <div class="w-100 my-4">
            <router-link :to="{ path: 'product/list', params: {} }" class="link-text  "> مشاهده تمام موارد</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-4">
      <div class="col-12 " v-if="top_booths[0]">
        <span class="g-line"></span>
        <button class="btn btn-sm  title-button  d-block mx-auto  rounded-pill " style="margin-top:-25px;"  >برترین غرفه ها</button>
      </div>
    </div>
    <div class="row " v-if="top_booths[0]">
    <div class="container  " style="max-width: 1300px;   ">
    <div class="row ">
      <div v-for="booth in top_booths.slice(0,4)" class="col-lg-3   col-sm-6  my-2">
        <booth :item="booth"></booth>
      </div>
      <div class="w-100 my-4" v-if="top_booths.lengh > 4">
        <router-link :to="{ path: 'booth/list', params: {} }" class="link-text  "> مشاهده تمام موارد</router-link>
      </div>
    </div>
  </div>
</div>
    <div class="row my-4" v-if="top_selling_products[0]">
        <div class="col-12 ">
          <span class="g-line"></span>
          <button class="btn btn-sm  title-button  d-block mx-auto  rounded-pill " style="margin-top:-25px;"  >پر فروش ترین ها</button>
        </div>
    </div>
    <div class="row ">
      <div class="container " style="max-width: 1300px;   ">
        <div class="row ">
          <div v-for="product in top_selling_products.slice(0,4)" class="w-100 col-lg-3   col-sm-6  my-2">
            <product :item="product"></product>
          </div>
          <div class="w-100 my-4" v-if="top_selling_products[0]">
            <router-link :to="{ path: 'product/list', params: {} }" class="link-text  "> مشاهده تمام موارد</router-link>
          </div>
        </div>
      </div>
      </div>
      <div class="row my-4" v-if="discounted_products[0]">
        <div class="col-12 ">
          <span class="g-line"></span>
          <button class="btn btn-sm  title-button  d-block mx-auto  rounded-pill " style="margin-top:-25px;"  >دارای تخفیف</button>
        </div>
      </div>
      <div class="row " v-if="discounted_products[0]">
        <div class="container  " style="max-width: 1300px; ">
        <div class="row ">
          <div v-for="product in discounted_products.slice(0,4)" class="col-lg-3   col-sm-6  my-2">
            <product :item="product"></product>
          </div>
          <div class="w-100 my-4">
            <router-link :to="{ path: 'booth/list', params: {} }" class="link-text  "> مشاهده تمام موارد</router-link>
          </div>
        </div>
      </div>
      </div>
      <!-- <div class="row my-5">
        <div class="col-12 ">
          <span class="g-line"></span>
          <button class="btn btn-sm  title-button  d-block mx-auto  rounded-pill " style="margin-top:-25px;"  >فروشنده های برتر</button>
        </div>
      </div>
      <div class="row ">
      <div class="container " style="max-width: 1300px;   ">
        <div class="row">
          <div v-for="seller in sellers.slice(0,4)" class=" col-lg-3   col-sm-6  my-2">
            <seller :item="seller"></seller>
          </div>
          <div class="w-100 my-4">
            <router-link :to="{ path: 'seller/list', params: {} }" class="link-text  "> مشاهده تمام موارد</router-link>
          </div>
        </div>
    </div>
  </div> -->
    <div class="row my-5">
      <div class="col-12 ">
        <span class="g-line"></span>
        <button class="btn btn-sm  title-button  d-block mx-auto  rounded-pill " style="margin-top:-25px;"  >همکاران ما</button>

      </div>
    </div>
    <div class="container text-center " style="max-width: 1300px; overflow:hidden;  ">
      <div class="row">
        <div v-for="i in 6" class="col-xl-2 col-md-4  col-6  my-2 ">
          <img class="co-img"  src="../images/ecopaya.png" alt="" >
        </div>
      </div>
    </div>

    </div>
  </div>

</div>
</template>

<script>
import Slider from './Slider'
import Product from './Product'
import Booth from './Booth'
import Seller from './Seller'

export default {
  data: () => ({
    categories: [],
    products: [],
    booths: [],
    sellers: [],
    new_products: [],
    slider_images: [],
    category_number: null,
    top_selling_products: [],
    top_booths: [],
    Top_sellers: [],
    discounted_products: []
  }),
  methods: {
    getCategories() {
      this.$store.dispatch('getCategories').
      then(response => {
        this.categories = response.data
        if (this.categories.length > 8) {
          this.category_number = 8
        } else {
          this.category_number = this.categories.length
        }
      })
    },
    showAllCategories() {
      this.category_number = this.categories.length
    },
    getTopSellingProducts() {
      this.$store.dispatch('getTopSellingProducts').
      then(response => {
        this.top_selling_products = response.data.data
      })
    },
    getDiscountedProducts() {
      this.$store.dispatch('getDiscountedProducts').
      then(response => {
        this.discounted_products = response.data.data
      })
    },
    getNewProducts() {
      this.$store.dispatch('getNewProductsRequest', {
        page: 1
      }).
      then(response => {
        this.new_products = response.data.data
        // this.products[0].discount = null
      })
    },
    getSliderImages() {
      this.$store.dispatch('getSliderImagesRequest').
      then(response => {
        this.slider_images = response.data.data
        this.$store.dispatch("afterLoad");
      })
    },
    getTopSellers() {
      this.$store.dispatch('getTopSellers').
      then(response => {
        this.sellers = response.data.data
      })
    },
    getTopBooths() {
      this.$store.dispatch('getTopBooths').
      then(response => {
        this.booths = response.data.data
      })
    },
    toCategoryProducts(category) {
      this.$router.push({
        name: 'ProductListPage',
        params: {
          category: category.id
        }
      })
    }
  },
  mounted() {
    this.getCategories()
    this.getTopSellingProducts()
    this.getDiscountedProducts()
    this.getNewProducts()
    this.getSliderImages()
  },
  components: {
    slider: Slider,
    product: Product,
    booth: Booth,
    seller: Seller,
  }
}
</script>

<style lang="css" scoped>
.link-text {
  color: #A1A1A1;
  font-size: 20px;
  text-decoration: none;
  border-bottom: 1.1px solid #b0b0b0;
  font-weight: normal;
}

.category-card div:hover{
  background-color: rgba(0, 0, 0, 0.5);

}
.category-card:hover{
  box-shadow:1px 1px 8px  #fd446d !important ;

}
.title-button{
  background-color: #2A2A2A;
  color:  white;
  width:260px;
  z-index: 1;
  position: relative;
  font-weight: bold;
  font-size: 25px
}
.container-fluid{
  background-color: #f2f2f2;

}
.category-card{
  width: 100%;
  height:10vw;
  overflow: hidden;
  border-radius: 20px;
  border:0px;
  background-color: #f2f2f2;
  cursor: pointer;
}

@media(max-width: 48em){
  .card-title{
    font-size: 0.6em !important;
  }
  .category-card{
    height: 17vw !important;
    transition: height 0.5s;
  }
  .title-button{
    width:150px;
    font-size: 15px;
    margin-top: -20px !important;
  }
  .co-img{
    width: 6em !important;
    height: 6em !important;
  }
}
@media (max-width:75em) {
 .category-card{
   height: 12vw;
   transition: height 0.5s;
 }
 .card-title{
   font-size: 1em;
 }
}
.card-img{
  filter: brightness(70%);
}
.category-card img{
  border-radius: 20px;
}
.g-line{
  display: block;
  width:100%;
  height:3.5px;
   background-image: linear-gradient(to right, #C4C4C4, rgb(245,245,245), #C3C3C3);
}
.co-img{
  width: 10em;
  height: 10em;
}
</style>
