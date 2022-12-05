<template lang="html">
  <div id="module" class="container-fluid  ">
  <!-- <h3 class="border-after3 pb-3 mb-3 ">بیوگرافی</h3> -->
  <p class="collapse text-muted description" id="collapseExample" aria-expanded="false">{{item}}
  </p>
  <!-- <div class="collaps-link">

  </div> -->
  <a role="button" class="collapsed text-center d-block font-weight-bold text-dark  nav-link" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample"></a>
</div>

</template>

<script>
export default {
  props: {
    item: {
      type: String
    }
  },
  mounted() {
    console.log(this.item);
  }
}
</script>

<style lang="css" scoped>
.description{
  white-space: pre-wrap;
  text-align:center;
}
#module p{
}
.collaps-link{
color:black;
margin-top: -45px;
padding-top:45px;
background-color: white;
opacity: 0.7;
}
.collaps-link a{
opacity:1;
color: black;
}
#module a.collapsed:after {
content: 'نمایش بیشتر';
color:black;
font-size: 1.5em;
opacity: 1;
}

#module a:not(.collapsed):after {
content: 'بستن';
font-size: 1.5em;

}

#module #collapseExample.collapse:not(.show) {
display: block;
/* height = lineheight * no of lines to display */
height:3.5em;
overflow: hidden;
}
#module #collapseExample.collapsing {
height:3.5em;
}
@media (max-width:48em) {
  #module a.collapsed:after {
  font-size: 1em;
  }
  #module a:not(.collapsed):after {
  content: 'بستن';
  font-size: 1em;
  }
  p{
    font-size: 0.7em;
  }
}
</style>
