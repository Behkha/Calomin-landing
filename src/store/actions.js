// https://vuex.vuejs.org/en/actions.html
import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)
export default  {
  afterLoad({commit, dispatch}){
    commit('afterLoad')
  },
  login({commit, dispatch, getters}, credentials) {
        return new Promise(resolve => {
            dispatch('loginRequest', credentials)
                .then(response => {
                    commit('setToken', response.data.data.token)
                    commit('loggedIn')
                    dispatch('fetchUser')
                        .then(response => {
                          commit('setUser', response.data.data.name)
                            resolve()
                        })
                }).catch(error => {
                commit('failed')
                console.log(error);
                // commit('failed')
                // dispatch('handleError', {method: 'login', response: error.response})
                if (!error.response)
                  resolve('failed')
                  else
                    if (error.response.status == 400)
                      resolve('400')
            })
        })
  },
  logOut({commit}) {
    commit('loggedOut')
  },
  fetchUser({getters}){
  return getters.axios.get(`users/me`);
  },
  verifyRequest({commit, dispatch, getters},data){
  return getters.axios.post('users/verify_phone', data)
      .then(response => {
          commit('setToken', response.data.data.token)
          dispatch('addToCartRequest', getters.getSavedProducts).then(response =>{
          })
          commit('loggedIn')
          dispatch('fetchUser')
              .then(response => {
                commit('setUser', response.data.data.name)
                  resolve()
              })
      }).catch(error => {
      if(error.response.status == 422){
      return 'token is invalid'
    }
})
},
forgetPasswordRequest({getters}, data){
return getters.axios.post(`users/forget_password`, data);
},
veriyForgetPasswordRequest({getters}, data){
return getters.axios.post(`users/verify_forget_password`, data);
},
resetPasswordRequest({getters}, data){
return getters.axios.post(`users/change_password`, data);
},
//search
  getSearchReasultRequest({getters}, data){
    return getters.axios.get(`home/search?search_term=${data}`)
  },
  loginRequest({getters},data){
    return getters.axios.post('users/signin',data)
  },
  signUpRequest({getters},data){
    return getters.axios.post('users/signup',data)
  },


  //slider
  getSliderImagesRequest({getters}){
    return getters.axios.get(`slides`)
  },

    // comments
  getCommentsRequest({getters}, data){
    return getters.axios.get(`${data.type}/${data.id}/comments?newest=1`)
  },
  sendCommentRequest({getters},data){
    return getters.axios.post(`${data.type}/${data.id}/comments`,data)
  },sendBoothCommentRequest({getters},data){
    return getters.axios.post(`users/${data.type}/${data.id}/comments`,data)
  },
  getBoothCommentsRequest({getters}, data){
    return getters.axios.get(`users/${data.type}/${data.id}/comments?newest=1`)
  },
  //Products

  getProductsList({getters}, data){
    let url
    if (data.category_id){
       url = `products?page=${data.page}&categories[0]=${data.category_id}&${data.sort}=1`;
    }else {
       url = `products?page=${data.page}&${data.sort}=1`;
    }
    if(data.filters){
      let filters = [];
      data.filters.forEach((item, i) => {
        let is_valid = false;
          filters.forEach((filter, i) => {
            if (item.id == filter.id) {
              filters[i].values.push(item.value)
              is_valid =!is_valid;
            }
          });
          if (!is_valid) {
            filters.push({
              id:item.id,
              values:[item.value]
            })
          }

      });
      filters.forEach((item, i) => {
        url+=`&filters[${i}][id]=${item.id}`
        item.values.forEach((item, j) => {
          url+=`&filters[${i}][values][${j}]=${item}`
        });

      });
    }
    console.log(url);
    return getters.axios.get(url);
  },
  getProducts({getters}, data){
    return getters.axios.get(`products/${data.id}/similar_products`)
  },
  getTopSellingProducts({getters}){
    return getters.axios.get(`products?top_selling=1`)
  },
  getProductValues({getters}, data){
    return getters.axios.get(`products/${data.id}`)
  },
  getDiscountedProducts({getters}){
    return getters.axios.get(`products?has_discount=1`)
  },
  getNewProductsRequest({getters}){
    return getters.axios.get('products/new_products');
  },
  getProductsFiltersRequest({getters}, data){
    let url
    if (data.category_id) {
      url = `products/filters?category_id=${data.category_id}`
    }else{
      url = 'products/filters'
    }
    return getters.axios.get(url);
  },
  addToBookmarkRequest({getters}, data){
    let data2={
      products:[]
    }
    data2.products.push(data.product_id)
  return getters.axios.post(`users/products/bookmarks`,data2);
  },
  getBookmarkedProductsRequest({getters}){
    return getters.axios.get('users/products/bookmarks');
  },
  removeFromBookmarkRequest({getters}, data){

  return getters.axios.delete(`users/products/bookmarks?products[0]=${data.product_id}`);
  },
  getCategories({getters}){
  return getters.axios.get('categories?all=1');
  },
  getCategoryValuesRequest({getters}, data){
  return getters.axios.get(`categories/${data.category_id}`);
  },
  getBooths({getters}, data){
  return getters.axios.get(`booths?page=${data.page}`);
  },
  getTopBooths({getters}, data){
  return getters.axios.get(`booths?top_booths=1`);
  },
  addToFollowRequest({getters}, data){
  return getters.axios.get(`users/booths/${data.booth_id}/follow`);
  },
  getFollowedBoothsRequest({getters}){
    return getters.axios.get('users/booths/follows');
  },
  removeFromFollowRequest({getters}, data){
  return getters.axios.delete(`users/booths/${data.booth_id}/unfollow`);
  },
  sendRateRequsest({getters}, data){
  return getters.axios.post(`users/booths/${data.id}/rate`, data);
  },
  getSellers({getters}, data){
  return getters.axios.get(`sellers?page=${data.page}`);
  },
  getTopSellers({getters}, data){
  return getters.axios.get(`sellers?Top_sellers=1`);
  },
  getSellerValues({getters}, data){
  return getters.axios.get(`sellers/${data.id}`);
  },
  getSellerBooths({getters}, data){
  return getters.axios.get(`sellers/${data.id}/booths`);
  },
  getSellerProducts({getters}, data){
  return getters.axios.get(`sellers/${data.id}/products`);
  },getBoothValues({getters}, data){
  return getters.axios.get(`booths/${data.id}`);
  },
  getBoothProducts({getters}, data){
  return getters.axios.get(`booths/${data.id}/products`);
  },
  addToCartRequest({getters}, data){
  return getters.axios.post(`users/carts`, data);
  },
  getCartValues({getters}){
  return getters.axios.get(`users/carts`);
  },
  editCart({getters}, data){
  return getters.axios.patch(`users/carts`, data);
  },
  getProfileValues({getters}){
  return getters.axios.get(`users/me`);
  },

  // address
  getAddressesRequest({getters}){
    return getters.axios.get(`users/addresses`);
  },
  createAddressRequest({getters},data){
    return getters.axios.post('users/addresses',data)
  },
  changeDeafualtAddressReauest({getters},data){
    data.is_default =1;
    console.log(data);
    return getters.axios.patch(`users/addresses/${data.id}`, data)
  },
  getDeliveriesRequest({getters}){
  return getters.axios.get(`delivery_methods`);
  },
  getCitiesRequest({getters}, data){
    console.log(data);
  return getters.axios.get(`states/${data.id}`);
  },
  getStatesRequest({getters}){
  return getters.axios.get(`states`);
  },
  editProfileRequest({getters}, data){
  return getters.axios.patch(`users/me/update_profile`, data);
  },
  editProfilePictureRequest({getters}, data){
  return getters.axios.post(`users/me/update_profile_picture`, data);
  },
  //paymant
  getPaymentsRequest({getters}){
  return getters.axios.get(`payment_methods`);
  },
  //orders
  getOrdersRequest({getters}){
  return getters.axios.get(`users/orders?all=1`);
  },
  getOrderByCodeRequest({getters}, data){
  return getters.axios.get(`users/orders?code=${data.code}`);
  },
  getOrderValuesRequest({getters}, data){
  return getters.axios.get(`users/orders/${data.id}`);
  },
  submitOrderRequest({getters}, data){
  return getters.axios.post(`users/orders`, data);
  },
  verifyDiscountCodeRequest({getters}, data){
  return getters.axios.post(`users/orders/${data.id}/discount`, data);
  },
  getPaymentOrderRequest({getters}, data){
  return getters.axios.post(`users/orders/${data.id}/pay`,data);
  },
  //contactus
  getSubjectsRequest({getters}){
  return getters.axios.get('contact_us/subjects');
  },
  createMassageRequest({getters}, data){
  return getters.axios.post('contact_us',data);
  },

  }
