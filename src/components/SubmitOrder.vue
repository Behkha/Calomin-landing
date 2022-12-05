<template lang="html">
  <div class="container-fluid  pb-5 " style="max-width: 1400px; min-height: 100vh;  " v-if="start">
    <!-- The Modal -->
    <div id="myModal" class="modal" v-show="dialog">
      <div class="modal-content">
        <i @click="cancelDialog()" class="close-icon far fa-times-circle"></i>
        <div class="row">
          <div class="col-12 my-2">
            <label class="label-input" >استان</label>
            <dropdown class="profile-input btn-lg" placeholder="استان مورد نظر را انتخاب کنید" @changeSeleted="changeAddressState" :items="states" :selected="address.state"></dropdown>
          </div>
          <div class="col-12 my-2">
            <label class="label-input" >شهر</label>
            <dropdown class="profile-input btn-lg" placeholder="شهر مورد نظر را انتخاب کنید" @changeSeleted="changeAddressCity" :items="address_cities" :selected="address.city"></dropdown>
          </div>
          <div class="col-12 my-2">
            <label for="post_id" class="label-input">کد پستی</label>
            <input v-model="address.zipcode"  id="post_id" class=" profile-input input-lg w-100" type="number" name="button"></input>
          </div>
          <div class="col-12 my-2">
            <label for="phone" class="label-input" >تلفن تماس</label>
            <input v-model="address.phone_number"  id="phone" class=" profile-input input-lg w-100" type="number" name="button"></input>
          </div>
          <div class="col-12 my-2">
            <label for="address" class="label-input" >آدرس دقیق</label>
            <textarea v-model="address.address" id="address" class="w-100 textarea" name="about-me" rows="4"></textarea>
          </div>
          <button @click="createAddress()" type="button" name="button" class="common-buttons mx-auto btn special-pink rounded-pill mt-3 py-1 px-4">افزودن آدرس</button>
        </div>
      </div>
    </div>
  <div class="row ">
    <div class="col-12 my-5 ">
      <span class="g-line-cart"></span>
      <button class=" btn btn-sm  title-button  d-block mx-auto  rounded-pill " style="margin-top:-25px"  >ثبت اطلاعات</button>
    </div>
  <div class="col-md-8 col-sm-12">
    <div class=" text-right mb-3" >
      <div class="  text-right w-90 d-inline-block" >
        <div  class="row p-2  cart-box" >
          <div class="col-12 my-2">
            <label for="address" class="label-input" >آدرس ها</label>
            <div class="form-container ">
              <form  id="address" action="#" style="direction:rtl;">
                <p v-for="(address, k) in addresses" >
                  <input type="radio" :id="'address'+k" name="radio-group-address" v-model="selected_address" :value="address">
                  <label :for="'address'+k">{{address.state.name}},   {{address.city.name}},     {{address.address}}</label>
                </p>
                <button class="add-address-btn mt-2" type="button" name="button" @click="showDialog">+ افزودن آدرس جدید </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class=" text-right mb-3">
      <div class="  text-right w-90 d-inline-block" >
        <div  class="row p-2  cart-box" >
          <div class="col-12 my-2">
            <label for="delivey" class="label-input" >روش ارسال</label>
            <div class="form-container ">
              <form  id="delivey" action="#" style="direction:rtl;">
                <p v-for="(delivery, i) in deliveries" >
                  <input type="radio" :id="'delivery'+i" name="radio-group-delivery" v-model="selected_delivery_method" :value="delivery">
                  <label :for="'delivery'+i">{{delivery.name}} <span class="delivery-des">({{delivery.description}})</span></label>
                  <span class="float-left text-muted-normal">{{delivery.price | toCurrency}} تومان</span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class=" text-right mb-3">
      <div class="  text-right w-90 d-inline-block" >
        <div  class="row p-2  cart-box" >
          <div class="col-12 my-2">
            <label for="pay" class="label-input" >روش پرداخت</label>
            <div class="form-container ">
              <form  id="pay" action="#" style="direction:rtl;">
                <p v-for="(pay, j) in payment_methods">
                  <input type="radio" :id="'pay'+j" name="radio-group-pay" v-model="selected_payment_method" :value="pay">
                  <label :for="'pay'+j">{{pay.name}}</label>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <!-- summary cart -->
    <div class="col-md-4 col-sm-12">
      <!-- margin right is  auto in this component  -->
      <summarycart v-if="summary" :delivery="selected_delivery_method" :item ="summary" @submit="submitOrder"></summarycart>
    </div>
  </div>
  <div id="snackbar" :class="{'show-snack': show_snack}">{{snack_des}}</div>
</div>
</template>

<script>
import QuantitySelector from './QuantitySelector'
import Summary from './SummaryOrder'
import DropDown from './DropDown'

export default {
  data: () => ({
    show_snack: false,
    snack_des: '',
    payment_methods: [],
    cart: [],
    deliveries: [],
    addresses: [],
    start: false,
    dialog: false,
    states: [],
    address_cities: [],
    selected_address: null,
    selected_payment_method: null,
    selected_delivery_method: null,
    discount_code: '',
    summary: null,
    address: {
      city: null,
      state: null,
      zip_code: '',
      phone_number: ''
    },
    address_cities: [],
  }),
  methods: {
    showSnack() {
      this.show_snack = true
      setTimeout(() => {
        this.show_snack = false;
      }, 3000)
    },
    changeAddressCity(selected) {
      this.address.city = selected;
    },
    showDialog() {
      this.dialog = true
    },
    cancelDialog() {
      this.dialog = false
    },
    getStates() {
      this.$store.dispatch('getStatesRequest').
      then(response => {
        this.states = response.data.data
        this.$store.dispatch("afterLoad");
      })
    },
    changeAddressState(selected) {
      this.address.state = selected;
      this.getAddressCities();
    },
    changeDeafualtAddress(address) {
      this.$store.dispatch('changeDeafualtAddressReauest', address).
      then(response => {})
    },
    getAddressCities() {
      this.$store.dispatch('getCitiesRequest', this.address.state).
      then(response => {
        this.address_cities = response.data.data.cities
      })
    },
    getAddresses() {
      this.start = false;
      this.$store.dispatch('getAddressesRequest').
      then(response => {
        this.addresses = response.data.data
        console.log(this.addresses);
        this.start = true;

      })
    },
    getPayments() {
      this.start = false;
      this.$store.dispatch('getPaymentsRequest').
      then(response => {
        this.payment_methods = response.data.data
        console.log(this.addresses);
        this.start = true;

      })
    },
    getDeliveries() {
      this.start = false;
      this.$store.dispatch('getDeliveriesRequest').
      then(response => {
        this.deliveries = response.data.data
        this.start = true;
        this.$store.dispatch("afterLoad");

      })
    },
    getCartValues() {
      this.start = false;
      this.$store.dispatch('getCartValues').
      then(response => {
        this.cart = response.data.data
        this.summary = response.data.data
        this.start = true;
      })
    },
    createAddress() {
      let data = {}
      data.receiver_phone = this.address.phone_number
      data.state_id = this.address.state.id
      data.city_id = this.address.city.id
      data.address = this.address.address
      data.zipcode = this.address.zipcode
      this.$store.dispatch('createAddressRequest', data).
      then(response => {
        this.cancelDialog();
        this.getAddresses()
      })
    },
    submitOrder(discount_code) {
      let data
      if (this.selected_address && this.selected_payment_method && this.selected_delivery_method) {
        data = {
          address_id: this.selected_address.id,
          payment_method: this.selected_payment_method.name,
          delivery_method_id: this.selected_delivery_method.id
        }
      }
      if (discount_code) {
        data.discount_code = discount_code
      }
      this.$store.dispatch('submitOrderRequest', data).
      then(response => {
        console.log(response.data.data);
        this.$router.push({
          path: `/pre-invoice/${response.data.data.id}`
        })
        // router.push()

      }).catch(error => {
        // console.log();
        console.log(error.response);
        if (error.response.data.code == '1') {
          console.log('dd');
          this.snack_des = 'کد تخفیف صحیح نیست!';
          this.showSnack()
        } else {
          console.log('dd');
          this.snack_des = 'ورودی ها را بررسی کنید!';
          this.showSnack()
        }
      })
    },
    getPayUrl(order_id) {
      console.log(order_id);
      this.$store.dispatch('getPaymentOrderRequest', {
        id: order_id,
      }).
      then(response => {
        window.open(response.data.data, "_blank");
      })
    },
  },
  mounted() {
    this.getCartValues()
    this.getAddresses()
    this.getDeliveries()
    this.getStates()
    this.getPayments()
  },
  components: {
    qselector: QuantitySelector,
    dropdown: DropDown,
    summarycart: Summary,
  },

}
</script>

<style lang="css" scoped>
.delivery-des{
  font-size: 12px;
  color: #C2C2C2;
  margin-right: 5px;
}
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

  .modal-content {
    width: 20em !important; /* Could be more or less, depending on screen size */
    transition: width 1s;
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
.label-input{
  font-weight: bold;
  color: #686868;
  font-size: 1em;
}
.add-address-btn{
  /* font-size: 2em; */
  font-weight: bold;
  border: 0;
  background-color: inherit;
  color:#6D8D98;
  position: absolute;
  top: 75%;
  left: 2%;
}
.add-address-btn{
  font-size: 0.8em ;
  padding-left: 1em;
}
/* The Modal (background) */
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 2; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4) ; /* Black w/ opacity */

}
/* Modal Content/Box */
.modal-content {
  border-radius: 20px;
  margin: 0;
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 2px solid #888;
  width: 30em; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.close-icon{
  position: absolute;
  top:  -5%;
  right:-5%;
  font-size: 2em;
  color: #3B3B3B;
}
.profile-input {
  border: 0;
  border-radius: 0;
  background-color: #f7f7f7 !important;
  text-indent: 10px;
}
.label-input{
  color: #787878;
  font-size: 1.1em;
}
.input-lg{
  height: 3.8em;
}
.textarea{
  background-color: #f7f7f7;
  border: 0;
  resize: none;
}
</style>
