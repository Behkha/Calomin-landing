<template lang="html">
  <div class=" outer-container  text-center mr-auto py-2 px-4" v-show="item">
    <div class="header">
      لیست خرید
    </div>
    <div class="body py-2">
    <div v-for="product in item.products" class="price-container clearfix">
      <span class="float-right">{{product.details.title}}</span>
      <span class="float-left font-weight-light">{{product.cart_qty}}</span>
    </div>
  </div>
  <div class="body py-2">
    <div class=" clearfix my-2">
      <!-- <span class="float-right font-weight-bold pureblack">جمع کل : {{item.final_price}}</span> -->
      <span class="float-right font-weight-bold pureblack"> جمع کل:</span>
      <span  class="float-left align-middle" >{{item.final_price | toCurrency}} تومان</span>
      <!-- <span class="float-left h6">{{item.total_price_without_discount}} تومان </span> -->
    </div>
    <div class=" clearfix my-2">
      <!-- <span class="float-right"> تخفیف </span> -->
      <span class="float-right item-title"> تخفیف :</span>
      <span  class="float-left align-middle" >{{discount | toCurrency}} تومان</span>
      <!-- <span class="float-left h6">{{item.total_price_without_discount - item.total_price}} تومان</span> -->
    </div>
    <div class="delivery-container my-3" >
      <div class=" clearfix " v-if="item.total_mass" >
        <span class="float-right  mass-item"> وزن سفارشات :</span>
        <span  class="float-left h6 mass-item align-middle">{{item.total_mass | toCurrency}} تومان</span>
      </div>
    <div class=" clearfix ">
      <span class="float-right item-title"> هزینه ارسال :</span>
      <span  class="float-left align-middle" v-if="delivery">{{delivery.price | toCurrency}} تومان</span>
    </div>
  </div>
  </div>
    <div class=" mt-2">
      <li class="list-unstyled font-weight-bold">قابل پرداخت :</li>
      <li class="list-unstyled text-special-pink h6">{{total_price  | toCurrency}} تومان </li>
    </div>
    <div class="input-container m-0 ">
    <div class="form-group input-group discount-input-group px-1 " >
      <input  v-model="discount_code" class=" discount-input form-control p-0" type="text" name="discount_code" placeholder="کد تخفیف خود را وارد کنید" @keyup.enter="submit()">
      <!-- <div class="prepend-icon input-group-text discount-input">
        <button class="discount-button" @click="verifyDiscount()">اعمال</button>
      </div> -->
    </div>
  </div>
    <button  type="button" class="common-buttons cart-btn btn special-pink rounded-pill mb-4" name="button" @click="submit()">پرداخت</button>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      required: true,
    },
    delivery: {}
  },
  data: () => ({
    summary: {},
    card: [],
    discount_code: ''
  }),
  methods: {
    setSummary() {
      this.cart = this.item;
      this.summary.total_price = 0
    },
    submit() {
      console.log(this.discount_code);
      this.$emit('submit', this.discount_code)
    }
  },
  computed: {
    discount() {
      return this.item.total_price_without_discount - this.item.final_price
    },
    total_price() {
      if (this.delivery) {
        return this.item.final_price + this.delivery.price
      } else {
        return this.item.final_price
      }
    }
  },
  mounted() {
    this.setSummary()
  }
}
</script>

<style lang="css" scoped>
.item-title{
  color: #969696;
}
.delivery-container{
background-color: #F8F8F8;
padding: 0.3em 0.5em;
border-radius: 5px;
}
.mass-item{
font-size: 0.7em;
color: #C2DEDF;
margin: 0 2em;

}
.outer-container{
  width: 23em;
  background-color: white;
  border-radius: 10px;
  border: 1.5px solid #d9d9d9;
}
@media (max-width: 48em) {
  .outer-container{
    width: 90vw !important;
  }
}
@media (max-width: 76em  ) {
  @media (min-width: 48em) {

    .outer-container{
      width: 15em !important;
      transition: width 1s;
    }
  }

}
.header{
  color: #aaaaaa;
  font-size: 0.8em;

}
.body::before{
  content: ' ';
  display: block;
  border-radius: 100%;
  height:1px;
  width:70%;
  margin: 1em auto 1em auto;
  background-image: linear-gradient(to right, white, #ccc, white);
}
/* s */
/* .finally-price::after{
  content: ' ';
  display: block;
  border-radius: 100%;
  height: 0.5px;
  width:70%;
  margin: 0.5em auto 0.5em auto;
  background-image: linear-gradient(to right, white, #ccc, white);
} */
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
  padding: 0.5em 5em 0.5em 5em
}
.discount-input{
  background-color: white;
  border:0;
  height: 2em;
  width: 20%;
  margin: auto;
}
.discount-input::placeholder{
  font-size: 0.7em;
}
.discount-input-group{
  background-color: white;
  border-radius: 5px;
  border: 1px solid #ccc;
  overflow:hidden;
}
.input-container{
  border-bottom: 1.5px solid #B6B6B6;
  margin-bottom: 2em !important;
}
.discount-button{
  background-color: white;
  border: 0;
  font-size: 0.6em;
  padding: 0 !important;
  /* margin-right: -3em; */
}
</style>
