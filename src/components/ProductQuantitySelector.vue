<template lang="html">
  <div class="rounded-pill selector-container text-center">
    <span class="  plus-container float-right" @click="increaseNmber()"><i class="plus fas fa-plus"></i></span>

    <input type="number" v-model="quantity" @keyup="changeQuantity"  class="quantity-number text-center">
    <span class="  minus-container float-left" @click="reduseNmber()"><i class="minus fas fa-minus"></i></span>
    <span v-if="show_warn2" class="text-danger mt-2 small d-block"> مورد قبول نیست</span>
    <span v-if="show_warn1" class="text-danger mt-2 small d-block"> از موجودی بیشتر است</span>
  </div>
</template>


<script>
export default {
  props: {
    item: {

    }
  },
  data: () => ({
    quantity: 1,
    show_warn1: false,
    show_warn2: false
  }),
  methods: {
    increaseNmber() {
      if (this.item.quantity > this.item.cart_quantity) {
        this.item.cart_quantity++;
        this.quantity++;
      }
      this.$emit('changeQuantity', this.item.cart_quantity)
    },
    reduseNmber() {
      if (this.item.cart_quantity > 1) {
        this.item.cart_quantity--;
        this.quantity--;
      }

      this.$emit('changeQuantity', this.item.cart_quantity)
    },
    changeQuantity() {
      if (this.quantity > this.item.quantity) {
        this.quantity = this.item.quantity
        this.item.cart_quantity = this.quantity
        this.show_warn1 = true
        setTimeout(() => {
          this.show_warn1 = false
        }, 2000)
      } else if (this.quantity < 1 && this.quantity) {
        this.quantity = 1;
        this.item.cart_quantity = this.quantity
        this.show_warn2 = true
        setTimeout(() => {
          this.show_warn2 = false
        }, 2000)
      } else {
        this.item.cart_quantity = this.quantity
      }
    }
  },
}
</script>

<style lang="css" scoped>
.selector-container{
  padding: 1px;
  display: inline-block;
  border: 1.5px solid #959595;
  height: 40px;
  width: 100%;
  max-width: 150px !important;
}
.plus-container{
  position: relative;
  /* top: 3px; */
  right: 0.5px;
  display: inline-block;;
  width: 35px;
  height:35px;
  /* margin-top: -100px; */
  border-radius: 100%;
  background-color: #e3e3e3;
}
.minus-container{
  position: relative;
  /* top: 3px; */
  right: -1.5px;
  display: inline-block;;
  width: 35px;
  height:35px;
  /* margin-top: -100px; */
  border-radius: 100%;
  background-color: #e3e3e3;
}
.plus{
  display: block;
  margin-top: 11px;
  font-size: 10px;
  transition: color 1s;
  color: black;
}
.minus{
  display: block;
  margin-top: 11px;
  font-size: 10px;
  transition: color 1s;
  color: black;

}
.minus-container:hover i{
  color: white;

}
.plus-container:hover i{
  color: white;

}
.minus-container:hover{
  background-color: #ED476F;
  transition: background-color 1s;

}
.plus-container:hover{
  background-color: #7DD3E9;
  transition: background-color 1s;

}
.quantity-number{
  background-color: #F2F2F2;
  border: 0;
  display: inline-block;
  width: 30px;
  position: relative;
  font-weight: bold;
  top: 3px;
  left: 4px;
  /* margin: 0 20px 0 20px; */
}

</style>
