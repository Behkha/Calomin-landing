<template lang="html">
  <div class="container-fluid  pb-5 px-4" style="max-width: 1400px; min-height: 100vh;  " >
    <div class="row ">
      <div class="col-12 my-5 p-0 ">
        <span class="g-line-cart"></span>
        <button class=" btn btn-sm  title-button  d-block mx-auto  rounded-pill " style="margin-top:-25px"  >پیش فاکتور</button>
      </div>
      <div class="col-7-5 my-4 ">
        <!-- <div class="col-12" v-if="invoice"> -->
          <div class="modal-container">
              <div class="modal-content  " id="section-to-print">
                <div class="invoice-header p-4">
                   <div class="row  text-right">
                     <div v-if="invoice.address" class="invoice-item-h col-md-4 col-6 my-2">تحویل گیرنده:<span class="invoice-item-s pr-1">{{invoice.address.receiver_name}}</span></div>
                     <div class="invoice-item-h col-md-4 col-6 my-2 invoice-item-h-center">تاریخ سفارش:<span class="invoice-item-s pr-2">{{invoice.created_at}}</span></div>
                     <div class="invoice-item-h col-md-4 col-6 my-2 f"><p >شماره تماس:<span class="invoice-item-s pr-2">{{invoice.address.receiver_phone}}</span></p></div>
                     <div class="invoice-item-h  col-6 my-2">نشانی:<span class="invoice-item-s pr-2">{{invoice.address.state.name}}، {{invoice.address.city.name}}، {{invoice.address.address}}</span></div>
                     <div class="invoice-item-h  col-6  my-2"><p >کد پستی: <span class="invoice-item-s pr-2">{{invoice.address.zipcode}}</span></p></div>
                 </div>
               </div>
               <div class="invoice-body my-4">
                 <div v-for="product in invoice.products" class="invoice-order-card d-flex justify-content-between pb-3 my-3 mx-auto">
                   <div class="invoice-item-h " v-if="product.gallery"><img :src="product.gallery[0]" alt="" class="invoice-order-img"></div>
                   <div class="row my-auto w-100 text-right mr-2">
                     <h5 class="invoice-product-title col-md-3  col-6">{{product.title}}</h5>
                     <!-- show price for mobile  -->
                     <div class=" invoice-price invoice-price-sm special-green col-md-3 col-6">
                       تومان {{product.price | toCurrency}}
                     </div>
                     <div class="  invoice-item-s col-md-3  col-6"> برند : {{product.brand.title}}</div>
                     <div class=" invoice-item-s col-md-3  col-6"> تعداد: {{product.order_qty}}</div>
                     <div class=" invoice-price invoice-price-md special-green col-md-3 col-6">
                       تومان {{product.price | toCurrency}}
                     </div>
                   </div>
                  </div>
               </div>
               <div class="payment-sec">
                 <div class="row mx-auto" style="max-width: 400px">
                   <div class="col-12 mx-auto">
                     <div class="d-flex justify-content-between my-3">
                       <span class="float-right invoice-pay-h">جمع کل:</span>
                       <span class="float-left  invoice-pay-s ">{{invoice.price_before_discount | toCurrency}} تومان</span>
                     </div>
                     <div class="d-flex justify-content-between my-3">
                       <span class="float-right invoice-pay-h">میزان تخفیف و جوایز:</span>
                       <span class="float-left  invoice-pay-s">{{invoice.total_bonus + invoice.total_discount | toCurrency}} تومان</span>
                     </div>
                     <div class="d-flex justify-content-between my-3">
                       <span class="float-right invoice-pay-h">هزینه ارسال :</span>
                       <span class="float-left  invoice-pay-s">{{invoice.delivery_method.price | toCurrency}} تومان</span>
                     </div>
                     <!-- <div class="d-flex justify-content-between my-3">
                     <span class="float-right invoice-pay-h">جمع کل با حساب جایزه :</span>
                     <span class="float-left  special-green h4">{{invoice.price + invoice.delivery_method.price}}تومان</span>
                   </div> -->
                   <div class="d-flex justify-content-between my-3">
                     <span class="float-right invoice-pay-h">قابل پرداخت:</span>
                     <span class="float-left  font-weight-bold special-green h5">{{invoice.price + invoice.delivery_method.price | toCurrency}} تومان</span>
                   </div>
                 </div>
               </div>
             </div>
             </div>
          </div>
        <!-- </div> -->
      </div>
    <!-- summary cart -->
      <div class="col-2-5 my-4 ">
        <pre-invoice-summary v-if="invoice"   :item ="invoice" ></pre-invoice-summary>
      </div>
    </div>
    <div id="snackbar" :class="{'show-snack': show_snack}">{{snack_des}}</div>
  </div>
</template>

<script>
import PreInvoiceSummary from './PreInvoiceSummary'
export default {
  data: () => ({
    invoice: null,
  }),
  methods: {
    getOrderValues() {
      this.$store.dispatch('getOrderValuesRequest', {
        id: this.$route.params.id
      }).
      then(response => {
        this.invoice = response.data.data
        this.$store.dispatch('afterLoad')

      })
    },
  },
  components: {
    'pre-invoice-summary': PreInvoiceSummary
  },
  mounted() {
    this.getOrderValues()
  }
}
</script>

<style lang="css" scoped>
.payment-sec{
  background-color: #fcfcfc;
}
.modal-container{
  padding-left: 4em;
}
.g-line-cart {
display: block;
width: 100%;
height: 1.5px;
background-image: linear-gradient(to right, #C4C4C4, rgb(245, 245, 245), #C3C3C3);
}
/* The Modal (background) */
.modal {
display: block; /* Hidden by default */
width: 100%; /* Full width */
height: 100%; /* Full height */
overflow: auto; /* Enable scroll if needed */
background-color: rgb(0,0,0); /* Fallback color */
background-color: rgba(0,0,0,0.4) ; /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
border-radius: 20px;
background-color: #fefefe;
/* padding: 20px; */
border: 1px solid #C0BDBE;
/* width: 45em;  */
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
.invoice-header{
border-top-left-radius: 20px;
border-top-right-radius: 20px;
background-color:#fafafa !important;
}
.invoice-body{
/* background-color: #fff; */
padding: 0 5em;
}
.invoice-item-h{
color: #191919;
/* font-size: ; */
font-weight: bold;
}
.invoice-item-h p{
  float: left ;
}
.invoice-item-h-center{
    text-align: center;
}
.invoice-product-title{
color: #191919;
font-size: 1em;
font-weight: bold;
}
.invoice-item-s{
color: #7D7D7D ;
font-size: 14px;
font-weight: lighter ;
}
.invoice-order-img{
width: 5em;
height: 5em;
border-radius: 20px;
}
.invoice-price{

font-weight: bold;
}
.invoice-order-card{
max-width: 700px;
border-bottom: 1.5px solid #efefef;
}
.invoice-pay-h{
color: #929292;
font-size: 1em;
}
.invoice-pay-s{
color: #747474;
font-size: 1em;
}
.special-green{
color: #52CA87;
}
.invoice-price-sm{
display: none;
}
@media (max-width:48em) {
  .p-4{
    padding: 0 15px !important;
  }
  .h5{
    font-size: 0.9em;
  }
/* .modal-content{
width: 22em !important;
transition: width 1s;
} */
.invoice-item-h-center{
    text-align:inherit;
}
.invoice-price{
font-size: 0.8em;
font-weight: bold;
}
.invoice-price-md{
display: none;
}

.invoice-price-sm{
display: inherit;
}
.h4{
font-size: inherit;
}
.container{
margin: 0 !important;
padding: 0 !important
}
.invoice-pay-h{
font-size: 0.6em !important;
}
.invoice-header{
border-radius: 20px;
background-color:#fafafa !important;
}
.invoice-pay-s{
color: #747474;
font-size: 0.6em !important;
}
.invoice-body{
/* background-color: #fff; */
padding: 0 1em !important;
}
.invoice-item-h{
font-size: 0.5em;
}
.invoice-item-h p{
  float: none ;
}
.invoice-item-s{
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
.invoice-product-title{
float: right;
}
}
.col-2-5{
  -ms-flex: 0 0 25%;
  -webkit-box-flex: 0;
  flex: 0 0 25%;
  max-width: 25%;
}
.col-7-5{
  -ms-flex: 0 75% !important;
  -webkit-box-flex: 0;
  flex: 0 75% !important;
  max-width: 75% !important;
}
@media (max-width:1017px) {
  .modal-container{
    padding-left: 0;
  }
  .modal-content{
    border-radius: 10px;
  }
  .col-7-5{
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
}
</style>
