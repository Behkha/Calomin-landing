<template lang="html">
  <div class="">
  <div class="rounded-pill selector-container ">
    <span class="  plus-container" @click="increaseNmber()"><i class="plus fas fa-plus"></i></span>
    <input type="number" v-model="item.cart_qty" @keyup="changeQuantity"  class="quantity-number text-center">
    <span class="  minus-container" @click="reduseNmber()"><i class="minus fas fa-minus"></i></span>
  </div>
  <span v-if="show_warn2" class="text-danger  small d-block"> مورد قبول نیست</span>
  <span v-if="show_warn1" class="text-danger  small d-block"> از موجودی بیشتر است</span>
</div>
</template>
<script>
import lodash from 'lodash'

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
      if (this.item.details.quantity > this.item.cart_qty) {
        this.item.cart_qty++;
      }
      this.$emit('changeQuantity', this.item.cart_qty)
    },
    reduseNmber() {
      if (this.item.cart_qty > 1) {

        this.item.cart_qty--;
      }
      this.$emit('changeQuantity', this.item.cart_qty)

    },
    changeQuantity() {
      if (this.item.cart_qty > this.item.quantity) {
        this.item.cart_qty = this.item.quantity
        this.show_warn1 = true
        this.$emit('changeQuantity', this.item.cart_qty)
        setTimeout(() => {
          this.show_warn1 = false
        }, 2000)
      } else if (this.item.cart_qty < 1 && this.item.cart_qty) {
        this.item.cart_qty = 1;
        this.show_warn2 = true
        this.$emit('changeQuantity', this.item.cart_qty)
        setTimeout(() => {
          this.show_warn2 = false
        }, 2000)
      } else
        this.$emit('changeQuantity', this.item.cart_qty)
    }
  }
}
</script>

<style lang="css" scoped>
.selector-container{
  padding: 1px;
  display: inline-block;
  border: 1.2px solid #959595;
  height: 25px;
  /* width:105px; */
}
.plus-container{
  position: relative;
  top: -4.5px;
  right: 0.5px;
  display: inline-block;;
  width: 20px;
  height:20px;
  margin-top: -100px;
  border-radius: 100%;
  background-color: #e3e3e3;
}
.minus-container{
  position: relative;
  top: -5px;
  left: 0.5px;
  display: inline-block;;
  width: 20px;
  height:20px;
  margin-top: -100px;
  border-radius: 100%;
  background-color: #e3e3e3;
}
.plus{
  display: block;
  margin-top: 6.5px;;
  font-size: 8px;
  /* margin-right: 0.5px; */
  /* margin-top: 2em !important; */
  /* vertical-align: bottom; */
  transition: color 1s;
  color: black;

}
.minus{
  display: block;
  margin-top: 8px;
  font-size: 6px;
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
  position: relative;
  top: -2px;
  margin: 0 10px 0 10px;
}
.quantity-number{
  background-color: inherit;
  border: 0;
  display: inline-block;
  width: 30px;
  height: 20px;
  position: relative;
  font-weight: bold;
  top: -3px;
  left: 4px;
  /* margin: 0 20px 0 20px; */
}
</style>
