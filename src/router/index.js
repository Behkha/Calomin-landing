// import store from '@/store'
import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '../components/SignIn'
import SellerPage from '../components/SellerPage'
import ProductListPage from '../components/ProductListPage'
import store from '../store'
import MainStore from '../components/MainStore'
import Profile from '../components/Profile'
import ProfileAddFriends from '../components/ProfileAddFriends'
import ProfileMyBooths from '../components/ProfileMyBooths'
import ProfileOrders from '../components/ProfileOrders'

import ProfileInfo from '../components/ProfileInfo'
import BoothPage from '../components/BoothPage'
import ProductPage from '../components/ProductPage'
import SellerListPage from '../components/SellerListPage'
import BoothListPage from '../components/BoothListPage'
import ProfileTrackOrder from '../components/ProfileTrackOrder'
import ProfileSavedItems from '../components/ProfileSavedItems'

import SignUp from '../components/SignUp'
import Cart from '../components/Cart'
import SubmitOrder from '../components/SubmitOrder'
//track payment
import PaymentDetail from '../components/PaymentDetail'
//footer
import ContactUs from '../components/ContactUs'
//invoice
import InvoicePage from '../components/InvoicePage'
import PreInvoicePage from '../components/PreInvoicePage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      component:SignIn,
      path: '/signin',
      view: 'SignIn',
      name:'SignIn',
      beforeEnter: (to, from, next) => {
          store.commit("onLoad")
          next()

        }
    },
    {
      component:SignUp,
      path: '/signup',
      name: 'SignUp',
      view:SignUp,
      beforeEnter: (to, from, next) => {
          store.commit("onLoad")
          next()

        }
    },
    {
      component:MainStore,

          path: '/',
          view:'MainStore',
          beforeEnter: (to, from, next) => {
              store.commit("onLoad")
              next()
            }
    },
    {
      component:SellerPage,
          path: '/seller/show/:id',
          view:'SellerPage',
          name:'SellerPage',
          beforeEnter: (to, from, next) => {
              store.commit("onLoad")
              next()

            }
    },{
    component:BoothListPage,

    path: '/booth/list',
    view:'BoothListPage',
    name:'BoothListPage',
    beforeEnter: (to, from, next) => {
        store.commit("onLoad")
        next()

      }

  },
  {
    component:BoothPage,
    path:'/booth/show/:id',
    name:'BoothPage',
    beforeEnter: (to, from, next) => {
        store.commit("onLoad")
        next()

      },
  },
    {
    component:SellerListPage,

  // =======
    path: '/seller/list',
    view:'SellerListPage',
    name:'SellerListPage',
    beforeEnter: (to, from, next) => {
        store.commit("onLoad")
        next()

      }

  },
  {
  component:ProductListPage,

  path: '/product/list',
  view:'ProductListPage',
  name:'ProductListPage',
  beforeEnter: (to, from, next) => {
      store.commit("onLoad")
      next()

    }
  },{
    component:ProductPage,
    path:'/product/show/:id',
    name:'ProductPage',
    beforeEnter: (to, from, next) => {
        store.commit("onLoad")
        next()

      }
  },

  //profile
  {
      component:Profile,
  // =======
    path: '/profile',
    name:'Profile',
    view:'Profile',
    beforeEnter: (to, from, next) => {
        // state.loading = true;
        store.commit("onLoad")

        if (!store.getters.isLoggedIn) {
          next({name: 'SignIn'})
        } else {
          next()
        }
      }
  },
  {
      component:ProfileMyBooths,
  // =======
    path: '/profile/booths',
    name:'ProfileBooths',
    view:'ProfileBooths',
    beforeEnter: (to, from, next) => {
        // state.loading = true;
        store.commit("onLoad")

        if (!store.getters.isLoggedIn) {
          next({name: 'SignIn'})
        } else {
          next()
        }
      }
  },
  {
      component:ProfileOrders,
  // =======
    path: '/profile/orders',
    name:'ProfileOrders',
    view:'ProfileOrders',
    beforeEnter: (to, from, next) => {
        // state.loading = true;
        store.commit("onLoad")

        if (!store.getters.isLoggedIn) {
          next({name: 'SignIn'})
        } else {
          next()
        }
      }
  },
  {
      component:ProfileAddFriends,
  // =======
    path: '/profile/addfriends',
    name:'AddFriends',
    view:'AddProfile',
    beforeEnter: (to, from, next) => {
        // state.loading = true;
        store.commit("onLoad")

        if (!store.getters.isLoggedIn) {
          next({name: 'SignIn'})
        } else {
          next()
        }
      }
  },{
      component:ProfileSavedItems,
  // =======
    path: '/profile/saveds',
    name:'ProfileSavedItems',
    view:'ProfileSavedItems',
    beforeEnter: (to, from, next) => {
        store.commit("onLoad")
        if (!store.getters.isLoggedIn) {
          next({name: 'SignIn'})
        } else {
          next()
        }
      }
  },
  {
      component:ProfileTrackOrder,
  // =======
    path: '/profile/trackorder',
    name:'TrackOrder',
    view:'TrackOrder',
    beforeEnter: (to, from, next) => {
        // state.loading = true;
        store.commit("onLoad")

        if (!store.getters.isLoggedIn) {
          next({name: 'SignIn'})
        } else {
          next()
        }
      }
  },
  {
    component:Cart,
    path:'/cart',
    name:'Cart',
    beforeEnter: (to, from, next) => {
        // state.loading = true;
        store.commit("onLoad")

        if (!store.getters.isLoggedIn) {
          next({name: 'SignIn'})
        } else {
          next()
        }
      }
   },
   {
    component:SubmitOrder,
    path:'/order/submit',
    name:'SubmitOrder'
    ,beforeEnter: (to, from, next) => {
        // state.loading = true;
        store.commit("onLoad")

        if (!store.getters.isLoggedIn) {
          next({name: 'SignIn'})
        } else {
          next()
        }
      },
    }
    //track payment
    ,
    {
     component:PaymentDetail,
     path:`/verify`,
     name:'PaymentDetail'
     ,beforeEnter: (to, from, next) => {
         // state.loading = true;
         // store.commit("onLoad")
         // if (!store.getters.isLoggedIn) {
         //   next({name: 'SignIn'})
         // } else {
           next()
         // }
       },
     },
     //footer items
     {
      component:ContactUs,
      path:`/contactus`,
      name:'ContactUs'
      ,beforeEnter: (to, from, next) => {
          // state.loading = true;
          // store.commit("onLoad")
          // if (!store.getters.isLoggedIn) {
          //   next({name: 'SignIn'})
          // } else {
            next()
          // }
        },
      },
      //invoce
      {
       component:InvoicePage,
       path:`/invoice/:id`,
       name:'InvoicePage'
       ,beforeEnter: (to, from, next) => {
           store.commit("onLoad")
           if (!store.getters.isLoggedIn) {
             next({name: 'SignIn'})
           } else {
             next()
           }
         },
       },
       {
        component:PreInvoicePage,
        path:`/pre-invoice/:id`,
        name:'PreInvoicePage'
        ,beforeEnter: (to, from, next) => {
            store.commit("onLoad")
            if (!store.getters.isLoggedIn) {
              next({name: 'SignIn'})
            } else {
              next()
            }
          },
        },


  // >>>>>>> feature/feature_product_page

  ]
})
