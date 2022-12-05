/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/',
    view: 'SignIn'
  },
  {
        path: '/mainstore',
        view:'MainStore'
  },
  {
      path: './'
  },
  {
// <<<<<<< HEAD
        path: '/seller/show',
        view:'SellerPage'
      },{
// =======
        path: '/product/list',
        view:'ProductListPage'
// >>>>>>> feature/feature_product_page
},
{
// =======
  path: '/profile',
  view:'Profile'
// >>>>>>> feature/feature_product_page
},

]
