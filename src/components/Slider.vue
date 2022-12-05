<template lang="html">
  <div >

  <div id="carouselExampleIndicators " class="mx-2 carousel slide " data-ride="carousel" >
  <!-- <ol class="carousel-indicators mb-5"  >
    <li v-for="(img, k) in images" data-target="#carouselExampleIndicators" :data-slide-to="k" v-bind:class="{active: (current_img == k)}" @click="changePage(k)"></li>
  </ol> -->
  <div class="carousel-inner ">
    <div v-for="(img,k) in images" class="carousel-item  slider-img  h-100" v-bind:class="{active: (current_img == k)}">
      <img class="d-block w-100  h-100  slider-img " :src="img.image_url" alt="Slider image" >
    </div>
    <div class="row">
    <div class="col-4 mr-4 text-light text-right des-slider  position-absolute">
      <!-- <h2 class="mb-4">به کالومین خوش آمدید</h2> -->
      <!-- <p style="font-size:20px;"> لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</p> -->
    </div>
  </div>

  </div>
</div>

</div>
</template>

<script>
export default {
  data: () => ({
    current_img: 0
  }),
  props: {
    images: {
      required: true
    }
  },
  methods: {
    changePage(k) {
      this.current_img = k;
    }
  }
}
</script>

<style lang="css" scoped>
@media (max-width: 70em) {
  .slider-img{
    border-radius: 20px  !important;
  }
  .des-slider{
    display: none;
  }
  .carousel-inner{
    height: 300px !important;
    overflow: hidden;
  }
}
.des-slider{
  top: 15%;
}
.slider-input {
  border: 0;
  /* height: 50px; */
  left: 5%;
  bottom: 50%;
  background-color: white;
  z-index: 1;
  overflow: hidden;
}
.carousel-indicators{
  z-index: 2;
}
.slider-input input::placeholder {
  font-size: 15px;
  background-color: white;
  border:0;
}
.slider-input input{
  border:0;
}
.input-group-text {
  border: 0;
  font-size: 1.8em !important;
  color: #000;
  vertical-align: center;
}
.carousel-inner{
  height: 575px;
  overflow: hidden;
}
.carousel-indicators li{
  border-radius: 100%;
  height:10px;
  width:10px;
  background-color: transparent;
  border:1px solid;
}
.slider-img{
  border-radius: 10px 10px 45% 45%;
  /* filter: brightness(70%); */
}
.carousel-indicators li:focus{
  background-color: #000;
  border:20px solid #000;

}
</style>
