<template lang="html">
<div class="outer-container px-3 pb-3">
  <div class="position-relative m-0 p-0">
    <h4 class="booth-title ">{{booth.title}}</h4>
    <img class="w-100 head-img  " :src="booth.logo"  alt="">
  </div>
  <div class="container-fluid ">
    <div class="row">
    <div class="col-3 text-muted-normal text-right mt-minus-4 float-right" >
      <star-rating class=" float-right" :star-size="rate_size" :show-rating="false" v-model="booth_rate" @rating-selected="sendRate" style="direction:ltr" v-bind:class="{'mt-4':(rate_size == 20)}"></star-rating>
      <!-- </div> -->
    </div>
    <div class="col-6 text-center ">
      <!-- <img class="booth-img " :src="booth.profile_picture"></img> -->
      <!-- <h1 class="pureblack font-weight-bold">{{booth.name}}</h1> -->
      <div class=" row mt-5">
      <span class="mx-auto font-weight-normal text-muted-normal h5 add-to-follow" @click="addToFollow()" v-bind:class="{card_icon_hover: booth.is_following}">دنبال کردن غرفه <i class="fas fa-user-plus"></i></span>
      <!-- <span class="font-weight-normal text-muted-normal h5">اشتراک گذاری از طریق</span> -->
      </div>
      <p class="seller-des my-3">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.  </p>
      </div>
      <div class="col-3 mt-minus-4">
        <h5 class="font-weight-normal text-muted-normal">شروع فعالیت : {{booth.created_at}}</h5>

        <!-- <h4 class="font-weight-bold"><span class="pureblack" style="font-weight:800; font-size:1.2em">۲۷۸</span> دنبال کننده</h4> -->
      </div>
      <div class="col-12 mx-auto my-3">
        <img class="booth-seller mx-auto" :src="booth.seller.profile_picture" alt="">
        <h4 class="seller-name pureblack font-weight-bold mt-2">{{booth.seller.name}}</h4>
        <div class="text-center text-muted-normal mt-2">
        <i class="fas fa-map-marker-alt"></i>
        <span v-if="booth.seller" class="seller-address">{{booth.seller.state.name}}, {{booth.seller.city}}</span>
      </div>
      </div>

      <div class="col-12 my-4" v-if="booth_products[0]">
        <span class="g-line"></span>
        <button class="btn btn-sm  title-button  d-block mx-auto  rounded-pill " style="margin-top:-25px;"  >محصولات</button>
      </div>
      <div class="container-fluid center " style="max-width: 1300px;   ">

        <div class="row justify-between" v-if="booth_products[0]">
          <div v-for="product in booth_products" class=" col-lg-3   col-sm-6  my-2 ">
            <product :item="product"></product>
          </div>
          <div class="w-100 my-4">
          <button v-if="booth_products.length > 4" class="link-text  my-4 "> مشاهده تمام موارد</button>
        </div>
        </div>
      </div>
      <div class="col-12 my-4">
        <span class="g-line"></span>
        <button class="btn btn-sm  title-button  d-block mx-auto  rounded-pill " style="margin-top:-25px;"  >درباره غرفه</button>
      </div>
        <div class="container-fluid center " style="max-width: 1300px;   ">
          <expanding :item="booth.description"></expanding>

        </div>
      <div class="col-12 my-4">
        <span class="g-line"></span>
        <button class="btn btn-sm  title-button  d-block mx-auto  rounded-pill " style="margin-top:-25px;"  >نظرات</button>
      </div>
      <!-- <div class=" " style="max-width: 1300px;   "> -->
      <comments :item="booth" :type="'booths'"></comments>
    <!-- </div> -->
    </div>
  </div>
  <div id="snackbar" :class="{'show-snack': show_snack}">شما قبلا رای داده اید!</div>

</div>
</template>

<script>
import Product from './Product'
import Booth from './Booth'
import Expanding from './ExpandDescription'
import Comments from './Comments'
import StarRating from 'vue-star-rating'
export default {

  data: () => ({
    booth: null,
    booth_booths: [],
    booth_products: [],
    comments: [],
    booth_rate: null,
    show_snack: false,
    rate_size: 30,
    window: {
      width: 0,
      height: 0
    }

  }),
  components: {
    product: Product,
    booth: Booth,
    expanding: Expanding,
    comments: Comments,
    StarRating
  },
  methods: {
    getBoothValues() {
      this.$store.dispatch('getBoothValues', {
        id: this.$route.params.id
      }).
      then(response => {
        this.booth = response.data.data
        this.booth_rate = response.data.data.rating
      })
    },
    getBoothProducts() {
      this.$store.dispatch('getBoothProducts', {
        id: this.$route.params.id
      }).
      then(response => {
        this.booth_products = response.data.data
        this.$store.dispatch("afterLoad");

      })
    },
    addToFollow() {
      if (!this.booth.is_following) {
        this.$store.dispatch('addToFollowRequest', {
          booth_id: this.booth.id,
        }).
        then(response => {
          this.booth.is_following = true;
        })
      } else if (this.booth.is_following) {
        this.$store.dispatch('removeFromFollowRequest', {
          booth_id: this.booth.id,
        }).
        then(response => {
          this.booth.is_following = false;
        })
      }
    },
    showSnack() {
      this.show_snack = true
      setTimeout(() => {
        this.show_snack = false;
      }, 3000)
    },
    sendRate(rate) {
      this.$store.dispatch('sendRateRequsest', {
        id: this.booth.id,
        score: rate
      }).
      then(response => {
        if (response.data.errors) {
          this.showSnack()
          this.booth_rate = this.booth.rating
        }
      })
    },
    //for resize rate component
    handleResize() {
      if (window.innerWidth < 769) {
        this.rate_size = 20;
      } else {
        this.rate_size = 30;
      }
    },
  },
  //for resize rate component
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted() {
    this.getBoothValues()
    this.getBoothProducts()
    //for resize rate component
    window.addEventListener('resize', this.handleResize)

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
.booth-title{
  position: absolute;
  z-index: 2;
  font-size: 2.5em;
  color: white;
  font-weight: bold;
  bottom: 10%;
  left: 0%;
  right: 0%;
}
.seller-des{
  font-size:1.4em;;
  color: #5c5c5c;
  line-height: 1.8em
}

.outer-container{
  background-color: #f2f2f2;

}
.mt-minus-4{
  margin-top: -1.5rem;
}
.booth-seller{
  display: block;
  width: 8em;
  height:8em;
  border-radius: 100%;
}
.add-to-follow{
  cursor: pointer;
}

.card_icon_hover{
color: #fd446d;
}


@media (max-width:48em) {
  .head-img{
    border-radius: 10px !important;
    height:15em;
  }
  .booth-seller{
    width: 5em;
    height:5em;
  }
  .seller-des{
    font-size:0.5em;
    line-height: 1.5em !important;
  }
  h5{
    font-size: 0.4em !important;
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
  .seller-name{
    font-size: 1em;
  }
  .seller-address{
    font-size: 0.7em;
  }
  .my-3{
    margin:0.5em 0 !important;
  }
  .booth-title{
    font-size: 1.5em;
  }
}
</style>
