<template lang="html">
  <div class="outer-container">
    <!-- get phone for reset password dialog -->
    <div id="myModal" class="modal" v-if="dialog1">
      <div class="modal-content">
        <i @click="cancelDialog(1)" class="close-icon far fa-times-circle"></i>
       <div class="row">
         <div class="col-12 my-2">
           <h6>بازیابی کلمه عبور</h6>
           <!-- <label for="phone" class="label-input" >تلفن تماس</label> -->
           <span class="text-muted-normal small">برای بازیابی کلمه عبور تلفن همراه خود را وراد کنید</span>
           <input v-model="reset_phone"  id="phone" class=" sign-input py-2 w-100" placeholder="********09" type="number" name="phone" @keyup.enter="sendRessetCode()"></input>
         </div>
         <button @click="sendRessetCode()" type="button" name="button" class="common-buttons mx-auto btn special-pink rounded-pill mt-3 py-1 px-5">تایید</button>
       </div>
     </div>
   </div>


   <div id="myModal" class="modal" v-if="dialog2">
     <div class="modal-content">
       <i @click="cancelDialog(2)" class="close-icon far fa-times-circle"></i>
      <div class="row">
        <div class="col-12 my-2">
          <h6>تایید شماره تلفن</h6>
          <!-- <label for="phone" class="label-input" >تلفن تماس</label> -->
          <span class="text-muted-normal small">کد 4 رقمی ارسال شده برای {{reset_phone}} را وارد کنید</span>
          <input v-model="verify_code_reset"   class="text-center sign-input py-2 w-100 verify-password-input" placeholder=" - - - - " type="number"  @keyup.enter="verifyRessetCode()"></input>
        </div>
        <button @click="verifyRessetCode()" type="button" name="button" class="common-buttons mx-auto btn special-pink rounded-pill mt-3 py-1 px-5">تایید</button>
      </div>
    </div>
  </div>

  <div id="myModal" class="modal" v-if="dialog3">
    <div class="modal-content">
      <i @click="cancelDialog(3)" class="close-icon far fa-times-circle"></i>
     <div class="row">
       <div class="col-12 my-2">
         <h6>کلمه عبور جدید</h6>
         <input v-model="reset_password"   class=" sign-input py-2 w-100 my-2" placeholder="کلمه عبور جدید" type="password"  @keyup.enter="ressetPassword()"></input>
         <input v-model="repeat_rest_password"   class=" sign-input py-2 w-100 my-2" placeholder="تکرار کله عبور جدید" type="password"  @keyup.enter="ressetPassword()"></input>

       </div>
       <button @click="resetPassworde()" type="button" name="button" class="common-buttons mx-auto btn special-pink rounded-pill mt-3 py-1 px-5">تایید</button>
     </div>
   </div>
 </div>

  <div class="container px-4 center " style="max-width: 1150px;   ">

    <div class="row shadow-sm sign-container " style="">
      <div class="col-12 col-md-8 text-center my-auto" >
        <h3>ورود</h3>
        <p class="text-muted light-weight-text my-5">یا از شماره تماس خود استفاده کنید</p>
        <div class="form-group input-group mx-auto ">
          <div class="prepend-icon input-group-text sign-input">
            <i class="  fa fa-user append-icon "></i>
          </div>
          <input  v-model="username" class=" sign-input form-control p-0" type="text" name="username" placeholder="نام کاربری یا شماره تماس خود را وارد کنید" @keyup.enter="submit()">

        </div>
        <div class="form-group input-group mx-auto " >
          <div class="prepend-icon input-group-text sign-input ">
            <i class="  fa fa-lock prepend-icon "></i>
          </div>
          <input  v-model="password" class=" sign-input form-control p-0" type="password" name="password" placeholder="کلمه عبور خود را وارد کنید" @keyup.enter="submit()">
        </div>
        <button class="link-text " @click="showDialog(1)"> رمز عبور خود را فراموش کرده اید؟</button>
        <button class="common-buttons btn  d-block mx-auto mt-4 rounded-pill px-4 special-pink"  type="submit" @click="submit()">ورود به حساب</button>
      </div>
      <div class="col-12 col-md-4 sign-img overflow-hidden center-h   ">
        <div class=" text-light mx-5 center-h-el">
          <h2  class="mb-5">سلام دوست عزیز ! </h2>
          <!-- <p  class="light-weight-text mb-5 ">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. </p> -->
          <router-link :to="{name:'SignUp'}" class="btn signout-button  d-block mx-auto  rounded-pill px-4"  >ساخت حساب</router-link>

        </div>
      </div>
    </div>
  </div>
<div id="snackbar" :class="{'show-snack': show_snack}">{{snack_des}}</div>
</div>
</template>

<script>
export default {
  data: () => ({
    show_snack: false,
    snack_des: '',
    username: null,
    password: null,
    dialog1: false,
    dialog2: false,
    dialog3: false,
    reset_phone: null,
    verify_code_reset: null,
    reset_password: '',
    repeat_rest_password: ''
  }),
  methods: {
    showSnack() {
      this.show_snack = true
      setTimeout(() => {
        this.show_snack = false;
      }, 3000)
    },
    showDialog(k) {
      if (k == 1)
        this.dialog1 = true
      else if (k == 2)
        this.dialog2 = true
      else
        this.dialog3 = true
    },
    cancelDialog(k) {
      if (k == 1)
        this.dialog1 = false
      else if (k == 2)
        this.dialog2 = false
      else
        this.dialog3 = false
    },
    sendRessetCode() {
      if (this.reset_phone) {
        let data = {
          phone: this.reset_phone
        }
        this.$store.dispatch('forgetPasswordRequest', data)
          .then(() => {
            this.cancelDialog(1)
            this.showDialog(2)
          })
      }
    },
    verifyRessetCode() {
      if (this.reset_phone && this.verify_code_reset) {
        let data = {
          phone: this.reset_phone,
          token: this.verify_code_reset
        }
        this.$store.dispatch('veriyForgetPasswordRequest', data)
          .then(() => {
            this.cancelDialog(2)
            this.showDialog(3)
          })
      }
    },
    resetPassworde() {
      if (this.reset_password == this.repeat_rest_password) {
        let data = {
          phone: this.reset_phone,
          password: this.reset_password
        }
        this.$store.dispatch('resetPasswordRequest', data)
          .then(() => {
            this.cancelDialog(3)
            this.snack_des = 'پسورد با موفقیت تغییر کرد';
            this.showSnack()
          }).catch(error => {
            if (error.response == '422') {
              this.snack_des = 'پسورد مناسب نیست';
              this.showSnack()
            } else {
              this.snack_des = 'مشکلی رخ داد';
              this.showSnack()
            }
          })
      }
    },
    submit() {
      // if (this.$refs.form.validate()) {
      this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        })
        .then(response => {
          // handle error in response  wtf!!
          // response is resolve of promise in login action
          if (response == 'failed') {
            this.snack_des = "خطایی رخ داد!"
            this.showSnack()
          } else if (response == '400') {
            this.snack_des = "نام کاربری یا کلمه عبور اشتباه است!"
            this.showSnack()
          }
          if (this.$store.getters.isLoggedIn) {
            this.$router.push({
              name: 'Profile'
            })
          }
        }).catch(error => {
          alert('ss')
        })
      // }
    }
  },
  mounted() {
    this.$store.dispatch("afterLoad");

  }
}
</script>

<style lang="css" scoped>
.outer-container{
  min-height: 100vh;
}
.sign-container{
  border-radius: 12px;
  height: 600px;
  background-color: white;
}
.outer-container{
  margin-top: 3px;
  background-color:#F2F2F2;
}
.sign-img{
  background: url(../images/pink.jpg) no-repeat top center/cover rgba(160, 217, 241, .5) ;
  border-radius: 12px 0 0 12px;
  /* height: 100%; */
}
@media (max-width: 48em) {
  .sign-img{
    background: url(../images/pink.jpg) no-repeat top center/cover rgba(160, 217, 241, .5) ;
    border-radius: 0 0 12px 12px  !important;
    /* height: 100%; */
  }
  .sign-container{
    border-radius: 12px;
    height: 700px;
    background-color: white;
  }
}
.light-weight-text{
  font-size: 12px
}
.sign-input {
  border: 0;
  /* height: 40px; */

  background-color: #F4F8F7;
}

.sign-input::placeholder {
  font-size: 12px;
  color: rgb(180, 180, 180);

}
.input-group{
  width: 300px;

}
.link-text{
  color: #6C6F73;
  font-size: 12px;
  text-decoration:none;
  font-weight: bold;
  border-bottom: .3px solid #6C6F73;
}
.signout-button{
  background-color: white;
  color:  #fd446d;
  font-weight: bold;
}
.center-h {
  position: relative;
}
.prepend-icon{
  border-top-left-radius: 0 !important;
  border-top-right-radius: 5px !important;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 5px !important;
  font-size: 1em !important;
  vertical-align: bottom;
  /* padding-left: 1.5em; */
}

.center-h .center-h-el {
  position: absolute;
  top: 50%;
  left: 6%;
  transform: translate(0%, -50%);
}
.center {
  padding: 70px 0;
  text-align: center;
}
@media (max-width: 48em) {
  .sign-img{
    background: url(../images/pink.jpg) no-repeat top center/cover rgba(160, 217, 241, .5) ;
    border-radius: 0 0 12px 12px  !important;
    /* height: 100%; */
  }
  .sign-container{
    height: 580px !important;
  }
  .my-auto{
    margin: 1em 0 1em 0 !important;
  }
  .sign-img{
    height:250px;
  }
  h2{
    font-size:1.5em;
  }
  p{
    font-size: 0.7em !important;
  }
  .input-group{
    width: 100%;

  }
}
.profile-input {
  border: 0;
  border-radius: 0;
  background-color: #f7f7f7 !important;
  text-indent: 10px;
}
.label-input{
  font-weight: bold;
  color: #787878;
  font-size: 1.1em;
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
  width:20em; /* Could be more or less, depending on screen size */
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
  top:  -10%;
  right:-10%;
  font-size: 2em;
  color: #3B3B3B;
}
.verify-password-input{
  text-indent:  0 !important;
  text-align:center;
  letter-spacing: 1em;
  padding-left: 1em;
  /* font-size: 2em !important; */
  /* color: #000; */
}
.verify-password-input::placeholder{
  position: relative;
  top: 5px;
  left: -6px;
  letter-spacing: 0.3em;
  font-size: 2em !important;
  /* color: #000; */
}
</style>
