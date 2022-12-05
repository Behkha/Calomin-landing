<template lang="html">
  <div id="myModal" class="modal" v-show="dialog">

    <div class="modal-content">
      <i @click="cancelDialog(k)" class="close-icon far fa-times-circle"></i>

     <div class="row">
       <div class="col-12 my-2">
         <label class="label-input" >استان</label>
         <dropdown class="profile-input btn-lg" @changeSeleted="changeState" :items="states" :selected="states"></dropdown>
       </div>
       <div class="col-12 my-2">
         <label class="label-input" >شهر</label>
         <dropdown class="profile-input btn-lg" @changeSeleted="changeCity" :items="cities" :selected="cities"></dropdown>
       </div>
       <div class="col-12 my-2">
         <label for="cod-post" class="label-input">کد پستی</label>
         <input v-model="profile.name" id="cod-post" class=" profile-input input-lg w-100" type="text" name="button"></input>
       </div>
       <div class="col-12 my-2">
         <label for="phone" class="label-input" >تلفن تماس</label>
         <input v-model="profile.username" id="phone" class=" profile-input input-lg w-100" type="text" name="button"></input>
       </div>
       <div class="col-12 my-2">
         <label for="address" class="label-input" >آدرس دقیق</label>
         <textarea id="address" class="w-100 textarea" name="about-me" rows="4"   ></textarea>
       </div>
       <button @click="addAddress()" type="button" name="button" class="mx-auto btn special-pink rounded-pill mt-3 py-1 px-4">افزودن آدرس</button>
     </div>
   </div>
 </div>
</template>

<script>
import DropDown from './DropDown'
export default {
  props: {
    dialog: {
      required: true,
      type: Boolean
    }
  },
  methods: {
    showDialog() {
      this.dialog = true
    },
    cancelDialog() {
      this.dialog = false
    },
    addAddress() {

    }
  },
  components: {
    dropdown: DropDown
  },
  mounted() {
    alert(this.dialog)
  }
}
</script>

<style lang="css" scoped>
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
/* Modal Content/Box */
.modal-content {
  margin: 0;
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 30em; /* Could be more or less, depending on screen size */
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
}
</style>
