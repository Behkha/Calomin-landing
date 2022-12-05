<template lang="html">
  <div class="container-fliud my-5 " >
    <div class="row px-5 text-center">
      <div class="col col-2-5  drawer-container ">
        <drawer></drawer>
      </div>
      <div class="col col-9-5 outer-page-container" >
        <div class="page-container p-5 ">
          <div class="row">
            <div class="col-12 my-2 mx-auto" style="max-width:500px">
              <label for="send-invitation" class="label-input" >کد سفارش را وارد کنید</label>
              <input v-model="order_code" id="name" class=" profile-input input-lg w-100" type="text" name="button" @click="getOrder()"></input>
              <div class="text-center my-5">
                <button type="button" name="button" class="btn special-pink rounded-pill py-1 px-4" @click="getOrder()">پیگیری سفارش</button>
              </div>
            </div>
            <div v-if="order"  class="ml-auto  col-12">
              <h6 v-if="(order.status_code ==1)">سفارش شما نامعلوم است</h6>
              <h6 v-if="(order.status_code ==4)">سفارش شما رد شده است</h6>
              <timeline v-if="(order.status_code !=1 && order.status_code !=4)" class=" w-100" :status="order.status_code"></timeline>
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
export default {
  data: () => ({
    order_code: null,
    order: null
  }),
  methods: {
    getOrder() {
      this.$store.dispatch('getOrderByCodeRequest', {
        code: this.order_code
      }).
      then(response => {
        this.order = response.data.data
      })
    }
  },
  components: {
    drawer: Drawer,
    dropdown: DropDown,
    timeline: TimeLine
  },
  mounted() {
    this.$store.dispatch("afterLoad");

  }
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
    font-size: 0.7em !important;
    color: #191919;
    transition: font-size 0.5s;
  }
  .table-sub{
    font-size: 0.6em !important;
    color: #7F7F7F;
    transition: font-size 1s;
  }
  .p-5{
    padding: 1em !important;
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
  height: 40em;
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
  height: 12em !important;
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



</style>
