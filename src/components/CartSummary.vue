<template lang="html">

  <div class=" outer-container  text-center mr-auto py-2 px-4">
    <div class="header">
      شما <strong>{{item.product_counter}}</strong> کالا را انتخاب کرده اید
    </div>
    <div class="price-container clearfix">
      <span class="float-right">جمع کل : </span>
      <span class="float-left">{{item.total_price_without_discount | toCurrency}} تومان </span>
    </div>
    <div class="price-container clearfix">
      <span class="float-right"> تخفیف :</span>
      <span class="float-left">{{item.total_price_without_discount - item.final_price  | toCurrency}} تومان</span>
    </div>
    <div class="finally-price mt-2">
      <li class="list-unstyled ">قابل پرداخت :</li>
      <li class="list-unstyled text-special-pink">{{item.final_price | toCurrency}} تومان </li>
    </div>

    <!-- <p class="summary-des p-2">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</p> -->
    <router-link :to="{name:'SubmitOrder', params:{}}" type="button" class="common-buttons cart-btn btn special-pink rounded-pill mb-4" name="button" >نهایی کردن خرید</router-link>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      // required: true,
      // type: Object
    }
  },
  // methods: {
  //   verifyDiscount() {
  //     this.$store.dispatch('verifyDiscountCodeRequest', {
  //       code: this.discount_code,
  //     }).
  //     then(response => {
  //       this.item.is_following = true;
  //     }).catch(error => {
  //       // if (error.response.status == 401)
  //       //   this.showSnack()
  //     })
  //   },
  // },
  mounted() {
    console.log(this.item);
  }
}
</script>

<style lang="css" scoped>
.outer-container{
  background-color: white;
  border-radius: 10px;
  border: 1.5px solid #d9d9d9;
}
@media (max-width: 48em) {
  .outer-container{
    width: 90vw !important;
  }
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

.discount-input{
  background-color: white;
  border:0;
  height: 1.2em;
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
}
.discount-button{
  background-color: white;
  border: 0;
  font-size: 0.6em;
  padding: 0 !important;
  /* margin-right: -3em; */
}
</style>
