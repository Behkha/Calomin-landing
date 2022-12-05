<template lang="html">
  <div class="container-fliud my-5 " >
    <div class="row">
      <!-- Trigger/Open The Modal -->
  <!-- The Modal -->
     <div id="myModal" class="modal" v-show="dialog">

       <div class="modal-content">
         <i @click="cancelDialog()" class="close-icon far fa-times-circle"></i>
        <div class="row">
          <div class="col-12 my-2">
            <label class="label-input" >استان</label>
            <dropdown class="profile-input btn-lg" @changeSeleted="changeAddressState" placeholder="استان مورد نظر را انتخاب کنید" :items="states" :selected="address.state"></dropdown>
          </div>
          <div class="col-12 my-2">
            <label class="label-input" >شهر</label>
            <dropdown class="profile-input btn-lg" @changeSeleted="changeAddressCity" placeholder="شهر مورد نظر را انتخاب کنید" :items="address_cities" :selected="address.city"></dropdown>
          </div>
          <div class="col-12 my-2">
            <label for="post_id" class="label-input">کد پستی</label>
            <input v-model="address.zipcode"  id="post_id" class=" profile-input input-lg w-100" type="number" name="button"></input>
          </div>
          <div class="col-12 my-2">
            <label for="phone" class="label-input" >تلفن تماس</label>
            <input v-model="address.phone_number"  id="phone" class=" profile-input input-lg w-100" type="number" name="button"></input>
          </div>
          <div class="col-12 my-2">
            <label for="address" class="label-input" >آدرس دقیق</label>
            <textarea v-model="address.address" id="address" class="w-100 textarea" name="about-me" rows="4"   ></textarea>
          </div>
          <button @click="createAddress()" type="button" name="button" class=" common-buttons mx-auto btn special-pink rounded-pill mt-3 py-1 px-4">افزودن آدرس</button>
        </div>
      </div>
    </div>

    <!-- /////////////////// -->

  </div>
    <div class="row px-5 text-center">
      <div class="col col-2-5  drawer-container ">
        <drawer  ></drawer>
      </div>
      <div class="col col-9-5 outer-page-container" >
        <div class="page-container p-5 text-right clearfix">
          <div class="row">
            <div class="col-lg-6 col-sm-12 my-2">
              <label for="name" class="label-input">نام و نام خانوادگی</label>
              <input v-model="profile.name" id="name" class=" profile-input input-lg w-100" type="text" name="button"></input>
            </div>
            <div class="col-lg-6 col-sm-12 my-2">
              <label for="username" class="label-input" >نام کاربری</label>
              <input v-model="profile.username" id="username" class=" profile-input input-lg w-100" type="text" name="button" disabled></input>
            </div>
            <div class="col-lg-6 col-sm-12 my-2 ">
              <label class="label-input" >ایمیل</label>
              <input v-model="profile.email" class=" profile-input input-lg w-100" type="text" name="button"></input>
            </div>
            <div class="col-lg-6 col-sm-12 my-2">
              <label class="label-input" >استان</label>
              <dropdown class="profile-input btn-lg px-2" @changeSeleted="changeState" :items="states" :selected="profile.state"></dropdown>
            </div>
            <div v-if="cities && profile.state" class="col-lg-6 col-sm-12 my-2">
              <label class="label-input" >شهر</label>
              <dropdown class="profile-input btn-lg px-2" @changeSeleted="changeCity" :items="cities" :selected="profile.city"></dropdown>
            </div>
            <div class="col-12 my-2">
              <label for="address" class="label-input" >آدرس ها</label>
              <div class="form-container p-3">
                <form  id="address" action="#" style="direction:rtl;">
                  <p v-for="(address, k) in addresses" :key="k">
                    <input type="radio" :id='k' :value="k" name="radio-group" v-model="selected_address" @click="changeDeafualtAddress(address)" :checked="(address == deafualt_address)">
                    <label :for="k"> {{address.state.name}}، {{address.city.name}}، {{address.address}}</label>
                  </p>
                  <button class="add-address-btn " type="button" name="button" @click="showDialog">افزودن آدرس جدید</button>
                </form>
              </div>
            </div>
            <div  class="col-12 my-2">
              <label for="address" class="label-input" >آپلود تصویر پروفایل</label>
              <div class="mt-2">

              <input type="file" @change="onFileChanged" name="file" id="file" class="inputfile" />
              <!-- <input type="file" @change="onFileChanged"> -->
              <label for="file">{{file}}</label>
            </div>
            </div>
            <!-- <div class="col-12 mt-2 mb-5"> -->
              <!-- <label for="about-me" class="label-input" >درباره من</label> -->
              <!-- <textarea id="about-me" class="w-100 textarea" name="about-me" rows="4"  >لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.</textarea> -->
            <!-- </div> -->
          </div>
          <button @click="editProfile()" type="button" name="button" class="common-buttons btn special-pink rounded-pill float-left py-1 px-4 mt-5 text-center"> <span>ثبت تغییرات</span><i v-if="loader" class=" mr-1 fas fa-circle-notch spin " v-bind:class="{onload:loader}"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Drawer from './ProfileDrawer'
import DropDown from './DropDown'
import AddressDialog from './AddressDialog'

export default {
  data: () => ({
    loader: false,
    profile: null,
    addresses: [],
    selected_profile_picture: null,
    selected_address: 2,
    cities: [],
    states: [],
    file: 'فایل مورد نظر را انتخاب کنید',
    dialog: false,
    address: {
      city: null,
      state: null,
      zip_code: '',
      phone_number: ''
    },
    address_cities: [],

  }),
  methods: {
    onFileChanged(event) {
      // console.log(event);
      this.file = event.target.files[0].name
      this.selected_profile_picture = event.target.files[0]
      // this.file = event.target.files.name
      // console.log(event.target.file);
    },
    showDialog() {
      this.dialog = true
    },
    cancelDialog() {
      this.dialog = false
    },
    changeState(selected) {
      this.profile.state = selected;
      this.getCities();
    },
    changeCity(selected) {
      this.profile.city = selected;
    },
    changeAddressState(selected) {
      this.address.state = selected;
      this.getAddressCities();
    },
    changeAddressCity(selected) {
      this.address.city = selected;
    },
    getProfileValues() {
      this.$store.dispatch('getProfileValues').
      then(response => {
        this.profile = response.data.data
        this.profile_picture = response.data.data.profile_picture

      })
    },
    getAddresses() {
      this.$store.dispatch('getAddressesRequest').
      then(response => {
        this.addresses = response.data.data
        this.addresses.forEach((item, i) => {
          if (item.is_default)
            this.deafualt_address = item
        });

      })
    },
    changeDeafualtAddress(address) {
      this.$store.dispatch('changeDeafualtAddressReauest', address).
      then(response => {})
    },
    getCities() {
      this.$store.dispatch('getCitiesRequest', this.profile.state).
      then(response => {
        console.log(response);
        this.cities = response.data.data.cities
      })
    },
    getAddressCities() {
      this.$store.dispatch('getCitiesRequest', this.address.state).
      then(response => {
        this.address_cities = response.data.data.cities
      })
    },
    // getCities() {
    //   this.$store.dispatch('getCitiesRequest').
    //   then(response => {
    //     this.cities = response.data.data
    //   })
    // },
    getStates() {
      this.$store.dispatch('getStatesRequest').
      then(response => {
        this.states = response.data.data
        this.$store.dispatch("afterLoad");

      })
    },
    editProfile() {
      this.loader = true
      let data = {};
      if (this.profile.name) {
        data.name = this.profile.name
      }
      if (this.profile.email) {
        data.email = this.profile.email
      }
      if (this.profile.state && this.profile.city) {
        data.state_id = this.profile.state.id
        data.city_id = this.profile.city.id
      }
      data.want_notification = false;
      this.$store.dispatch('editProfileRequest', data).
      then(response => {
        // location.reload();
        this.loader = false

      })
      console.log(this.selected_profile_picture);
      if (this.selected_profile_picture) {
        let formData = new FormData();
        formData.append('profile_picture', this.selected_profile_picture)
        this.loader = true
        this.$store.dispatch('editProfilePictureRequest', formData).
        then(response => {
          this.profile_picture = response.data.data.profile_picture
          this.loader = false
        })
      }
    },
    createAddress() {
      let data = {}
      data.receiver_phone = this.address.phone_number
      data.state_id = this.address.state.id
      data.city_id = this.address.city.id
      data.address = this.address.address
      data.zipcode = this.address.zipcode
      this.$store.dispatch('createAddressRequest', data).
      then(response => {
        this.cancelDialog();
        this.getAddresses()
      })
    },
  },
  mounted() {

    this.getProfileValues();
    this.getAddresses();
    this.getStates();

  },
  components: {
    drawer: Drawer,
    dropdown: DropDown,
    addressdialog: AddressDialog
  },
}
</script>

<style lang="css" scoped>
.container-fluid{
  /* overflow-x: hidden !important; */
}
.spin {
  color: white;
  position: relative;
  top:2px;
  -webkit-animation: spin 1s linear infinite !important; /* Safari */
  animation: spin 1s linear infinite !important;
  -webkit-animation: rotate360 0.5s infinite linear, exist 0.1s forwards ease;
          animation: rotate360 0.5s infinite linear, exist 0.1s forwards ease;

}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
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
  .profile-input {
    border: 0;
    border-radius: 0;
    background-color: #f7f7f7 !important;
    text-indent: 10px;
  }
  .add-address-btn{
    font-size: 0.8em ;
    padding-left: 1em;
  }
  .input-lg{
    height: 3em !important;
  }
  .label-input{
    font-weight: bold;
    color: #787878;
    font-size: 0.8em !important;
  }
  .p-5{
    padding: 1em !important;
  }
  .modal-content {
    width: 20em !important; /* Could be more or less, depending on screen size */
    transition: width 1s;
  }
}
/* .button{
  font-size: 1em;
  position: absolute;
  bottom: 3%;
  left: 4%;
} */
.profile-input {
  border: 0;
  border-radius: 0;
  background-color: #f7f7f7 !important;
  text-indent: 10px;
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
  border-radius: 20px;
  margin: 0;
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 2px solid #888;
  width: 30em; /* Could be more or less, depending on screen size */
}
/* file uploader styles */
.inputfile {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
.inputfile + label {
    font-weight: 700;
    color: white;
    background-color: #FD446D;
    display: inline-block;
    border-radius: 10px;
    padding: 0.5em 1em;
    content:border-box;
    border: 1px solid white;
}
.inputfile + label {
	cursor: pointer; /* "hand" cursor */
}
.inputfile:focus + label,
.inputfile + label:hover {
    background-color: white;
    color: #FD446D;
    border: 1px solid #fd446d;
    transition: background-color 5s;
    transition:color 0.5s;
    transition:border 0.5s;
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
.close-icon {
  position: absolute;
  top:  -5%;
  right:-5%;
  font-size: 2em;
  color: #3B3B3B;
}

</style>
