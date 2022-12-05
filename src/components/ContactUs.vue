<template lang="html">
  <div class="outer-container text-right">
    <h2  class="head-title">تماس با ما</h2>
    <div class="inner-container container">
      <p class="top-des">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد</p>
      <div class="row">
        <div class="col-lg-5 col-sm-12 my-3 ">
          <label for="name" class="label-input">نام و نام خانوادگی</label>
          <input v-model="contact.name" id="name" class=" profile-input input-lg w-100 " type="text" name="name"></input>
        </div>
        <div class="offset-lg-2">
        </div>
        <div class="col-lg-5 col-sm-12 my-3">
          <label for="email" class="label-input">ایمیل</label>
          <input v-model="contact.email" id="email" class=" profile-input input-lg w-100" type="text" name="email"></input>
        </div>
        <div class="col-lg-5 col-sm-12 my-3">
          <label for="phone" class="label-input">شماره تماس</label>
          <input v-model="contact.phone" id="phone" class=" profile-input input-lg w-100" type="number" name="phone"></input>
        </div>
        <div class="offset-lg-2">
        </div>
        <div class="col-lg-5 col-sm-12 my-3">
            <label class="label-input" >موضوع</label>
            <dropdown class="profile-input " @changeSeleted="changeSubject" placeholder="موضوع مورد نظر را انتخاب کنید " :items="subjects" :selected="contact.subject"></dropdown>
        </div>
        <div class="col-12 my-3">
          <label for="address" class="label-input" >متن پیام</label>
          <textarea v-model="contact.massage" id="address" class="w-100 textarea p-4" name="massage" rows="4"></textarea>
        </div>
      </div>
      <div class="ml-4  clearfix">
      <button class="float-left common-buttons btn  d-block mx-auto  rounded-pill px-4 special-pink"  type="submit" @click="createMassage()">ارسال پیام</button>
    </div>
    </div>
    <div class="footer-contact-page mt-4">
      <div class="row justify-content-between">
        <div class="col-lg-5">
          <p class="footer-contacts">
            <img class="contact-icon pl-3" src="../images/location.svg" alt="">
          مشهد بلوار هاشمیه، هاشمیه 43، پلاک 47
          </p>
          <p class="footer-contacts">
            <img class="contact-icon pl-3" src="../images/phone-call.svg" alt="">
            0936066165 - 05134659875 - 09370731087
          </p>
          <p class="footer-contacts">
            <img class="contact-icon pl-3" src="../images/mail.svg" alt="">
            support@mayatechshop.com
          </p>
        </div>
        <div class="col-lg-6 mt-5">
          <!-- <p class="footer-des text-center">توجه داشته باشید که 300061930000 و 100061930000 تنها شماره‌هایی است که دیجی‌کالا از طریق آن برای کاربران و مشتریان خود پیامک (اس ام اس) ارسال می‌کند. بنابراین ارسال هرگونه پیامک تحت عنوان دیجی‌کالا، با هر شماره دیگری تخلف و سوء استفاده از نام دیجی‌کالا است و در صورت دریافت چنین پیامکی، لطفاً جهت پیگیری قانونی آن را به info@digikala.com اطلاع دهید.</p> -->
        </div>
      </div>
    </div>
    <div id="snackbar" :class="{'show-snack': show_snack}">{{snack_des}}</div>
  </div>
</template>

<script>
import DropDown from './DropDown'
export default {
  data: () => ({
    subjects: [],
    snack_des: '',
    show_snack: false,
    contact: {
      name: '',
      email: '',
      phone: '',
      subject: null,
      massage: ''
    }
  }),
  methods: {
    showSnack() {
      this.show_snack = true
      setTimeout(() => {
        this.show_snack = false;
      }, 3000)
    },
    changeSubject(selected) {
      this.contact.subject = selected;
    },
    getSubjects() {
      this.$store.dispatch('getSubjectsRequest').
      then(response => {
        this.subjects = response.data.data
      })
    },
    createMassage() {
      let data = {
        name: this.contact.name,
        email: this.contact.email,
        phone: this.contact.phone,
        body: this.contact.massage,
      }
      if (this.contact.subject) {
        data.subject_id = this.contact.subject.id
      }
      console.log(data);
      this.$store.dispatch('createMassageRequest', data).
      then(response => {
        this.snack_des = 'پیام شما با موفقیت ارسال شد';
        this.showSnack()
      }).catch(error => {
        if (error.response.status == '422') {
          this.snack_des = 'فیلد ها را بررسی کنید';
          this.showSnack()
        } else {
          this.snack_des = 'مشکلی رخ داد';
          this.showSnack()
        }
      })
    },
  },
  components: {
    dropdown: DropDown
  },
  mounted() {
    this.getSubjects()
  }
}
</script>

<style lang="css" scoped>
.outer-container{
  padding: 5em;
}
.inner-container{
  max-width: 1600px;
}
.head-title{
  font-weight: 900 !important;
}
.top-des{
  margin-top: 3em;
  font-size: 1.2em;
  color:#595959;
  line-height: 2em;
}
.profile-input {
border: 0;
border-radius: 0;
background-color: white !important;
text-indent: 10px;
height:4em;
}
.label-input{
font-weight: 600;
color: #545454;
font-size: 1.1em;
}
.textarea{
  background-color: light;
  border: 0;
  resize: none;
  height: 10em;
}
.footer-contact-page{
  background-color: white;
  border-radius: 20px;
  padding: 5em;
}
.footer-des{
  font-size: 0.98em;
  color: #F694A8;
  font-weight: bold;
  line-height: 2.5em;
}
.contact-icon{
  width: 60px;
  height:60px;
}
.footer-contacts{
  color: black;
  font-weight: bold;
  font-size: 1.3em;
}
@media (max-width: 48em) {
  .outer-container{
    padding: 1em ;
  }
  .head-title{
    font-size: 1.8em;
    text-align: center;
  }
  .profile-input {
    text-indent: 10px;
    height:2.5em;
  }
  .label-input{
    font-size: 0.8em !important;
  }
  .my-3{
    margin: 1em 0 !important;
  }
  .top-des{
    text-align: center;
    margin-top: 1em;
    font-size: 0.8em;
    line-height: 1.5em;
  }
  .footer-contact-page{
    text-align: center !important;
    border-radius: 15px;
    padding: 1em;
  }
  .contact-icon{
    width: 20px;
    height:20px;
  }
  .footer-contacts{
    font-size: 0.6em;
  }
  .pl-3{
    padding-left:  0.5em !important;
  }
  .footer-des{
    font-size: 0.6em;
  }
  .p-4{
    padding: 1em !important;
  }
  .mt-5{
    margin-top: 0 !important;
  }
  .common-buttons{
    float: none !important;
    padding: 0.5em 1.5em !important;
    font-size: 0.8em;
  }
}
</style>
