<template lang="html">
  <div class="   outer-container p-3">
      <!-- Sidebar -->
      <div class="text-center profile-header">
        <img class="img-profile " :src="profile_picture" alt="">
        <div v-if="profile.name" class="username pureblack p-1">{{profile.name}}</div>
        <div class="px-3">
          <div class="follow-s px-3 text-center clearfix my-3 text-center">
            <!-- <span class="float-left"><strong class="d-block pureblack">3</strong>دنبال شونده</span> -->
          </div>
          <button type="button" class=" cash-btn btn  rounded-pill btn-outline-info w-100 my-3" v-if="profile.wallet">
            <span class="float-right ">میزان اعتبار قلک :</span>
            <span class="float-left cash">{{profile.wallet.balance | toCurrency}} تومان</span>
          </button>
        </div>
      </div>
      <nav id="sidebar" >
          <ul class="list-unstyled components side-menu-item ">
              <li  class="active filter-header pb-3">
                <br class="line">
                <div class=" clearfix">
                  <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle side-menu-head d-flex justify-content-between p-0 m-0 ">اطلاعات شخصی <i class="mt-2 float-left fas fa-chevron-down "></i></a>

                </div>
                  <ul  class="collapse list-unstyled text-right pr-3" id="homeSubmenu">
                      <li v-for="item in first_drawer_menu" class="submenu">
                          <!-- <input type="checkbox" name="" value="" class="align-middle"> -->
                          <router-link  :to="{name: item.link , params:{}}" class="pr-2 submenu ">{{item.title}}</router-link>
                      </li>
                  </ul>
              </li>
              <li  class="active filter-header pb-3">
                <br class="line">
                <div class=" clearfix">
                  <a href="#homeSubmenu2" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle side-menu-head d-flex justify-content-between p-0 m-0 ">اطلاعات مالی<i class="mt-2 float-left fas fa-chevron-down "></i></a>

                </div>
                  <ul  class="collapse list-unstyled text-right pr-3" id="homeSubmenu2">
                      <li v-for="item in second_drawer_menu" class="submenu">
                          <!-- <input type="checkbox" name="" value="" class="align-middle"> -->
                          <router-link  :to="{name: item.link , params:{}}" class="pr-2 submenu ">{{item.title}}</router-link>
                      </li>
                  </ul>
              </li>
              <!-- <li  class="active filter-header">
                <br class="line">

                <div class=" clearfix">
                  <a href="#homeSubmenu2" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle side-menu-head float-right">اطلاعات مالی</a>
                  <i class="float-left fas fa-chevron-down "></i>
                </div>
                  <ul  class="collapse list-unstyled text-right pr-3" id="homeSubmenu2">
                      <li v-for="n in 4" class="submenu">
                          <span class="pr-2">پروفایل</span>
                      </li>
                  </ul>
              </li> -->
              <!-- <li  class="active filter-header">
                <div class="justify-between">
                  <a href="#homeSubmenu2" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle pb-5 h5 side-menu-head">فیلتر شماره 1</a>
                  <i class="float-left fas fa-chevron-down "></i>
                </div>

                  <ul  class="collapse list-unstyled side-menu-sub" id="homeSubmenu2">
                      <li v-for="n in 4" class="pt-3 px-2">
                          <input type="checkbox" name="" value="" class="align-middle">
                          <span class="">عنوان شماره 2 (35)</span>
                      </li>
                  </ul>
              </li> -->
          </ul>
      </nav>
      <div class="quit-link">
        <a  href="#" @click="logOut()">خروج از سایت</a>
      </div>

  </div>

</template>

<script>
export default {

  data: () => ({
    profile: null,
    profile_picture: 'https://www.digikala.com/static/files/fd4840b2.svg',
    first_drawer_menu: [{
        title: 'پروفایل',
        link: 'Profile'
      },
      // {
      //   title: 'دعوت از دوستان',
      //   link: 'AddFriends'
      // },
      // {
      //   title: 'غرفه های من',
      //   link: 'ProfileBooths'
      //
      // },
    ],
    second_drawer_menu: [{
        title: 'سفارشات من',
        link: 'ProfileOrders'

      },
      {
        title: 'پیگیری سفارش',
        link: 'TrackOrder'

      }, {
        title: 'ذخیر شده ها',
        link: 'ProfileSavedItems'
      },
    ]
  }),
  methods: {
    getProfileValues() {
      this.$store.dispatch('getProfileValues').
      then(response => {
        this.profile = response.data.data
        this.profile_picture = response.data.data.profile_picture

      })
    },
    logOut() {
      this.$store.dispatch('logOut')
      location.reload();
    }
  },
  mounted() {
    this.getProfileValues()
  }
}
</script>

<style lang="css" scoped>
.outer-container{
  width: 100%;
  border-radius: 1.5em;
  background-color: white;
  border: 0.1em solid #dadada;
}
@media (max-width: 48em) {
  .outer-container{
    width: 100% !important;
  }
}
.img-profile{
  width:  6em;
  height: 6em;
  border-radius: 100%;
  border: 3px solid #dadada;
}
.username{
  font-size: 1.1em;
  font-weight: 800;
}
.follow-s{
  font-size: 0.75em;
  color: #929091;
  font-weight: bold;
  line-height: 1.2em;
}
.cash-btn{
  padding: 0.4em 1em 0.4em 1em;
  display: inline-block;
  font-size: 0.8em;
  margin-top: 0.15em;
}
.cash-btn:hover span{
  color: white;
  transition: color 0.5s;
}
.cash{
  font-size: 1em;
  font-weight: bold;
  color: #3A829B;
  margin-top: 0.15em;
}
.custom-control-input{
  color: black;
  border-radius: 0!important;
}
*::-ms-expand {
    display: none;
    font-size: 20px;
}
.dropdown-toggle::after{
    display: none;
    /* font-size: 20px; */

}
.side-menu-head{
  font-weight: 700;
  font-size:1.1em;
  color:black;
  text-decoration: none;
}
.submenu{
  font-size: 0.9em;
  color: #7E7A7B;
  list-style: none;
  font-weight: 510;
  text-decoration: none;
}
/* .filter-header div::before{
  content: ' ';
  display: block;
  height: 0.07em;
  background-image: linear-gradient(to right, white, #ccc, white);
  width: 80%;
  margin: 0 auto 0 auto;
  margin-bottom: 0.8em;
} */
.line{
  content: ' ';
  display: block;
  height: 1.5px;
  background-image: linear-gradient(to right, white, #ddd, white);
  width: 80%;
  margin: 0 auto 0 auto;
  margin-bottom: 0.8em;
}
.side-menu-sub{
  font-size:15px;
  color: #57585a;
  text-decoration: none;
}
/* .side-menu-item .filter-header::after{
  content: ' ';
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;

  background-color: #ccc;
  border-radius: 100%;
  height:2.5px;
  width:100%;
  background-image: linear-gradient(to right, rgb(245,245,245), #ccc, rgb(245,245,245));

} */
.quit-link a{
  font-size: 1em;
  font-weight: 800;
  color: black !important;
  text-decoration: none;
}
.side-menu-item :last-child::after{
  content: ' ';
  display: block;
  background-color: white;
  border-radius: 100%;
  height:0px;
  width:100%;
  background-image: linear-gradient(to right, rgb(245,245,245), #ccc, rgb(245,245,245));

}
.single-filter li::after{
  content: ' ';
  display: block;
  background-color: #ccc;
  border-radius: 100%;
  margin-top:20px;
  height: 1.9px;
  width:95%;
  background-image: linear-gradient(to right, rgb(245,245,245), #ccc, rgb(245,245,245));

}


</style>
