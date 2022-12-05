<template lang="html">
  <div class="container">
    <div class="outer-container">
      <div class="inner-container mx-auto">
        <div class="pb-5">
        <img src="../images/fail.jpg" alt="success_payment" class="payment-img" >
        <div class="payment_des">
          <h3 class="text-light ">پرداخت انجام نشد !</h3>
          <p class="status-des">متاسفانه در فرآیند پرداخت مشکلی پیش آمده</p>
        </div>
      </div>
        <div class="track clearfix p-3 mx-2">
          <span class="float-right h5 my-auto">کد پیگیری پرداخت :</span>
          <span class="float-left pureblack font-weight-bold h5 my-auto">{{track_code}}</span>
        </div>
        <div class="m-4">
          <p class="text-center massage">در صورت کسر وجه تا 72 ساعت به حساب شما برگشت داده خواهد شد</p>
          <button   type="button" class="py-1 px-4 my-3 float-right p-btn btn btn-outline-info rounded-pill ">تلاش مجدد</button>
          <router-link :to="{path:'/'}"   type="button" class="py-1 px-4 my-3 float-left p-btn btn btn-outline-info rounded-pill ">بازگشت به سایت</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    track_code: ''
  }),
  mounted() {
    this.track_code = this.$route.query.order
  }
}
</script>

<style lang="css" scoped>
  .outer-container{
    margin-top: 10em;
    height: 100vh;
  }

  .inner-container{
    background-color: white;
    border-radius: 15px;
    border: 2px solid #D9D9D9;
    width: 30em;
    padding: 0;
    overflow: hidden;
  }

  .payment-img{
    display: block;
    width: 100%;
    height: 17em;
    border-bottom-left-radius: 35%;
    border-bottom-right-radius: 35%;
  }
  .payment_des{
    margin-top: -7em
  }
  .status-des{
    color: #984242;
    font-size: 1.2em;
  }
  .track{
    background-color: #F3F3F3;
    margin: 2em 1em;
  }
  .massage{
    color: #A5A5A5;
    font-size: 1.2em;
  }
  .p-btn{
    border: 1.2px solid;
    font-size: 0.9em;
  }
  .p-btn:hover{
    background-color: #fd446d;
  }
  @media (max-width: 48em) {
    .inner-container{
      width: 20em;
    }
    .status-des{
      font-size: 0.9em;
    }
    .p-btn{
      font-size: 0.6em;
      padding: 1em;
    }
    .massage{
      font-size: 0.9em;
    }
    .h5{
      font-size: 1em !important;
    }
    .payment-img{
      height: 13em;
    }
  }
</style>
