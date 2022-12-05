<template lang="html">
  <div class="outer-container">

  <div class="container center px-4" style="max-width: 1150px;">

    <div class="row shadow-sm sign-countainer " v-bind:class="{'sign-container-sm': !verify}">
      <div v-if="!verify" class="col-12 col-md-8 text-center my-auto" >
      <h3 class="mb-5">ثبت نام</h3>
      <div class="form-group input-group mx-auto ">
        <div class="prepend-icon input-group-text sign-input">
          <i class="  fa fa-user  "></i>
        </div>
        <input  v-model="user.name" class=" sign-input form-control px-0" type="text" name="name" placeholder="نام و نام خانوادگی" @keyup.enter="submit()">
      </div>
      <div class="form-group input-group mx-auto " >
        <div class="prepend-icon input-group-text sign-input">
          <i class=" fa fa-phone "></i>
        </div>
        <input  v-model="user.phone" class=" sign-input form-control px-0" type="number" name="phone" placeholder="تلفن همراه" @keyup.enter="submit()">
      </div>
      <div class="form-group input-group mx-auto" >
        <div class="prepend-icon input-group-text sign-input">
          <i class="  fa fa-at"></i>
        </div>
        <input  v-model="user.email" class=" sign-input form-control px-0" type="text" name="email" placeholder="ایمیل" @keyup.enter="submit()">
      </div>
      <div class="form-group input-group mx-auto " >
        <div class="prepend-icon input-group-text sign-input">
          <i class="fa fa-lock "></i>
        </div>
        <input  v-model="user.password" class=" sign-input form-control px-0" type="password" name="password" placeholder="رمز عبور" @keyup.enter="submit()">
      </div>
      <!-- <span  class="small text-danger m-0 p-0">این شماره تلفن قبلا ثبت نام کرده است!</span> -->
      <!-- <router-link :to="{ name: '', params: {} }" class="link-text "> رمز عبور خود را فراموش کرده اید؟</router-link> -->
      <button class="common-buttons btn  d-block mx-auto mt-4 rounded-pill px-4 special-pink"  type="submit" @click="submit()">دریافت کد</button>
    </div>
    <div v-if="verify"  class="col-12 col-md-8 text-center my-auto" style="direction:ltr">
      <h3 class="mb-5">کد ارسال شده را وارد کنید</h3>
      <input id="1" v-model="phone_code[0]" class="text-center col-2 m-2 sign-input track-input d-inline-block" type="text" maxlength="1" @keyup="moveToNext($event,'2')" >
      <input id="2" v-model="phone_code[1]" class="text-center col-2 m-2 sign-input track-input d-inline-block" type="text" maxlength="1"  @keyup="moveToNext($event, '3')">
      <input id="3" v-model="phone_code[2]" class="text-center col-2 m-2 sign-input track-input d-inline-block" type="text" maxlength="1"  @keyup="moveToNext($event, '4')">
      <input id="4" v-model="phone_code[3]" class="text-center col-2 m-2 sign-input track-input d-inline-block" type="text" maxlength="1" @keyup.enter="verifyPhone()" >
      <button class="common-buttons btn  d-block mx-auto mt-4 rounded-pill px-4 special-pink"  type="submit" @click="verifyPhone()">ساخت حساب</button>
    </div>
    <div class="col-12 col-md-4 sign-img overflow-hidden center-h">
        <div class=" text-light mx-5 center-h-el">
          <h2  class="mb-5">سلام دوست عزیز ! </h2>
          <!-- <p  class="light-weight-text mb-5 ">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. </p> -->
          <a  class="btn signout-button  d-block mx-auto  rounded-pill px-4"  href="signin">ورود به حساب</a>
        </div>
    </div>
  </div>
  <div id="snackbar" :class="{'show-snack': show_snack}">{{snack_des}}</div>
</div>

</div>
</template>

<script>
export default {
  data: () => ({
    show_snack: false,
    snack_des: '',
    user: {
      name: '',
      phone: '',
      password: '',
      email: ''
    },
    phone_code: [],
    verify: false
  }),
  methods: {
    moveToNext(event, nextFieldID) {
      if (event.target.value.length >= event.target.maxLength) {
        document.getElementById(nextFieldID).focus();
      }
    },
    showSnack() {
      this.show_snack = true
      setTimeout(() => {
        this.show_snack = false;
      }, 3000)
    },
    verifyPhone() {
      this.loader = true
      let data = {
        token: '',
        phone: ''
      }
      data.token = this.phone_code[0] + this.phone_code[1] + this.phone_code[2] + this.phone_code[3]
      data.phone = this.user.phone
      this.$store.dispatch('verifyRequest', data)
        .then(response => {
          this.loader = false
          if (response == "token is invalid") {
            this.snack_des = "کد صحیح نیست!"
            this.showSnack()
          } else {
            this.$router.push({
              name: 'Profile'
            })
          }
        }).catch(error => {
          this.loader = false
        })
    },
    submit() {
      this.$store.dispatch('signUpRequest', this.user)
        .then(() => {
          this.verify = true;

        }).catch(error => {
          // alert('ss')
          if (error.response.status == 422) {
            this.snack_des = "ورودی ها رو چک کن!"
            this.showSnack()
          } else {
            this.snack_des = "مشکلی رخ داد!"
            this.showSnack()
          }

        })
    },

  },
  mounted() {
    this.$store.dispatch("afterLoad");
  }

  // }
}
</script>

<style lang="css" scoped>
.outer-container{
  min-height:60vh;
}
.sign-countainer{
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
}
@media (max-width: 48em) {
  .sign-img{
    background: url(../images/pink.jpg) no-repeat top center/cover rgba(160, 217, 241, .5) ;
    border-radius: 0 0 12px 12px  !important;
    /* height: 100%; */
  }
  .sign-container-sm{
    height: 700px !important;
  }
  .my-auto{
    margin: 1em 0 1em 0 !important;
  }
  .sign-img{
    height:330px;
  }
  h2{
    font-size:1.5em;
  }
  p{
    font-size: 0.7em !important;
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
.track-input{
height: 3em;
/* margin: 2em; */
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
.prepend-icon{
  border-top-left-radius: 0 !important;
  border-top-right-radius: 5px !important;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 5px !important;
  font-size: 1em !important;
  vertical-align: bottom;
  /* padding-left: 1.5em; */
}

</style>
