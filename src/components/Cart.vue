<template lang="html">
  <div class="container-fluid  pb-5 " style="max-width: 1400px; min-height: 100vh;  ">
  <div class="row ">
    <div class="col-12 my-5 ">
      <span class="g-line-cart"></span>
      <button class="btn btn-sm  title-button  d-block mx-auto  rounded-pill " style="margin-top:-25px"  >سبد خرید</button>
    </div>
    <h3 class="mx-auto my-5 col-12" v-if="!cart.products[0]">سبد خرید خالی است</h3>
  <div class="col-md-8 col-sm-12">
    <div class=" text-right mb-3" v-for="(product, k) in cart.products" :key="k">
    <div class="  text-center w-90 d-inline-block" >
      <div  class="row p-3  cart-box" >
        <div class="col-md-3 col-sm-12">
          <img class="product-cart-image" :src="product.details.gallery[0]" alt="">
        </div>
        <div class="col-md-5 col-sm-12">
            <h5 class="pureblack font-weight-bolder">{{product.details.title}}</h5>
            <!-- <span class="d-block" style="color:#7a7a7a">از غرفه {{product.booth.name}}</span> -->
            <qselector @changeQuantity="setQuanntity(product)" class="mt-4 " :item="product"></qselector>
        </div>
        <div class="col-md-4 col-sm-12 pt-2 ">
          <!-- attributes aa here in p tag -> -->
          <!-- <p class=" cart-attrs "> سایز متوسط</p> -->
          <div class="cart-price position-absolute" style="bottom:0; left:5px;">
            <div class="text-special-pink m-0 h4 ">{{product.final_price | toCurrency}} تومان</div>
            <div class="unit-price">
              (قیمت واحد : {{product.details.price_after_discount | toCurrency}} تومان)
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="close-icon mr-3 text-center">

    <i @click="remove(k)" class="  far fa-times-circle"></i>
  </div>
  </div>

  </div>
  <!-- summary cart -->

    <div class="col-md-4 col-sm-12">
      <!-- margin right is  auto in this component  -->
      <summarycart v-if="cart.products[0]" :item ="summary"></summarycart>
    </div>
  </div>
</div>
</template>

<script>
import QuantitySelector from './QuantitySelector'
import Summary from './CartSummary'
import lodash from 'lodash'
export default {
  data: () => ({
    products: [],
    cart: [],
    summary: {
      product_counter: 0,
      booth_count: 0,
      total_price: null,
      total_price_without_discount: null
    }
  }),
  methods: {
    remove(index) {
      this.cart.products[index].cart_qty = 0;
      this.editCart(this.cart.products[index])
      this.cart.products.splice(index, 1);
      this.getCartValues();
    },
    getCartValues() {
      this.$store.dispatch('getCartValues').
      then(response => {
        this.cart = response.data.data
        console.log(this.cart);
        this.setSummary(response.data.data)
        this.$store.dispatch("afterLoad");
      })
    },
    editCart(product) {
      let data = {
        product_id: product.details.id,
        quantity: product.cart_qty
      }
      this.$store.dispatch('editCart', data).
      then(response => {
        this.getCartValues();
      })
    },
    setQuanntity(product) {
      // this.calcutePrice(product)
      this.editCart(product)
    },
    calcutePrice(product) {
      product.final_price = Math.round(((product.price * product.cart_quantity) / 100) * (100 - product.discount.discount_percent))
      product.total_price = product.price * product.cart_quantity
      this.setSummary()
    },
    setSummary(response) {
      // this.summary.booth_count = 0
      this.summary.product_counter = 0
      this.summary.final_price = response.final_price
      this.summary.total_price_without_discount = response.total_price_without_discount
      if (this.cart) {
        this.summary.product_counter = this.cart.products.length
        // this.cart.forEach(item => {
        // this.summary.product_counter += item.cart_quantity;
        // status = 0;
        // this.cart.forEach(item2 => {
        //   if (item.booth.id == item2.booth.id) {
        //     status = 1;
        //   }
        // })
        // if (status != 2) {
        //   this.summary.booth_count++;
        // }
        // })
      }
    }
  },
  mounted() {
    this.getCartValues()
  },
  components: {
    qselector: QuantitySelector,
    summarycart: Summary
  }
}
</script>

<style lang="css" scoped>
.g-line-cart {
  display: block;
  width: 100%;
  height: 1.5px;
  background-image: linear-gradient(to right, #C4C4C4, rgb(245, 245, 245), #C3C3C3);
}
.cart-box{
  background-color: white;
  width: 40em;
  border-radius: 1em;
  border:1.5px solid #d7d7d7;
}
@media (max-width:67em) {
  .cart-box{
    width: 30em !important;
    transition: width 1s;
  }
}
@media (max-width:48em) {
  .cart-box{
    width: 90vw !important;
    margin-right: 1vw;
    display: block;
    justify-content: center !important;
    /* display: block !important; */
    /* width: 100% !important; */
    /* transition: width 1s; */
  }
  .close-icon{
    display: block !important;
    margin: 0 auto !important;
  }
  h5{
    font-size: 1em;
  }
  .product-cart-image{
    width: 4.5em !important;
    height: 6.9em !important;
    border: 2px solid #d7d7d7 ;
    border-radius: 10px;
  }
  .cart-box span{
    font-size: 0.7em;
  }
  .cart-price{
    position: relative !important;
  }
}
.product-cart-image{
  width: 7.5em;
  height: 9.9em;
  border: 2px solid #d7d7d7 ;
  border-radius: 10px;
}
.cart-attrs{
  font-size: 0.8em ;
  color: #9e9e9e;
}
.unit-price{
  font-size: 0.8em;
  color: #c2c2c2;
}
.outer-container{
  width: 17em;
  background-color: white;
  border-radius: 10px;
  border: 1.5px solid #d9d9d9;
}
.header{
  color: #aaaaaa;
  font-size: 0.8em;

}
.header::after{
  content: ' ';
  display: block;
  border-radius: 100%;
  height:1px;
  width:70%;
  margin: 0.5em auto 0.5em auto;
  background-image: linear-gradient(to right, white, #ccc, white);
}
.finally-price::after{
  content: ' ';
  display: block;
  border-radius: 100%;
  height: 0.5px;
  width:70%;
  margin: 0.5em auto 0.5em auto;
  background-image: linear-gradient(to right, white, #ccc, white);
}
.header strong{
  color: #626262;
}
.price-container{
  background-color: white;
    font-size: 0.8em;
    color: #909090;
    font-weight: bold;
}
.finally-price li:first-child{
  font-size: 0.8em;
  font-weight: bold;
  color: #9d9d9d;
}
.finally-price li:nth-child(2){
  /* font-size: 1.1em; */
  font-weight: bold;
}
.summary-des{
  font-size: 0.65em;
  color: #949494;
  font-weight: 600;
}
.cart-btn{
  font-size: 0.8em;
  padding: 0.3em 2.5em 0.3em 2.5em
}
.close-icon{
  display: inline-block;
  color: #F79BAF;
  font-size: 3em;
  vertical-align: middle;
}
.close-icon:hover{
  color: red;
  transition: color 0.5s;
}
</style>
