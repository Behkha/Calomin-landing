
<template lang="html">

  <div class="card product-card text-center p-2   " @click="routeToBoothPage()">
    <div class="row justify-between">
      <div class="col-6  ">
<!-- <a class="card-icon ml-auto float-right "><i class="fas fa-user-plus"></i></a> -->
      </div>
      <div class="col-6 ">
        <!-- <a class="card-icon ml-auto float-left "><i class="far fa-heart "></i></a> -->
      </div>
    </div>
    <img class=" rounded-circle  d-block mx-auto card-img card-img-top" :src="item.profile_picture" alt="Card image cap">
    <div class="card-body position-relative">
      <h6 class="card-title m-0 font-weight-bold">{{item.name}}</h6>
      <span class=" d-block card-text text-muted light-weight-text">{{item.state.name}}, {{item.city}}</span>
      <p class=" card-des c d-block " > {{item.story}} </p>
    </div>
    <div class="mx-auto">
      <button  type="button" class="  px-4 seller-btn btn btn-outline-info rounded-pill">مشاهده پروفایل فروشنده</button>
    </div>
</div>

</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    routeToBoothPage() {

      this.$router.push({
        name: 'SellerPage',
        params: {
          id: this.item.id
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
.card-img{
  width: 10em;
  height:10em;
}
.card-des{
  display: block;
  max-height: 7.5em;
  overflow: hidden;
  color: #8B8B8B;
  /* white-space: nowrap; */
  /* text-overflow: ellipsis; */
  font-size: 0.8em;
  line-height: 1.5em;
}
.product-card{
  height: 25em;
  border-radius: 0.8em;
  cursor: pointer;
}
.product-card:hover{
  box-shadow:1px 1px 8px  #fd446d !important ;

}
.product-card img{

  border-radius: 20px;
}
.card-text{
  font-size: 13px;
}
.card-title{
  color:#000;
}
.seller-btn{
  border: 1.2px solid;
  font-size: 15px;
  padding-top: 2px !important;
  padding-bottom:  2px !important;
}
.booth-btn{
border: 1.2px solid;
font-size: 0.9em;
padding-top: 2px !important;
padding-bottom:  2px !important;
}
.booth-btn:hover{
background-color: #fd446d;
}
.card-icon{
  font-size:  25px;
  font-weight: bold;
  color: #cccccc;
}
.card-icon:hover{
  color: #fd446d;
}
.text-price{
  color: #fd446d;

}
.last_price::after{
  content: '';
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-top: -15px;
  background-color: #ccc;
  color: #ccc;
  height:1.5px;

}
.buy-btn:hover{
  background-color: #fd446d;
}
</style>
<style src="../icons/css/all.css"></style>
