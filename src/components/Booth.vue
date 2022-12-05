<template lang="html">
  <div class="card product-card text-center p-2   " v-bind:class="{'product-card-sm': (size =='sm')}" @click.self="routeToBoothPage()">
    <div class="row justify-between">
      <div class="col-6  ">
        <a class="card-icon ml-auto float-right " @click="addToFollow()"><i class="fas fa-user-plus" v-bind:class="{card_icon_hover: item.is_following, 'card-icon-sm':(size == 'sm')}"></i></a>
      </div>
      <!-- <div class="col-6 "> -->
        <!-- <a class="card-icon ml-auto float-left "  ><i class="far fa-heart " v-bind:class="{'card-icon-sm':(size == 'sm')}"></i></a> -->
      <!-- </div> -->
    </div>
    <div  @click="routeToBoothPage()">
      <img class="  d-block mx-auto card-img card-img-top" :src="item.logo" alt="Card image cap" v-bind:class="{'card-img-sm':(size == 'sm')}">
      <div class="card-body position-relativ">
        <h6 class="card-title m-0 font-weight-bold" v-bind:class="{'card-title-sm': (size =='sm')}">{{item.title}}</h6>
        <span class=" d-block card-text text-muted light-weight-text " v-if="item.seller" v-bind:class="{'card-text-sm': (size =='sm')}">غرفه دار : {{item.seller.name}}</span>
        <p class=" card-des c d-block " v-bind:class="{'card-des-sm': (size =='sm')}"> {{item.description}} </p>
      </div>
    <div class="mx-auto">
      <button   type="button" class="px-4 booth-btn btn btn-outline-info rounded-pill " v-bind:class="{'booth-btn-sm': (size =='sm')}">مشاهده محصولات غرفه</button>
    </div>
  </div>


  <!-- The actual snackbar -->
  <div id="snackbar" :class="{'show-snack': show_snack}">ابتدا وارد سایت شوید</div>
</div>
</template>

<script>
export default {
  data: () => ({
    show_snack: false
  }),
  props: {
    item: {
      type: Object,
      required: true
    },
    size: {}
  },
  methods: {
    showSnack() {
      this.show_snack = true
      setTimeout(() => {
        this.show_snack = false;
      }, 3000)
    },
    routeToBoothPage() {
      this.$router.push({
        name: 'BoothPage',
        params: {
          id: this.item.id
        }
      })
    },
    addToFollow() {
      if (!this.item.is_following) {
        this.$store.dispatch('addToFollowRequest', {
          booth_id: this.item.id,
        }).
        then(response => {
          this.item.is_following = true;
        }).catch(error => {
          if (error.response.status == 401)
            this.showSnack()
        })
      } else if (this.item.is_following) {
        this.$store.dispatch('removeFromFollowRequest', {
          booth_id: this.item.id,
        }).
        then(response => {
          this.item.is_following = false;
        }).catch(error => {
          if (error.response.status == 401)
            this.showSnack()
        })
      }
    },
  }
}
</script>

<style lang="css" scoped>




.card-img{
  width: 10em;
  height:10em;
}
.card-img-sm{
  width: 6em !important;
  height: 6em !important;
}

.card-des{
  display: block;
  max-height: 7.5em;
  overflow: hidden;
  color: #8B8B8B;
  font-size: 0.8em;
  line-height: 1.5em;
}
.product-card{
  height: 27.5em;
  border-radius: 0.8em;
  cursor: pointer;
}
.product-card:hover{
  box-shadow:1px 1px 8px  #fd446d !important ;
}
.product_card_hover{
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
.booth-btn{
  border: 1.2px solid;
  font-size: 15px;
  padding-top: 2px !important;
  padding-bottom:  2px !important;
}
.card-icon{
  font-size:  25px;
  font-weight: bold;
  color: #cccccc;
  cursor: pointer;
}
.card-icon:hover{
  color: #fd446d;
}
.card_icon_hover{
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
/* small styles */
.product-card-sm{
  height: 19em !important;
}
.card-text-sm{
  font-size: 11em !important;
}
.card-title-sm{
  font-size: 0.8em ;
}
.booth-btn-sm{
  border: 1.2px solid;
  font-size: 0.5em;
  margin: 0 !important;
  padding: 2px 1em !important;
}
.text-price-sm{
  font-size: 0.7em;
}
.card-des-sm{
  font-size: 0.6em;
  margin: 0 !important;
}
.card-icon-sm{
  font-size: 0.8em !important;
}
@media (max-width:48em) {
  .card-img{
    width: 60% !important;
    height:40% !important;
  }
  .product-card-sm{
    height: 15em !important;
  }
  .card-des-sm{
    font-size: 0.5em;
    margin: 0 !important;
  }
  .booth-btn-sm{
    border: 1.2px solid;
    font-size: 0.5em;
    margin: 0 !important;
    padding: 2px 1em !important;
  }
  .card-body{
    padding: 1em  !important;
  }
}

</style>
<style src="../icons/css/all.css"></style>
