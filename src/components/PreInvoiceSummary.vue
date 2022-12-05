<template lang="html">
  <div class=" outer-container  text-center py-2 px-4" v-show="item">
    <div class="body py-2">
      <div class=" clearfix my-3">
        <span class="float-right font-weight-bold pureblack">جمع کل :</span>
        <span  class="float-left align-middle">{{item.price_before_discount}} تومان</span>
      </div>
      <div class=" clearfix my-3">
        <span class="float-right item-title"> تخفیف :</span>
        <span class="float-left align-middle">{{item.total_discount}} تومان</span>
      </div>
      <div class=" clearfix my-3">
        <span class="float-right item-title"> میزان جایزه :</span>
        <span  class="float-left align-middle">{{item.total_bonus}} تومان</span>
      </div>
      <div class=" clearfix my-3 ">
        <span class="float-right item-title">جمع کل با حساب جوایز :</span>
        <span  class="float-left align-middle">{{item.total_price_plus_bonus}} تومان</span>
      </div>
      <div class="delivery-container my-3">
        <div class=" clearfix " v-if="item.total_mass" >
          <span class="float-right  mass-item"> وزن سفارشات :</span>
          <span  class="float-left h6 mass-item align-middle">{{item.total_mass}} تومان</span>
        </div>
      <div class=" clearfix ">
        <span class="float-right item-title"> هزینه ارسال :</span>
        <span  class="float-left align-middle">{{item.delivery_method.price}} تومان</span>
      </div>
    </div>
      <div class=" clearfix my-3">
        <span class="float-right item-title"> مالیات بر ارزش افزوده :</span>
        <span  class="float-left align-middle">{{item.total_tax}} تومان</span>
      </div>
      <div class="">
      <label class="container">
        <p class="checkbox-des">اطلاعات آدرس مورد تایید اینجانب می باشد و همچین شرایط و ضوابط را خوانده ام و با آن موافق هستم</p>

        <input type="checkbox" checked="checked" v-model="submit" >
        <span class="checkmark"></span>
      </label>
    </div>
    </div>
    <div class=" mt-2">
      <li class="list-unstyled ">قابل پرداخت :</li>
      <li class="list-unstyled text-special-pink align-middle h5 font-weight-bold">{{item.price + item.delivery_method.price}} تومان </li>
    </div>
    <div class="input-container m-0 ">
      <button  type="button" class="common-buttons cart-btn btn special-pink rounded-pill mb-4" name="button" @click="pay()" :disabled="!submit">پرداخت</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      required: true,
    },
  },
  data: () => ({
    summary: {},
    card: [],
    submit: false,
  }),
  methods: {
    a() {
      alert(this.submit)
    },
    setSummary() {
      this.cart = this.item;
      this.summary.total_price = 0
    },
    pay() {
      this.$store.dispatch('getPaymentOrderRequest', {
        id: this.$route.params.id,
      }).
      then(response => {
        window.open(response.data.data, "_blank");
      })
    },
  },
  computed: {},
  mounted() {
    console.log(this.item);
    // this.setSummary()
  }
}
</script>

<style lang="css" scoped>
/* styling for checkbox */
/* Customize the label (the container) */
.container {
  display: block;
  position: relative;
  /* padding-left: 35px; */
  /* margin-bottom: 12px; */
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  right: 0 ;
  height: 10px;
  width: 10px;
  border: 1px solid #ccc;
  border-radius: 2px;
  background-color: inherit;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  border-radius: 3px;
  background-color: #FFE0F0;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  border-radius: 3px;
  background-color: #FD446D;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}
.checkbox-des{
  font-size: 13px;
  line-height: 20px;
  color: #ADADAD;
  text-align: justify; text-align-last: center;
}
/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
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
.item-title{
  color: #969696;
}
.outer-container{
  background-color: white;
  border-radius: 10px;
  border: 1.5px solid #d9d9d9;
}
.header{
  color: #aaaaaa;
  font-size: 0.8em;

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
}
.discount-button{
  background-color: white;
  border: 0;
  font-size: 0.6em;
  padding: 0 !important;
  /* margin-right: -3em; */
}


</style>
