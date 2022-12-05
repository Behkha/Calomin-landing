<template lang="html">
  <div @click.self="routeToProdutPage()" class="card product-card text-center p-2  " v-bind:class="{'product-card-sm': (size =='sm')}" >
    <div class="row justify-between" @click.self="routeToProdutPage()">
      <div class="col-6  " >
        <!-- <a class="card-icon ml-auto float-right " ><i class=" fas fa-share-alt" v-bind:class="{'card-icon-sm':(size =='sm')}"></i></a> -->
        <a class="card-icon ml-auto float-right " @click="addToBookmark()"><i class="far fa-heart" v-bind:class="{card_icon_hover: item.is_bookmarked,'card-icon-sm':(size =='sm')}"></i></a>
      </div>
      <div class="col-6 " @click.self="routeToProdutPage()">
      </div>
    </div>
    <div @click.self="routeToProdutPage()"  class="card-body py-0" >
      <img @click.self="routeToProdutPage()" v-if="item.gallery"  class="  d-block mx-auto   card-img" :src="item.gallery[0]" v-bind:class="{'card-img-sm': (size =='sm')}" >
      <h6 @click.self="routeToProdutPage()"  class="card-title  font-weight-bold mt-2 " v-bind:class="{'card-title-sm': (size =='sm')}">{{item.title}}</h6>
      <!-- <p  @click.self="routeToProdutPage()" class="card-text text-muted light-weight-text " v-bind:class="{'card-text-sm': (size =='sm')}" >غرفه {{item.booth.title}}</p> -->
      <button @click="addToCart()"  type="button" class=" px-4 buy-btn btn btn-outline-info rounded-pill" v-bind:class="{'buy-btn-sm': (size =='sm')}">افزودن به سبد خرید</button>
      <div style="height:1em;">
      <span @click.self="routeToProdutPage()" v-if="item.price_after_discount" class=" d-block card-text text-muted light-weight-text last_price ">  {{item.price | toCurrency}} تومان </span>
    </div>
      <h5 @click.self="routeToProdutPage()" v-if="item.price_after_discount" class="mt-2 text-price" v-bind:class="{'text-price-sm': (size =='sm')}">{{item.price_after_discount | toCurrency}} تومان </h5>
      <h5 @click.self="routeToProdutPage()" v-if="!item.price_after_discount" class="mt-2 text-price" v-bind:class="{'text-price-sm': (size =='sm')}">{{item.price | toCurrency}} تومان </h5>
    </div>
    <div id="snackbar" :class="{'show-snack': show_snack}">ابتدا وارد سایت شوید</div>

</div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    size: {

    }
  },
  data: () => ({
    show_snack: false
  }),
  methods: {

    routeToProdutPage() {
      window.open(`/product/show/${this.item.id}`, "_self");
    },
    addToCart() {
      this.$store.dispatch('addToCartRequest', {
        product_id: this.item.id,
        quantity: this.item.cart_quantity
      }).then(response => {

        this.$router.push({
          path: '/cart'
        })
      }).catch(error => {
        this.$router.push({
          path: '/cart'
        })
      })
    },
    showSnack() {
      this.show_snack = true
      setTimeout(() => {
        this.show_snack = false;
      }, 3000)
    },
    addToBookmark() {
      if (!this.item.is_bookmarked) {
        this.$store.dispatch('addToBookmarkRequest', {
          product_id: this.item.id,
        }).
        then(response => {
          this.item.is_bookmarked = true;
        }).catch(error => {
          if (error.response.status == 401)
            this.showSnack()
        })
      } else if (this.item.is_bookmarked) {
        this.$store.dispatch('removeFromBookmarkRequest', {
          product_id: this.item.id,
        }).
        then(response => {
          this.item.is_bookmarked = false;
        }).catch(error => {
          if (error.response.status == 401)
            this.showSnack()
        })
      }
    },
  },
  mounted() {
    this.item.cart_quantity = 1;
  }
}
</script>

<style lang="css" scoped>
.card-img{
width: 10em ;
height: 10em ;
}
.card-img-sm{
  width: 6em ;
  height: 6em ;
}

.product-card{
  /* width:280px; */
  /* height: 23em; */
  border-radius: 10px;
}
.product-card-sm{
  height: 17em !important;
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
.card-body{
  cursor: pointer;
}
.card-text{
  font-size: 13px;
}
.card-text-sm{
  font-size: 0.7em ;

}
.card-title{
  color:#000;
}
.card-title-sm{
  font-size: 0.8em ;
}
.buy-btn{
  border: 1.2px solid;
  font-size: 0.9em;
  padding-top: 2px !important;
  padding-bottom:  2px !important;
}
.buy-btn-sm{
  border: 1.2px solid;
  font-size: 0.5em;
  padding: 2px 0.8em !important;
}
.buy-btn:hover{
  background-color: #fd446d;
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
.text-price-sm{
  font-size: 0.7em;
}
.last_price{
  line-height: 25px;
  font-size: 15px;
}
.last_price::after{
  content: '';
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-top: -13px;
  background-color: #aaa;
  height:1.5px;

}
@media (max-width:48em) {
  .buy-btn-sm{
    font-size: 0.4em !important;
    padding: 2px 0.5em !important;
  }
  .text-price-sm{
    font-size: 0.7em !important;
  }
  .text-price-sm{
    font-size: 0.7em !important;
  }
  .product-card-sm{
    height: 15em !important;
  }
  .card-text-sm{
    font-size: 0.6em  !important;

  }
  .card-title-sm{
    font-size: 0.6em  !important;
  }
  .card-img-sm{
    width: 3.5em;
    height: 3.5em;
  }
}
.card-icon-sm{
  font-size: 0.8em !important;
}
</style>
<style src="../icons/css/all.css"></style>
