<template lang="html" style="background-color:#f2f2f2;">
  <div  class="container-fluid mt-5 text-right " style="max-width: 1430px; background-color:#f2f2f2;" >
    <div  v-bind:class="{row:is_screen_lg}">
      <div  v-bind:class="{'col-12':is_screen_lg, 'w-50': !is_screen_lg, 'float-left':!is_screen_lg}">
        <div class="row " >
          <div class=" main-product-image-container mx-auto" v-bind:class="{'mx-auto': is_screen_lg}">
            <div class="container">
              <img class="main-product-image  d-block  mx-auto" :src="main_image" alt="">
            </div>
            <div class="text-center mt-3 col-12" v-if="( (product.remaining_time > 0))">
              <timer :time="product.remaining_time"></timer>
              <!-- <span class=" text-muted-normal" >اشتراک گذاری از طریق: </span> -->
            </div>
          </div>
          <div  v-bind:class="{'text-center': is_screen_lg, 'col-12':is_screen_lg,}">
            <img v-for="(img, k) in product.gallery" :key="k" @click="changeMainImage(img, k)"  :class="{highlight:selected_img == k,productimages:true, 'product-images-container': !is_screen_lg}"  :src="img">
          </div>
        </div>
      </div>
      <div v-bind:class="{'col-12':is_screen_lg, 'w-50': !is_screen_lg, 'float-right':!is_screen_lg, 'px-4': is_screen_lg}">
        <h3  class="pureblack mb-3" style="font-weight:800">{{product.title}}</h3>
          <div class="d-flex justify-content-between">
          <!-- <span class="soft-dark h5 font-weight-normal">غرفه {{product.booth.title}}</span> -->
          <span class="soft-dark h5 font-weight-normal">دسته بندی : <strong>{{product.category.name}}</strong></span>
          <span class="soft-dark h5 font-weight-normal">برند : <strong>{{product.brand.title}}</strong></span>
        </div>


        <!-- <div class="d-flex justify-content-between my-3"> -->
          <!-- <star-rating class="small h6" :star-size="30" :show-rating="false" v-model="rate_by_user" @rating-selected="sendRate"></star-rating> -->
          <!-- <span class="font-weight-normal h5 text-muted-normal">ستاره (25 تجربه نوشته شده)</span> -->
        <!-- </div> -->
        <div class="my-4 clearfix">
          <div class="row">
             <!-- <div class="col-12 my-4">
              <pdropdown placeholder="گزینه مورد نظر را انتخاب کنید" :selected="selected_attribute" :items="product.attributes" class=""></pdropdown>
            </div> -->
            <!-- !!!!!!!!!!!!!!!!!!!!! -->
            <!-- man age jat bodam be in dast nemizadam ! -->
            <div class="col-md-3 col-6">
              <pqselector   :item="product" @changeQuantity="setQuantity" ></pqselector>
            </div>
            <div class="col-6 col-md-9">
              <div class="float-left">
            <p v-if="product.price_after_discount" class="h4 font-weight-bolder   mb-3 text-muted light-weight-text last_price text-center"> {{product.price | toCurrency}} تومان </p>
            <p v-if="product.price_after_discount" class="h4 font-weight-bolder pale-blue  mt-3"> {{product.price_after_discount | toCurrency}} تومان </p>
            <p v-if="!product.price_after_discount" class="h4 font-weight-bolder pale-blue  mt-3"> {{product.price | toCurrency}} تومان </p>
          </div>
          </div>
          </div>
        </div>
        <div class="sm-add-to-cart-btn " v-if="is_screen_lg">
          <button @click="addToCart()" class=" common-buttons btn w-100 py-2   special-pink " type="button" name="add-cart"> افزودن به سبد خرید</button>
        </div>
        <div class="d-flex justify-content-between">
          <button @click="addToCart()" class="common-buttons btn add-cart-btn  rounded-pill special-pink px-5 " type="button" name="add-cart" v-if="!is_screen_lg"> افزودن به سبد خرید</button>
          <a class="card-icon add-to-favorit" v-bind:class="{card_icon_hover: product.is_bookmarked}" @click="addToBookmark()">
          <span class="font-weight-normal  text-muted-normal" >افزودن به علاقه مندی ها </span>
          <i class="far fa-heart mt-4"></i></a>
        </div>
        <div class="my-5 " v-if="product.features[0]">
          <h4 class="pureblack mr-0 pr-0">مشخصات محصول</h4>
          <ul class="attr-list-item   pr-3">
            <li v-for="feature in product.features">{{feature}}</li>
          </ul>
        </div>
      </div>
      <div class="row  " v-bind:class="{'px-3': is_screen_lg, 'w-100': !is_screen_lg}">
        <div class="col-12">
          <div class="discount-list-container row my-4" v-if="product.discount">
            <div class="col-12 col-md-6 mb-5">
              <div class="discount-table p-3">
                <table   style="width:100%">
                  <tr class="discount-table-header text-center">
                    <th class="pb-2">از</th>
                    <th class="pb-2">تا</th>
                    <th class="pb-2">قیمت محصول</th>
                    <th class="pb-2">هدیه سطح خرید</th>
                  </tr>
                  <tr v-for="item in product.discount" class="discount-table-sub text-center " v-bind:class="{'active-table': (item.bonus == product.discount_bonus)}">
                    <td class="py-3">{{item.from}}</td>
                    <td class="py-3">{{item.to}}</td>
                    <td class="py-3">{{item.price | toCurrency}} تومان</td>
                    <td class="py-3">{{item.bonus | toCurrency}} تومان</td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div  class="row overflow-hidden mb-3 mr-0">
                <div class="bg-light px-3   col-3 col-sm-4  manual-text">
                  <p class="bonus-table pt-2 pureblack">تخفیف خرید کالا</p>
                </div>
                <div class=" col-9  pr-4  col-sm-8 ">
                  <div class="bg-light px-3 manual-text ">
                    <p class="bonus-table pt-2 soft-black">{{finally_discount | toCurrency}} تومان</p>
                  </div>
                </div>
              </div>
              <div  class="row overflow-hidden mb-3 mr-0">
                <div class="bg-light px-3   col-3 col-sm-4  manual-text">
                  <p class="bonus-table pt-2 pureblack">هدیه به ازای هر خرید</p>
                </div>
                <div class=" col-9  pr-4  col-sm-8 ">
                  <div class="bg-light px-3 manual-text ">
                    <p class="bonus-table pt-2 soft-black">{{product.bonus * cart_quantity | toCurrency}} تومان</p>
                  </div>
                </div>
              </div>
              <div  class="row overflow-hidden mb-3 mr-0">
                <div class="bg-light px-3   col-3 col-sm-4  manual-text">
                  <p class=" p-0 m-0 bonus-table pt-2 pureblack">هدیه سطح خرید</p>
                </div>
                <div class=" col-9  pr-4  col-sm-8 ">
                  <div class="bg-light px-3 manual-text ">
                    <p class="bonus-table pt-2 soft-black"> {{product.discount_bonus | toCurrency}} تومان</p>
                  </div>
                </div>
              </div>
              <div  class="row overflow-hidden mb-3 mr-0">
                <div class="bg-light px-3   col-3 col-sm-4  manual-text">
                  <p class="bonus-table pt-2 pureblack">جایزه مشارکت خرید</p>
                </div>
                <div class=" col-9  pr-4  col-sm-8 ">
                  <div class="bg-light px-3 manual-text ">
                    <p class="bonus-table pt-2 soft-black"><b>نامعلوم</b> (این مورد بعد از اتمام کالا مشخص میشود)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div class="col-lg-6 col-md-12 my-4">
        <h4 class="pureblack pb-4">توضیحات محصول  </h4>
        <expanding :item="product.description"></expanding>
      </div>
      <div class="col-lg-6 col-md-12 my-4">
        <h4 class="pureblack font-weight-bold border-after3 pb-3">ویژگی ها محصول</h4>
        <div v-if="!full_attribite" class="row overflow-hidden mb-3 mr-0" v-for="attr in product.attributes.slice(0, 4)">
          <div class="bg-light px-3   col-3 col-sm-4  manual-text">
            <p class="pt-2 pureblack">{{attr.name}}</p>
          </div>
          <div class=" col-9  pr-4 col-sm-8  ">
            <div class="bg-light px-3 manual-text ">
              <p class="pt-2 soft-black">{{attr.value}}</p>
            </div>
          </div>
        </div>
        <div v-if="full_attribite" class="row overflow-hidden mb-3 mr-0" v-for="attr in product.attributes">
          <div class="bg-light px-3   col-3 col-sm-4  manual-text">
            <p class="pt-2 pureblack">{{attr.name}}</p>
          </div>
          <div class=" col-9  pr-4  col-sm-8 ">
            <div class="bg-light px-3 manual-text ">
              <p class="pt-2 soft-black">{{attr.value}}</p>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button v-if="!full_attribite && (product.attributes.length > 4)" @click="changeAttrNumber()" class=" link-text3 btn border-bottom m-0 p-0 b-0"> نمایش کامل مشخصات</button>
        </div>
      </div>
    </div>
    </div>
    <div class="row">
    <div class="col-12 my-4" v-if="similar_products[0]">
      <span class="g-line"></span>
      <button class="btn btn-sm  title-button  d-block mx-auto  rounded-pill " style="margin-top:-25px;"  >محصولات مشابه</button>
    </div>
    <div class="container-fluid center " style="max-width: 1300px;" v-if="similar_products[0]">
      <div class="row justify-between">
        <div v-for="product in similar_products.slice(0, 4)" class=" col-lg-3   col-sm-6  my-2">
          <product :item="product"></product>
        </div>
        <div class="w-100 my-4 text-center" >
        <router-link :to="{ name: '', params: {} }" class="link-text"> مشاهده سایر موارد</router-link>
      </div>
      </div>
    </div>
    <!-- <div class="col-12 my-4">
      <span class="g-line"></span>
      <button class="btn btn-sm  title-button  d-block mx-auto  rounded-pill " style="margin-top:-25px;"  >سایر محصولات غرفه</button>
    </div>
    <div class="container-fluid center " style="max-width: 1300px;   ">
      <div class="row justify-between">
        <div v-for="product in more_products.slice(0,4)" class=" col-lg-3   col-sm-6  my-2">
          <product :item="product"></product>
        </div>
        <div class="w-100 my-4 text-center" >
        <router-link :to="{ name: '', params: {} }" class="link-text "> مشاهده سایر موارد</router-link>
      </div>
      </div>
    </div> -->
    <div class="col-12 my-4">
      <span class="g-line"></span>
      <button class="btn btn-sm  title-button  d-block mx-auto  rounded-pill " style="margin-top:-25px;"  >نظرات</button>
    </div>
    <div class="my-4 row col-12 mx-auto">
    <comments  type="products" :item='product'></comments>
  </div>
  </div>
  </div>

</template>

<script>
import Expanding from './ExpandDescription'
import Product from './Product'
import Comments from './Comments'
import QuantitySelector from './ProductQuantitySelector'
import ProductDropDown from './ProductDropDown'
import StarRating from 'vue-star-rating'
import Timer from './Timer'
export default {
  props: {
    item: {
      type: Object
    }
  },
  data: () => ({
    full_attribite: false,
    main_image: null,
    product: null,
    cart_quantity: 1,
    selected_img: 0,
    rate_by_user: null,
    selected_attribute: null,
    more_products: [],
    similar_products: [],
    is_screen_lg: false,
    window: {
      width: 0,
      height: 0
    }
  }),
  methods: {
    changeAttrNumber() {
      this.full_attribite = true;
    },
    changeMainImage(img, k) {
      this.main_image = img
      this.selected_img = k
    },
    setQuantity(quantity) {
      this.cart_quantity = quantity
      this.product.cart_quantity = quantity
    },
    getProductValues() {
      this.$store.dispatch('getProductValues', {
        id: this.$route.params.id
      }).
      then(response => {
        this.product = response.data.data
        this.product.cart_quantity = 1
        this.main_image = response.data.data.gallery[0]
        this.$store.dispatch("afterLoad");
      })
    },
    getSimilarProducts() {
      this.$store.dispatch('getProducts', {
        id: this.$route.params.id
      }).
      then(response => {
        this.similar_products = response.data.data
      })
    },
    getMoreProducts() {
      this.$store.dispatch('getProducts', {
        id: this.$route.params.id
      }).
      then(response => {
        this.more_products = response.data.data
        this.$store.dispatch("afterLoad");
      })
    },
    addToCart() {
      this.$store.dispatch('addToCartRequest', {
        product_id: this.product.id,
        quantity: this.product.cart_quantity
      }).
      then(response => {
        this.$router.push({
          path: '/cart'
        })

      }).catch(error => {
        this.$router.push({
          path: '/cart'
        })

      })
    },
    handleResize() {
      if (window.innerWidth < 1300) {
        this.is_screen_lg = true
      } else {
        this.is_screen_lg = false
      }
    },
    addToBookmark() {
      if (!this.product.is_bookmarked) {
        this.$store.dispatch('addToBookmarkRequest', {
          product_id: this.product.id,
        }).
        then(response => {
          this.product.is_bookmarked = true;
        })
      } else if (this.product.is_bookmarked) {
        this.$store.dispatch('removeFromBookmarkRequest', {
          product_id: this.product.id,
        }).
        then(response => {
          this.product.is_bookmarked = false;
        })
      }
    },
  },
  computed: {
    finally_discount() {
      return this.product.discount_price + (this.product.bonus * this.cart_quantity) + this.product.discount_bonus
    }
  },
  components: {
    expanding: Expanding,
    product: Product,
    comments: Comments,
    pqselector: QuantitySelector,
    pdropdown: ProductDropDown,
    StarRating,
    timer: Timer

  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted() {
    this.getProductValues()
    this.getSimilarProducts()
    this.getMoreProducts()
    window.addEventListener('resize', this.handleResize)
    this.handleResize();

  },
}
</script>

<style lang="css" scoped>
.product-images-container{
/* transform: rotate(90deg); */
margin-right: -8em !important;
}
.last_price{
line-height: 20px;
font-size: 16px;
}
.last_price::after{
content: '';
width: 80%;
margin-left: auto;
margin-right: auto;
display: block;
margin-top: -11px;
background-color: #aaa;
height:1.5px;

}
.product-images-container{
  /* transform: rotate(90deg); */
  margin-right: -8em !important;
}
.soft-dark{
  color: #767676;
}
.link-text {
  color: #9B9B9B;
  font-size: 1.5em;
  text-decoration: none;
  font-weight: 400;
  border-bottom: .3px solid #9B9B9B;
}
.link-text3 {
  font-weight: 800;
  font-size: 1.2em;
  color: #000 !important;
  border-bottom: 1px solid !important;
  border-radius: 0 !important;
}

.manual-text{
  min-height: 3.2em;
}

.productimages{
  display: block;
  margin: 1em 0 1em 0 ;
  width: 100px;
  height:100px;
  border-radius: 10px;
  /* margin: 0 25px 0 25px; */
  /* transform: rotate(-90deg); */
}
@media (max-width:1300px) {
  .main-product-image{
  width:250px !important;
  height: 250px !important;
}
  .last_price{
  font-size: 12px !important;
  }
  .productimages{
    display: inline-block !important;
    margin: 1em !important;
  }
  .add-cart-btn {
    font-size: 0.7em !important;
    padding: 0.5em  1em !important;
  }
  .add-to-favorit{
    font-size: 0.3em !important;
  }
  .attr-list-item li {
    font-size: 0.5em;
  }
  h4{
    font-size: 0.9em;
  }
  .h4{
    font-size: 0.9em;
  }
  h3{
    font-size: 1.2em;
  }
  .h5{
    font-size:0.8em;
  }
  .add-to-favorit {
    font-size: 0.6em !important;
  }
  p{
    font-size: 0.6em;
  }
  .link-text3{
    font-size: 0.7em;
  }
  .manual-text{
      font-size: 0.7em;
      min-height: 3.3em;
      padding-right: 0.3em  !important;
    }
    .manual-text p{
      margin: 0 !important;
    }
}
.highlight{
  border: 2px solid #F4DD8F ;
  /* transition: border 0.5s; */
}
.main-product-image{
display: inline-block;
width:400px;
height: 400px;
}

.container::after{
  content: ' ';
  display: block;
  width: 100%;
  margin-top: 2em;
  height:2px;
  /* background-color: #000; */
  background-image: linear-gradient(to right , rgb(245,245,245), #C3C3C3 ,  rgb(245,245,245));

}
.root{
  background-color: #f2f2f2;
}
.add-cart-btn{
  font-size: 1.8em;
  font-weight:bold;
}
.attr-list-item{
  color: #545454;
  list-style: none;
}
.attr-list-item li::before {
  content: "\2022";  /* Add content: \2022 is the CSS Code/unicode for a bullet */
  color: #9a9a9a; /* Change the color */
  font-size: 1.2em;
  vertical-align: middle;
  font-weight: bold; /* If you want it to be bold */
  display: inline-block; /* Needed to add space between the bullet and the text */
  width: 0.7em; /* Also needed for space (tweak if needed) */
}
.card-icon{
  font-size:  1.5em;
  font-weight: bold;
  color: #cccccc;
  cursor: pointer;
}
.card-icon:hover span{
  color: #fd446d !important;
}.card-icon:hover {
  color: #fd446d !important;
}
.card_icon_hover{
color: #fd446d !important;
}
.card_icon_hover span{
color: #fd446d !important;
}
.discount-table{
  background-color: white;
  border-radius: 20px;
}
.discount-table-header{
  border-bottom: 2px solid #C5C5C5;

}
.discount-table-sub{
  font-size: 15px;
  font-weight: bold;
}
.active-table{
  border-collapse: collapse !important;
  padding: 0 !important;
  border-radius: 1em !important;
  background-color: #D3EDF3;
}
@media (max-width:1300px) {
  .discount-table-header{
    border-bottom: 2px solid #C5C5C5;

  }
  .discount-table-sub{
    font-size: 15px;
    font-weight: bold;
  }
  .bonus-table{
    font-size: 0.5em;
  }
}
.bonus-table{
  /* font-size: 12px; */
}
/* table { border-collapse: separate; } */
/* td { border: solid 1px #000; } */
tr:last-child td:first-child { border-top-right-radius: 20px; }
tr:last-child td:last-child { border-top-left-radius: 20px; }
tr:last-child td:first-child { border-bottom-right-radius: 20px; }
tr:last-child td:last-child { border-bottom-left-radius: 20px; }
.sm-add-to-cart-btn{
  position: fixed;
  bottom: 10px;
  left: 10px;
  right: 10px;
  z-index: 100;
  /* width: 100%; */
  align-items: center;
}
</style>
