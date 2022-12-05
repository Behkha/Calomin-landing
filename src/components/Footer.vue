<template lang="html">
  <div class="text-center w-100  outer-container " style="background-color:#F2F2F2; position:relative; z-index:1">
    <div class="py-5 footermenu container ">
      <!-- <div class="col-1">
      </div> -->
      <!-- <div class="col-12"> -->
        <div class="row ">
          <div class="col-lg-4 col-xl-3 col-6  text-right list-container">
            <h5>راهنمای خرید</h5>
            <ul class="text-right pr-2">
              <li>نحوه ثبت سفارش</li>
              <li>رویه ارسال سفارش</li>
              <li>شیوه های پرداخت</li>
            </ul>
          </div>
          <div class="col-lg-4 col-xl-3 col-6  text-right list-container">
            <h5>ارتباط با ما</h5>
            <ul class="text-right pr-2">
              <li>درباره ما</li>
              <li><a href="/contactus">تماس با ما</a></li>
              <li>پرسش متداول</li>
            </ul>
          </div>
          <div class="col-lg-4 col-xl-3 col-6  text-right list-container">
            <h5>شبکه های اجتماعی</h5>
            <ul class="text-right pr-2">
              <li>تلگرام</li>
              <li>فیسبوک</li>
              <li>اینستاگرام</li>
            </ul>
          </div>
        </div>
      <!-- </div> -->
      <!-- <div class="offset-3">
      </div> -->
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="css" scoped>
.outer-container{
  -webkit-box-shadow: 5px -2px 9px 3px rgba(0,0,0,0.47);
box-shadow: 5px -2px 9px 3px rgba(0,0,0,0.47);

  overflow-x: hidden;
}
li{
  list-style: none;
  font-size: 18px;
  color: #6f6f6f
}
h5{
  margin-bottom: 20px;
  color: black;
}
a{
  text-decoration: none;
  color: inherit;
}
.list-container{
  margin: 0 auto;
}
@media (max-width: 996px) {
  .list-container{
    margin: 0 ;
  }
}
@media (max-width:48em) {
  h5{
    font-size: 0.8em;
    margin-bottom: 0;
  }
  li{
    font-size: 0.7em;
    margin:0;
  }
  ul{
    line-height: 1em;
    margin-top: 0.3em;
    padding-right:  0.6em ;
  }

}
</style>
