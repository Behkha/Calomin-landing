<template lang="html">
<div class="outer-container px-3 pb-3">
  <img class="w-100 head-img  " :src="seller.gallery[0]"  alt="">
  <div class="container-fluid ">
    <div class="row">

    <div class="col-3 text-muted-normal text-right ">
      <h5 class="font-weight-normal">ستاره (25 تجربه نوشته شده)</h5>
        <span v-if="seller.satate" class="">{{seller.state.name}}, {{seller.city}}</span>
    </div>
    <div class="col-6 text-center">
      <img class="seller-img " :src="seller.profile_picture"></img>
      <h1 class="pureblack font-weight-bold">{{seller.name}}</h1>
      <div class="text-center">
      <!-- <span class="font-weight-normal text-muted-normal h5">اشتراک گذاری از طریق</span> -->
    </div>
    <p class="seller-des">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است </p>
    </div>
    <div class="col-3">
      <h5 class="font-weight-normal">شروع فعالیت : {{seller.created_at}}</h5>
    </div>
    <div class="col-12 my-4 " v-if="seller_booths[0]">
      <span class="g-line"></span>
      <button class="btn btn-sm  title-button  d-block mx-auto  rounded-pill " style="margin-top:-25px;"  >غرفه ها</button>
    </div>
    <div class="container-fluid center " style="max-width: 1300px;   ">

      <div class="row justify-between" v-if="seller_booths[0]">
        <div v-for="booth in seller_booths" class="col-lg-3   col-sm-6  my-2">
          <booth :item="booth"></booth>
        </div>
        <div class="w-100 my-4">
        <router-link v-if="seller_booths.length > 4" :to="{ name: '', params: {} }" class="link-text  mx-auto my-4 d-inline-block "> مشاهده تمام موارد</router-link>
      </div>
      </div>
    </div>
    <div class="col-12 my-4" v-if="seller_products[0]">
      <span class="g-line"></span>
      <button class="btn btn-sm  title-button  d-inline-block mx-auto  rounded-pill " style="margin-top:-30px;"  >محصولات</button>
    </div>
    <div class="container-fluid center " style="max-width: 1300px;   " v-if="seller_products[0]">

      <div class="row justify-between">
        <div v-for=" product in seller_products" class=" col-lg-3   col-sm-6  my-2 ">
          <product :item="product"></product>
        </div>
        <div class="w-100 my-4">
        <router-link v-if="seller_products.length > 4"  :to="{ name: '', params: {} }" class="link-text  mx-auto my-4 d-inline-block "> مشاهده تمام موارد</router-link>
      </div>
      </div>
    </div>
    <div class="col-12 my-4">
      <span class="g-line"></span>
      <button class="btn btn-sm  title-button  d-block mx-auto  rounded-pill " style="margin-top:-25px;"  >درباره غرفه</button>
    </div>
      <div class="container-fluid center " style="max-width: 1300px;   ">
        <expanding :item="seller.story"></expanding>

      </div>
    <div class="col-12 my-4">
      <span class="g-line"></span>
      <button class="btn btn-sm  title-button  d-block mx-auto  rounded-pill " style="margin-top:-25px;"  >نظرات</button>
    </div>
    <div class="col-12">
    <comments :item="seller" :type="'sellers'"></comments>
  </div>
  </div>
</div>

</div>
</template>

<script>
import Product from './Product'
import Booth from './Booth'
import Expanding from './ExpandDescription'
import Comments from './Comments'

export default {

  data: () => ({
    seller: null,
    seller_booths: [],
    seller_products: [],
    comments: []

  }),
  components: {
    product: Product,
    booth: Booth,
    expanding: Expanding,
    comments: Comments
  },
  methods: {
    getSellerValues() {
      this.$store.dispatch('getSellerValues', {
        id: this.$route.params.id
      }).
      then(response => {
        this.seller = response.data.data
      })
    },
    getSellerBooths() {
      this.$store.dispatch('getSellerBooths', {
        id: this.$route.params.id
      }).
      then(response => {
        this.seller_booths = response.data.data
      })
    },
    getSellerProducts() {
      this.$store.dispatch('getSellerProducts', {
        id: this.$route.params.id
      }).
      then(response => {
        this.seller_products = response.data.data
        this.$store.dispatch("afterLoad");

      })
    },
  },
  mounted() {
    this.getSellerValues()
    this.getSellerBooths()
    this.getSellerProducts()

  },
  chainWebpack: (config) => {
    config
      .plugin('template')
      .tap(args => {
        args[0].title = 'MyApp title';
        args[0].meta = {
          viewport: 'width=device-width,initial-scale=1,user-scalable=no'
        };

        return args;
      })
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
.head-img{
  border-radius: 10px 10px 100% 100%;
  filter: brightness(70%);
  height:28em;
}
.seller-des{
  font-size:1.15em;
  color: #5c5c5c;
}
.seller-img{
  position: relative;
  z-index: 1;
  margin-top:-17em;
  width: 20em;
  height: 20em;
  border: .5em solid #f2f2f2;
  border-radius: 100%;
}
.outer-container{
  background-color: #f2f2f2;
}
@media (max-width:48em) {
  .head-img{
    border-radius: 10px !important;
    height:15em;
  }
  .seller-img{
    margin-top: -6em;
    margin-left: auto;
    width: 8em;
    height: 8em;
  }
  .seller-des{
    font-size:0.5em;
    line-height: 1.5em !important;

  }
  h5{
    font-size: 0.3em !important;
    margin-top: 5em;
  }
  h1{
    font-size: 1em;
  }
  .h5{
    font-size: 0.5em;
  }
  .my-4{
    margin: 0.5em 0 !important;
  }
}
</style>
