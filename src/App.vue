<template>
<div id="app" class="m-0 p-0">
  <!-- <img src="./assets/logo.png"> -->
  <navbar v-show="!this.$store.getters.onLoad && !( this.$route.path === '/verify')"></navbar>
  <!-- <singin></singin> -->
  <!-- <mainstore></mainstore> -->
  <router-view v-show="!this.$store.getters.onLoad" />
  <!-- <productpage></productpage> -->
  <load v-if="this.$store.getters.onLoad"></load>
  <footermenu v-if="!( this.$route.path === '/signin') && !( this.$route.path === '/cart') && !this.$store.getters.onLoad"></footermenu>


</div>
</template>

<script>
import NavBar from './components/NavBar'
import SignIn from './components/SignIn'
import MainStore from './components/MainStore'
import Footer from './components/Footer'
import ProductPage from './components/ProductPage'
import Cart from './components/Cart'
import PreLoaderPage from './components/PreLoaderPage'
export default {
  data: () => ({}),
  name: 'App',
  components: {
    navbar: NavBar,
    footermenu: Footer,
    load: PreLoaderPage,


  },
  methods: {

  },

  mounted() {}
}
</script>

<style>
@media print {
  body * {
    visibility: hidden;
  }

  #section-to-print,
  #section-to-print * {
    visibility: visible;
  }

  #section-to-print {
    position: absolute;
    left: 0;
    top: 0;
  }
}

#app {
  overflow-x: hidden !important;
  /* width: 100vw !important; */
  /* width: 100vw+2em; */
  /* overflow-x: hidden; */
  /* overflow: hidden; */
  /* font-size: 100em; */
  /* min-height: 70vw; */
}


.pale-blue {
  color: #4ac3d4;
}

.soft-black {
  color: #515151;
}


#app {
  /* font-family: iranyekan !important; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f2f2f2;
  margin-top: 60px;
}

@font-face {
  font-family: 'IRANSans';
  font-style: normal;
  font-weight: normal;
  src: url('./fonts/IRANSansWeb(FaNum).woff2') format('woff2'),
    /* FF39+,Chrome36+, Opera24+*/
    url('./fonts/IRANSansWeb(FaNum).woff') format('woff'),
    /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
    url('./fonts/IRANSansWeb(FaNum).ttf') format('truetype');
}

.special-pink {
  background-color: #fd446d;
  color: white;
}

.text-special-pink {
  color: #fd446d;
}

input {
  text-indent: 10px;
}

.center-h {
  position: relative;
}

.center-h .center-h-el {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0%, -50%);
}

.center {
  position: relative;
}

.center .center-el {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.light-weight-text {
  font-size: 12px
}

.link-text {
  color: #6C6F73;
  font-size: 12px;
  text-decoration: none;
  font-weight: bold;
  border-right: 0;
  border-left: 0;
  border-top: 0;
  background-color: inherit;
  border-bottom: .3px solid #6C6F73;
}

@media (max-width: 48em) {
  .link-text {
    font-size: 10px !important;
  }
}

.pureblack {
  color: #000;
}

.text-muted-normal {
  color: #9d9d9d;
}

.title-button {
  background-color: #2A2A2A;
  color: white;
  width: 260px;
  z-index: 1;
  position: relative;
  font-weight: bold;
  font-size: 25px
}

.common-buttons:hover {
  background-color: white;
  color: #FD446D !important;
  border: 1px solid #fd446d;
  transition: background-color 5s;
  transition: color 0.5s;
  transition: border 0.5s;
}

@media (max-width: 48em) {
  .title-button {
    font-size: 0.8em;
    width: 120px;
    margin-top: -1.2em !important;
  }
}

.g-line {
  display: block;
  width: 100%;
  height: 3.5px;
  background-image: linear-gradient(to right, #C4C4C4, rgb(245, 245, 245), #C3C3C3);
}

/* remove arrow from number inputs */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}

/* remove deafualt blue  shadow bootstrap */
textarea:hover,
input:hover,
textarea:active,
input:active,
textarea:focus,
input:focus,
button:focus,
button:active,
button:hover,
label:focus,
.btn:active,
.btn.active {
  outline: 0px !important;
  -webkit-appearance: none;
  box-shadow: none !important;
}

/* radio buttons css  */

[type="radio"]:checked,
[type="radio"]:not(:checked) {
  display: none;
}

[type="radio"]:checked+label,
[type="radio"]:not(:checked)+label {
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  line-height: 20px;
  display: inline-block;
  color: #666;
}

[type="radio"]:checked+label:before,
[type="radio"]:not(:checked)+label:before {
  content: '';
  /*     position: absolute; */
  left: 0;
  float: right;
  margin-left: 10px;
  top: 0;
  width: 18px;
  height: 18px;
  border: 1.5px solid #aaa;
  border-radius: 100%;
  background: #fff;
}

[type="radio"]:checked+label:after,
[type="radio"]:not(:checked)+label:after {
  content: '';
  width: 12px;
  height: 12px;
  background: #47B8D6;
  position: absolute;
  float: right;
  /* margin-left:20px; */
  z-index: 2;
  top: 3px;
  left: 0px;
  right: 3px;
  border-radius: 100%;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

[type="radio"]:not(:checked)+label:after {
  opacity: 0;
  -webkit-transform: scale(0);
  transform: scale(0);
}

[type="radio"]:checked+label:after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}



/* The snackbar - position it at the bottom and in the middle of the screen */
.show-snack {
  visibility: visible !important;
  /* Show the snackbar */
  /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
However, delay the fade out process for 2.5 seconds */
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

#snackbar {
  z-index: 3;
  visibility: hidden;
  /* Hidden by default. Visible on click */
  min-width: 250px;
  /* Set a default minimum width */
  margin-left: -125px;
  /* Divide value of min-width by 2 */
  background-color: #333;
  /* Black background color */
  color: #fff;
  /* White text color */
  text-align: center;
  /* Centered text */
  border-radius: 2px;
  /* Rounded borders */
  padding: 16px;
  /* Padding */
  position: fixed;
  /* Sit on top of the screen */

  left: 50%;
  /* Center the snackbar */
  bottom: 30px;
  /* 30px from the bottom */
  color: #cdc367;
  border-radius: 50px;
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
#snackbar.show {
  visibility: visible;
  /* Show the snackbar */
  /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
However, delay the fade out process for 2.5 seconds */
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }

  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }

  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }

  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }

  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>
<!-- <style lang="css" src="../src/styles/fonts/iranyekan/web/css/fontiran.css"></style> -->
<!-- <style lang="css" src="../src/styles/fonts/iranyekan/web/css/style.css"></style> -->
<style lang="css" src="../src/icons/css/all.min.css"></style>
