<template lang="html">
  <div class="container-fliud my-5 " >
    <!-- The Modal -->
       <div v-if="dialog_order" id="myModal" class="modal" v-show="dialog">

         <div class="modal-content ">
           <i @click="cancelDialog()" class="close-icon far fa-times-circle"></i>

           <div class="dialog-header p-4 mb-5">
            <div >

              <div class="d-flex justify-content-between mb-3">
                <div class="dialog-item-h">کد سفارش:<span class="dialog-item-s pr-1">{{dialog_order.code}}</span></div>
                <div class="dialog-item-h">تاریخ سفارش:<span class="dialog-item-s pr-1">{{dialog_order.created_at}}</span></div>
                <div v-if="dialog_order.address" class="dialog-item-h">تحویل گیرنده:<span class="dialog-item-s pr-1">{{dialog_order.address.receiver_name}}</span></div>
              </div>
              <div class="dialog-item-h text-right">آدرس:<span class="dialog-item-s pr-1">{{dialog_order.address.state.name}}، {{dialog_order.address.city.name}}، {{dialog_order.address.address}}</span></div>
            </div>
          </div>
          <div class="text-center mt-3" v-if="dialog_order.remaining_time">
            <timer :time="dialog_order.remaining_time"></timer>
            <!-- <span class=" text-muted-normal" >اشتراک گذاری از طریق: </span> -->
            <button  type="button" class="px-5 py-1 common-buttons cart-btn btn special-pink rounded-pill mb-4" name="button" @click="rePay(dialog_order.id, dialog_order.payment_method)">پرداخت</button>

          </div>
          <div class="dialog-body my-4">
            <div v-if="dialog_order"  class="ml-auto  col-12">
              <h6 v-if="(dialog_order.status_code ==1)"> وضعیت سفارش شما نامعلوم است</h6>
              <h6 v-if="(dialog_order.status_code ==4)"> وضعیت سفارش شما رد شده است</h6>
              <timeline v-if="(dialog_order.status_code !=1 && dialog_order.status_code !=4)" class=" w-100" :status="dialog_order.status_code"></timeline>
            </div>
            <div v-for="product in dialog_order.products" class="dialog-order-card d-flex justify-content-between pb-3 my-3">
              <div class="dialog-item-h" v-if="product.gallery"><img :src="product.gallery[0]" alt="" class="dialog-order-img"></div>
              <div class="h-100 w-50 container">
                <h5 class="dialog-product-title">{{product.title}}</h5>
                 <div class=" float-right dialog-item-s mt-4"> تعداد: {{product.order_qty}}</div>
                 <!-- <div class=" float-left dialog-item-s mt-4">غرفه: {{product.booth.title}}</div> -->
               </div>
               <div class="mt-auto mr-auto dialog-price special-green">
                 تومان {{product.price}}
               </div>
            </div>
            <div class="d-flex justify-content-between my-3">
              <span class="float-right dialog-pay-h">جمع کل:</span>
              <span class="float-left  dialog-pay-s ">{{dialog_order.price_before_discount | toCurrency}} تومان</span>
            </div>
            <div class="d-flex justify-content-between my-3">
              <span class="float-right dialog-pay-h">میزان تخفیف:</span>
              <span class="float-left  dialog-pay-s">{{dialog_order.price_before_discount - dialog_order.price | toCurrency}} تومان</span>
            </div>
            <div class="d-flex justify-content-between my-3">
              <span class="float-right dialog-pay-h">هزینه ارسال:</span>
              <span class="float-left  dialog-pay-s">{{dialog_order.delivery_method.price | toCurrency}} تومان</span>
            </div>
            <div class="d-flex justify-content-between my-3">
              <span class="float-right dialog-pay-h">قابل پرداخت:</span>
              <span class="float-left  special-green h4">{{dialog_order.price + dialog_order.delivery_method.price | toCurrency}}تومان</span>
            </div>
            <!-- <div class="d-flex justify-content-between my-3">
              <span class="float-right dialog-pay-h">قابل پرداخت:</span>
              <span class="float-left   ">24000 تومان</span>
            </div> -->
            <div class="d-flex justify-content-between my-3">
              <span class="float-right dialog-pay-h">وضعیت سفارش:</span>
              <span class="float-left  dialog-item-h h5">{{dialog_order.status}}</span>
            </div>
          </div>
        </div>
      </div>
    <div class="row px-5 text-center">
      <div class="col col-2-5  drawer-container ">
        <drawer  ></drawer>
      </div>
      <div class="col col-9-5 outer-page-container" >
        <div class="page-container p-5 text-right">
          <div class="row">
            <div class="col-12 my-2">
              <div class="form-container p-3 table-container ">
                <table  style="width:100%">
                  <tr class="table-header text-center">
                    <th >ردیف</th>
                    <th class="ml-3">کد سفارش</th>
                    <th>تاریخ سفارش</th>
                    <th>مبلغ کل</th>
                    <th>وضعیت</th>
                    <th></th>
                  </tr>
                  <tr v-for="(order, k) in orders" class="table-sub text-center">
                    <td class="py-1">{{k+1}}</td>
                    <td class="py-1">{{order.code}}</td>
                    <td class="py-1">{{order.created_at}}</td>
                    <!-- <td class="py-1">1000000 تومان</td> -->
                    <td class="py-1">{{order.status}}</td>
                    <td><button @click="showDialog(order)" type="button"  name="button" class="detail-btn btn btn-outline-secondary py-0 rounded-pill">مشاهده جزئیات</button></td>
                  </tr>

                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Drawer from './ProfileDrawer'
import DropDown from './DropDown'
import TimeLine from './TimeLine'
import Timer from './Timer'
export default {
  data: () => ({
    profile: null,
    addresses: [],
    cities: [],
    states: [],
    dialog: false,
    orders: [],
    dialog_order: null
  }),
  methods: {
    showDialog(order) {
      this.getOrderValues(order)
      this.dialog = true
    },
    cancelDialog() {
      this.dialog = false
    },
    change(selected) {
      this.profile.state = selected;
    },
    getOrders() {
      this.$store.dispatch('getOrdersRequest').
      then(response => {
        this.orders = response.data.data
        this.$store.dispatch('afterLoad')
      })
    },
    getOrderValues(item) {
      this.$store.dispatch('getOrderValuesRequest', {
        id: item.id
      }).
      then(response => {
        this.dialog_order = response.data.data
      })
    },
    rePay(order_id) {
      this.$store.dispatch('getPaymentOrderRequest', {
        id: order_id,
      }).
      then(response => {
        window.open(response.data.data, "_blank");
      })
    },
  },

  mounted() {
    this.getOrders()
  },
  components: {
    drawer: Drawer,
    dropdown: DropDown,
    timeline: TimeLine,
    timer: Timer
  },
}
</script>

<style lang="css" scoped>
.outer-page-container{
  padding: 0 4em 0 4em;
}
@media (max-width: 48em) {
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
    font-size: 0.35em !important;
    color: #191919;
    transition: font-size 0.5s;
  }
  .table-sub{
    line-height: 5px;
    font-size: 0.2em !important;
    color: #7F7F7F;
    transition: font-size 1s;
  }
  .page-container{
    padding-left: 1em !important;
    padding-right: 1em !important;
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
.table-sub button{
  font-size: 0.8em ;
  color: #7F7F7F;
}
button:hover{
  color: white;
  transition: color 0.5s;
}
/* radio buttons css  */

html{
  font-siz:20em;
}
[type="radio"]:checked,
[type="radio"]:not(:checked) {
    display: none;
}
[type="radio"]:checked + label,
[type="radio"]:not(:checked) + label
{
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: #666;
}
[type="radio"]:checked + label:before,
[type="radio"]:not(:checked) + label:before {
    content: '';
/*     position: absolute; */
    left: 0;
    float:right;
    margin-left:10px;
    top: 0;
    width: 18px;
    height: 18px;
    border: 1.5px solid #aaa;
    border-radius: 100%;
    background: #fff;
}
[type="radio"]:checked + label:after,
[type="radio"]:not(:checked) + label:after {
    content: '';
    width: 12px;
    height: 12px;
    background: #47B8D6;
    position: absolute;
  float:right;
  /* margin-left:20px; */
    z-index:2;
    top: 3px;
    left: 0px;
    right:3px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
}
[type="radio"]:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
}
[type="radio"]:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
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
@media (max-width:48em) {
  .modal-content{
    width: 22em !important;
    transition: width 1s;
  }
  .dialog-header{
    border-radius: 20px;
    background-color:#fafafa !important;
  }
  .dialog-body{
    /* background-color: #fff; */
    padding: 0 1em !important;
  }
  .dialog-item-h{
    font-size: 0.5em;
  }
  .dialog-item-s{
    font-size: 0.6em !important;
  }
  .page-container{
    min-height: 30em;
  }
  .table-container{
    height: 20em !important;
    overflow-y: auto;
  }
  .detail-btn{
    padding: 0 5px !important;
  }
  .dialog-product-title{
    float: right;
  }
}
/* Modal Content/Box */
.modal-content {
  border-radius: 20px;
  margin: 0;
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  /* padding: 20px; */
  border: 2px solid #888;
  width: 45em; /* Could be more or less, depending on screen size */
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
  cursor: pointer;
}
.dialog-header{
  border-radius: 20px;
  background-color:#fafafa !important;
}
.dialog-body{
  /* background-color: #fff; */
  padding: 0 5em;
}
.dialog-item-h{
  color: #191919;
  font-size: ;
  font-weight: bold;
}
.dialog-product-title{
  color: #191919;
  font-size: 1em;
  font-weight: bold;
}
.dialog-item-s{
  color: #7D7D7D ;
  font-size: 14px;
  font-weight: lighter ;
}
.dialog-order-img{
  width: 5em;
  height: 5em;
  border-radius: 20px;
}
.dialog-price{

  font-weight: bold;
}
.dialog-order-card{
  border-bottom: 1.5px solid #efefef;
}
.dialog-pay-h{
  color: #929292;
  font-size: 1em;
}
.dialog-pay-s{
  color: #747474;
  font-size: 1em;
}
.special-green{
  color: #52CA87;
}
</style>
