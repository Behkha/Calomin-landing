
<template>
<div class="">

  <div id="navbar">
    <div class="row mb-1">
      <div class="col ">
        <nav class="navbar navbar-expand-lg navbar-light bg-light py-0 ">
          <button class="navbar-toggler border-0 py-2" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse " id="navigation">
            <ul class="navbar-nav ml-auto ">
              <li class="nav-item nav-link-head" v-bind:class="{'active-nav': (active_item == '/')}">
                <router-link class="nav-link  mx-4 py-4" :to="{ path: '/'}">صفحه اصلی</router-link>
              </li>
              <li class="nav-item nav-link-head " v-bind:class="{'active-nav': (active_item == '/product/list')}">
                <router-link class="nav-link  mx-4 py-4" :to="{ path: '/product/list'}">محصولات</router-link>
              </li>
              <li class="nav-item nav-link-head" v-bind:class="{'active-nav': (active_item == '/profile')}">
                <router-link class="nav-link  mx-4 py-4" :to="{ path: '/profile'}">پروفایل</router-link>
              </li>
              <li class="nav-item nav-link-head" v-bind:class="{'active-nav': (active_item == '/cart')}">
                <router-link class="nav-link  mx-4 py-4" :to="{ path: '/cart'}">سبد خرید</router-link>
              </li>
              <li class="nav-item nav-link-head" @mouseover="onHover(true)" @mouseleave="onHover(false)">
                <a href="#" class=" d-block nav-link  mx-4 py-4 lg-items">دسته بندی ها</a>
                <div v-if="isHover" class="maga-menu-category bg-light text-center shadow-sm">
                  <div class="row m-0">
                    <div class="inner-category-list col-3 pt-3 pr-2 pl-0">
                      <ul class="text-right m-0 p-0" ref="innerCategoryList">
                        <li class="right-side-category-item mr-0 list-unstyled py-3 pr-2" v-for="category in categories" @mouseover="changeCategoryList(category)"><a :href="'/product/list?category_id='+category.id">{{category.name}}</a></li>
                      </ul>
                    </div>
                    <div class="col-9 p-3">
                      <ul class=" list-unstyled text-right sub-category-list  m-0 p-0 text-right pt-3" :style="category_sub_list_height">
                        <li class="category-title  " v-bind:class="{'sub-category-title': sub.is_sub}" v-for="sub in lg_categories"><a :href="'/product/list?category_id='+sub.id">{{sub.name}}<i class="small mr-1  fas fa-chevron-left "
                              v-if="!sub.is_sub"></i></a></li>
                        <!-- <li class="category-title sub-category-title" v-for="i in 5"><a href="#"> زیر کتگوری</a></li> -->
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav-item nav-link-head md-items">
                <div id="accordion">
                  <div class="category-md-list " v-for="(category, k) in categories">
                    <a class="nav-link collapsed d-block" data-toggle="collapse" :data-target="'#collapse'+k" href="#" aria-expanded="false" :aria-controls="'collapse'+k">
                      <i class="far fa-plus-square align-middle when-closed"></i> <i class="far fa-minus-square align-middle when-opened"></i> {{category.name}}
                    </a>
                    <div :id="'collapse'+k" class="collapsing " :aria-labelledby="'heading'+k" data-parent="#accordion">
                      <a class="nav-link" :href="'/product/list?category_id='+sub.id" v-for="sub in category.children">{{sub.name}}</a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="dropdown   rounded my-auto lg-items w-100 " style="max-width:500px; height:45px;">
              <input v-model="search" class=" search-input  dropdown-toggle  rounded  h-100 dropdown " v-bind:class="{search_input_expand : aria_expanded, shadow: aria_expanded}" type="text" name="search" id="dropdownMenuButton"
                data-toggle="dropdown" aria-haspopup="true" :aria-expanded="aria_expanded" placeholder="نام محصول, برند را جستجو کنید ..." @click="onSearch(true)" @blur="onSearch(false)" @keyup="asyncFind()">
              <span class=" input-group-text fa fa-search  dropdown align-bottom h-100 " v-bind:class="{input_text_group_expanded: aria_expanded}" style="margin-right: -8px;"> </span>
              <div v-if="aria_expanded" class="nav-dropdown-menu text-right p-4 shadow" style="width:99.8%; margin-left:1px;" :key="dropdown_key">
                <div v-for="item in search_results" class="my-2">
                  <h6 class=" search-items-header ">{{item.name}}</h6>
                  <div v-for="result in item" class=" mr-2 ">
                    <span class="fa fa-search search-items align-middle"> </span>
                    <a v-if="result.title" class=" mr-1 search-items " :href='"/"+item.type+"/show/"+result.id'>{{result.title}}</a>
                    <a v-if="!result.title" class=" mr-1 search-items " :href='"/"+item.type+"/show/"+result.id'>{{result.name}}</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="mr-3 lg-items d-block">
              <div class="dropdown d-inline-block">
                <i class="  nav-icons lg-icon pl-3 far fa-user-circle  dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                <div v-if="name" class="dropdown-menu mt-3 profile-dropdown shadow px-4 text-right" aria-labelledby="dropdownMenuButton">
                  <span class=" d-block text-center mx-auto mb-3 h6 pureblack pt-2">{{name}}</span>
                  <router-link class="dropdown-item  d-block pr-2" :to="{path:'/profile'}">مشاهده پروفایل</router-link>
                  <router-link class="dropdown-item  d-block pr-2 dropdown-line" :to="{ path: '/cart'}">سبد خرید</router-link>
                  <button @click="logOut()" class="dropdown-item d-block " href=""><i class="fas fa-sign-out-alt align-middle"></i> خروج از حساب</button>
                </div>
                <div v-if="!name" class="dropdown-menu mt-3 profile-dropdown shadow px-4 text-right" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="/signin"><i class="fas fa-sign-in-alt align-middle"></i> ورود به سایت</a>
                </div>
              </div>
              <router-link class="  nav-icons fas pr-3 pl-3 fa-shopping-cart" :to="{ path: '/cart'}"></router-link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
  <div class=" text-center mx-4 my-4 md-items">
    <div class="dropdown   rounded my-auto md-items w-100 " style="height:45px;">
      <input v-model="search" class=" search-input  dropdown-toggle  rounded  h-100 dropdown " v-bind:class="{search_input_expand : aria_expanded, shadow: aria_expanded}" type="text" name="search" id="dropdownMenuButton" data-toggle="dropdown"
        aria-haspopup="true" :aria-expanded="aria_expanded" placeholder="نام محصول, غرفه یا فروشنده را جستجو کنید ..." @click="onSearch(true)" @blur="onSearch(false)" @keyup="asyncFind()">
      <div class="input-group-text dropdown   h-100 d-inline-block align-bottom" v-bind:class="{input_text_group_expanded: aria_expanded}" style="margin-right: -8px;">
        <span class="fa fa-search search-icon"> </span>
      </div>
      <div v-if="aria_expanded" class="nav-dropdown-menu text-right p-4 shadow" style="width:99.8%; margin-left:1px;" :key="dropdown_key">
        <div v-for="item in search_results" class="my-2">
          <h6 class=" search-items-header ">{{item.name}}</h6>
          <div v-for="result in item" class=" mr-2 ">
            <span class=" fa fa-search search-items align-middle "> </span>
            <a v-if="result.title" class=" mr-1 search-items " :href='"/"+item.type+"/show/"+result.id'>{{result.title}}</a>
            <a v-if="!result.title" class=" mr-1 search-items " :href='"/"+item.type+"/show/"+result.id'>{{result.name}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import lodash from 'lodash'


export default {
  data: () => ({
    items: [{
      ad: 'dd',
    }, {
      ad: 'dd',
    }, {
      ad: 'dd',
    }, {
      ad: 'dd',
    }, ],
    categories: [],
    lg_categories: [],
    isHover: false,
    aria_expanded: false,
    search: null,
    dropdown_key: 0,
    search_results: [],
    raw_search: null,
    category_sub_list_height: {
      height: '300px'
    }
  }),
  methods: {
    asyncFind: lodash.debounce(function() {
      this.getSearchReasult(this.search)
    }, 500),
    onSearch(status) {
      setTimeout(() => {

        this.aria_expanded = status
      }, 100);
      // alert(this.aria_expanded)
    },
    onHover(status) {
      this.isHover = status
      if (this.$refs.innerCategoryList) {
        this.category_sub_list_height = {
          height: this.$refs.innerCategoryList.clientHeight + 'px'
        }
      }
    },
    getSearchReasult(search) {
      if (search) {
        this.$store.dispatch('getSearchReasultRequest', search).
        then(response => {
          let k = 0
          this.raw_search = response.data.data
          if (this.raw_search.products) {
            this.search_results[k] = this.raw_search.products
            this.search_results[k].name = 'محصولات'
            this.search_results[k].type = 'product'
            k++;
          }
          if (this.raw_search.booths) {
            this.search_results[k] = this.raw_search.booths
            this.search_results[k].name = 'غرفه ها'
            this.search_results[k].type = 'booth'
            k++;
          }
          if (this.raw_search.sellers) {
            this.search_results[k] = this.raw_search.sellers
            this.search_results[k].name = 'فروشنده ها'
            this.search_results[k].type = 'seller'
            k++;
          }
          this.dropdown_key++;
        })
      } else {
        this.search_results = [];
      }
    },
    changeCategoryList(category) {
      this.lg_categories = []
      category.children.forEach((head_item, i) => {
        this.lg_categories.push(head_item)
        head_item.children.forEach((sub_item, i) => {
          let data = sub_item
          data.is_sub = true
          this.lg_categories.push(data)
        });

      });
      console.log(this.lg_categories);
    },
    getCategories() {
      this.$store.dispatch('getCategories').
      then(response => {
        this.categories = response.data
        this.changeCategoryList(this.categories[0])
      })
    },
    logOut() {
      this.$store.dispatch('logOut')
      location.reload();
    }
  },
  computed: {
    name() {
      return localStorage.getItem("parsport_user_name")
    },
    active_item() {
      return this.$route.fullPath
    }
  },
  mounted() {
    this.getCategories()
  },


}
</script>
<style media="screen">
*:focus {
  outline: none !important
}

.show {
  outline: none !important
}

#navbar {
  font-size: 20px;
  /* overflow: hidden; */
}

@media (max-width: 90em) {
  .nav-link {
    font-size: 0.7em;
    margin: 0.2em !important;
    transition: font-size 0.5s;
  }

  .nav-item {
    padding: 0 !important;
  }
}

@media (max-width: 62em) {
  #navbar {
    overflow-x: hidden;
  }

  .md-items {
    display: block !important;
  }

  .lg-items {
    display: none !important;
  }

  .search-items {
    font-size: 0.8em !important;
  }


  .nav-link {
    font-size: 0.6em;
    padding: 0.5em !important;
  }

  .nav-link-head:hover {
    border-color: transparent !important;
  }

}

@media (max-width: 48em) {
  .search-input::placeholder {
    font-size: 0.8em !important;
  }

  .search-icon {
    margin-right: -10px;
  }

  .px-5 {
    padding: 2 !important;
  }
}

.md-items {
  display: none;
}




.nav-link-head {
  color: rgb(84, 84, 84);
  font-weight: bold;
  border-bottom: 2px solid #f8f9fa;
}

.nav-link-head:hover {
  border-color: #fd446d;
  transition: border-color 1s;
}

@media (min-width: 62em) {
  .active-nav {
    border-color: #fd446d;
    transition: border-color 1s;
  }
}

.search-input {
  width: 90%;
  border: 0;
  height: 40px;
  background-color: rgb(231, 231, 231);
  font-size: 0.8em;
  color: 545464;
}


.search-input::placeholder {
  font-size: 15px;
  color: rgb(180, 180, 180);
}

.search-input-lg {
  height: 3.5em;
}

.input-group {
  border-radius: 20px;
}

.input-group-text {
  border: 0;
  width: 10%;
  border-bottom-left-radius: 5px !important;
  border-top-left-radius: 5px !important;
  font-size: 1.4em !important;
  color: rgb(180, 180, 180);
  background-color: rgb(231, 231, 231);
  vertical-align: center;
}

.nav-icons {
  color: #ccc;
  font-size: 1.5em;
  vertical-align: middle
}

.lg-icon {
  font-size: 1.8em;
}

.nav-icons:hover {
  color: #333;
  transition: color 0.3s;
  text-decoration: none !important;
}

.input-group-append {
  border-top-left-radius: 5px !important;
  border-bottom-left-radius: 5px !important;

}

/* search box */
.dropdown button::after {
  content: none !important;
}

.dropdown div {
  height: auto;
  /* max-height: 200px; */
  /* overflow-x: hidden; */
}

.sign-forms::placeholder {
  font-size: 1.2em;
  color: red;
  /* overflow-x: hidden; */
}

/* .search-dropdown {
  position: relative;
  z-index:  !important;
  height: 200px !important;
  display: block;
} */

.nav-dropdown-menu {
  position: relative;
  z-index: 5 !important;
  border-radius: 20px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin-top: -5px;
  border-top: 0;
  background-color: white
}

.search-items {
  font-weight: lighter;
  font-size: 0.8em;
  color: #8E8E91;
  text-decoration: none !important;
}

.search-items-header {
  color: #8E8E91;

}

.search-items:hover {
  color: #8E8E91;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
}

/* classes add when aria_expanded in search input is true */
/* tofmal search dast nazan! */
.input_text_group_expanded {
  background-color: white;
  /* border-top: 1px solid #cecece; */
  /* border-left: 1px solid #cecece; */
  border-top-left-radius: 20px !important;
  transition: border-top-left-radius 0.5s;

}

.search_input_expand {
  width: 90% !important;
  /* border: 1px solid #CECECE !important; */
  background-color: white !important;
  border-top-right-radius: 20px !important;
  transition: border-top-right-radius 0.5s;
}

.search-input::placeholder {
  font-size: 15px;
  color: rgb(180, 180, 180);
}

.dropdown-item {
  font-size: 0.75em;
  color: #C9C9C9;
}

.dropdown-toggle::after {
  display: none !important;
}

.dropdown-item i {
  font-size: 1.5em !important;
}

.profile-dropdown {
  border: 0;
  border-radius: 0.5em;
}

.dropdown-item:hover {
  background-color: white !important;
}

.dropdown-line {
  padding-bottom: 1em;
  border-bottom: 1px solid #ccc;
}

.maga-menu-category {
  min-width: 50vw;
  top: 3.9em;
  left: 25%;
  z-index: 10;
  position: absolute;
  overflow: auto;
}

.inner-category-list {
  font-size: 0.7em;
  color: #626262;
  background-color: #f5f5f5;
  text-decoration: none;
}

.right-side-category-item a {
  color: inherit;
  text-decoration: none;
}

.right-side-category-item:hover {
  background-color: #F8F9FA !important;
  color: #FD446D;
  text-decoration: none;
  transition: background-color 0.3s;
  transition: color 0.3s;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.sub-category-list {
  /* height: 40em; */
  font-size: 0.7em;
  /* height: inherit; */
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: column wrap;
  flex-flow: column wrap;
}

.category-title {
  margin: 0;
  padding: 0;
  display: inline !important;
}

.category-title a {
  color: inherit;
  text-decoration: none !important;
}

.sub-category-title {
  font-weight: lighter;
  color: #696969;
}

#accordion {
  border-top: 1px solid #ccc;
}

.collapsed>.when-opened,
:not(.collapsed)>.when-closed {
  display: none;
}
</style>
