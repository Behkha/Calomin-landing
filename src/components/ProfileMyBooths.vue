<template lang="html">
  <div class="container-fliud my-5 " >
    <div class="row px-5 text-center">
      <div class="col col-2-5  drawer-container ">
        <drawer  ></drawer>
      </div>
      <div class="col col-9-5 outer-page-container" >
        <div class="page-container p-5 text-right">
          <div class="row">
            <div class="col-12 my-2">
              <div class="form-container p-3 table-container ">
                <table  style="width:100%">
                  <tr class="table-header text-center">
                    <th >ردیف</th>
                    <th class="ml-3">نام </th>
                    <th>شناسه کاربری</th>
                    <th>تاریخ عضویت</th>
                  </tr>
                  <tr class="table-sub text-center">
                    <td class="py-1">1</td>
                    <td class="py-1">میلاد ممنون</td>
                    <td class="py-1">milad-mmnon</td>
                    <td class="py-1">4/07/02</td>
                  </tr>
                  <tr class="table-sub text-center">
                    <td class="py-1">1</td>
                    <td class="py-1">میلاد ممنون</td>
                    <td class="py-1">milad-mmnon</td>
                    <td class="py-1">4/07/02</td>
                  </tr>
                  <tr class="table-sub text-center">
                    <td class="py-1">1</td>
                    <td class="py-1">میلاد ممنون</td>
                    <td class="py-1">milad-mmnon</td>
                    <td class="py-1">4/07/02</td>
                  </tr>
                  <tr class="table-sub text-center">
                    <td class="py-1">1</td>
                    <td class="py-1">میلاد ممنون</td>
                    <td class="py-1">milad-mmnon</td>
                    <td class="py-1">4/07/02</td>
                  </tr>
                  <tr class="table-sub text-center">
                    <td class="py-1">1</td>
                    <td class="py-1">میلاد ممنون</td>
                    <td class="py-1">milad-mmnon</td>
                    <td class="py-1">4/07/02</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
          <button @click="editProfile()" type="button" name="button" class="btn special-pink rounded-pill button py-1 px-4">ثبت تغییرات</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Drawer from './ProfileDrawer'
import DropDown from './DropDown'

export default {
  data: () => ({
    profile: null,
    addresses: [],
    cities: [],
    states: []
  }),
  methods: {
    change(selected) {
      this.profile.state = selected;
    },
    getProfileValues() {
      this.$store.dispatch('getProfileValues').
      then(response => {
        this.profile = response.data.data
      })
    },
    getAddresses() {
      this.$store.dispatch('getAddressesRequest').
      then(response => {
        this.addresses = response.data.data
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
      let data = {};
      if (this.profile.name) {
        data.name = this.profile.name
      }
      if (this.profile.email) {
        data.email = this.profile.email
      }
      // if (this.profile.state) {
      //   data.state_id = this.profile.state.id
      // }
      data.want_notification = false;
      this.$store.dispatch('editProfileRequest', data).
      then(response => {
        this.$router.push({
          path: 'profile'
        })
      })
    }
  },
  mounted() {
    this.getProfileValues();
    this.getAddresses();
    this.getStates();
  },
  components: {
    drawer: Drawer,
    dropdown: DropDown
  },
}
</script>

<style lang="css" scoped>
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
  .table-header{
    font-size: 0.7em !important;
    color: #191919;
    transition: font-size 0.5s;
  }
  .table-sub{
    font-size: 0.6em !important;
    color: #7F7F7F;
    transition: font-size 1s;
  }
}
.button{
  font-size: 1em;
  position: absolute;
  bottom: 3%;
  left: 3%;
}
.profile-input {
  border: 0;
  border-radius: 0;
  text-indent: 10px;
  background-color: #f7f7f7 !important;
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
  min-height: 40em;
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
.table-container{
  height: 30em !important;
  overflow-y: auto;
}
.table-header{
  font-size: 1em;
  color: #191919;
}
.table-sub{

  font-size: 0.9em ;
  color: #7F7F7F;
}
/* radio buttons css  */

html{
  font-siz:20em;
}
[type="radio"]:checked,
[type="radio"]:not(:checked) {
    display: none;
}
[type="radio"]:checked + label,
[type="radio"]:not(:checked) + label
{
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: #666;
}
[type="radio"]:checked + label:before,
[type="radio"]:not(:checked) + label:before {
    content: '';
/*     position: absolute; */
    left: 0;
    float:right;
    margin-left:10px;
    top: 0;
    width: 18px;
    height: 18px;
    border: 1.5px solid #aaa;
    border-radius: 100%;
    background: #fff;
}
[type="radio"]:checked + label:after,
[type="radio"]:not(:checked) + label:after {
    content: '';
    width: 12px;
    height: 12px;
    background: #47B8D6;
    position: absolute;
  float:right;
  /* margin-left:20px; */
    z-index:2;
    top: 3px;
    left: 0px;
    right:3px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
}
[type="radio"]:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
}
[type="radio"]:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
}
</style>
