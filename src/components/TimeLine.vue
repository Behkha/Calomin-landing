<template lang="html">
  <div class=" d-block">


<ul class="timeline p-0" id="timeline">
  <li v-for="(time, k) in times" :key="k" class="li " v-bind:class="{complete: (k < status-1)}">
    <div class="timestamp">
    </div>
    <div class="status mx-auto text-right">
      <h6 class="pt-3">{{time.title}}</h6>
    </div>
  </li>
 </ul>
</div>
</template>

<script>
export default {
  props: {
    status
  },
  data: () => ({
    times: [{
        title: "ثبت شده"
      },
      {
        title: "تایید "
      }, {
        title: "آماده سازی "
      }, {
        title: "ارسال"
      }, {
        title: "تحویل داده شده"
      }
    ]
  })
}
</script>

<style lang="css" scoped>
h6{
  font-size: 0.7em;
}
.timeline {
list-style-type: none;
display: flex;
align-items: center;
justify-content: center;
}

.li {
transition: all 200ms ease-in;
}
@media (max-width:90em) {
  .status {
  padding: 0px 20px !important;
  transition: 1s padding;
}
h6{
  font-size: 0.4em
}

}
@media (max-width:48em) {
  .status {
  padding: 0px 15px !important;
  transition: 1s padding;
}

}
.timestamp {
margin-bottom: 15px;
display: flex;
flex-direction: column;
align-items: center;
font-weight: 100;
}

.status {
padding: 0px 30px;
display: flex;
justify-content: center;
border-top: 2px solid #D6DCE0;
position: relative;
transition: all 200ms ease-in;
}
.status h6 {
font-weight: 600;
}
.status:before {
content: "";
width: 25px;
height: 25px;
background-color: white;
border-radius: 25px;
border: 1px solid #ddd;
position: absolute;
top: -15px;
left: 42%;
transition: all 200ms ease-in;
}

.li.complete .status {
border-top: 2px solid #66DC71;
}
.li.complete .status:before {
background-color: #66DC71;
border: none;
transition: all 200ms ease-in;
}
.li.complete .status h6 {
color: #66DC71;
}

@media (max-width: 48em){
  /* h6{
    font-size: 10px;
  } */
/* .timeline {
  list-style-type: none;
  display: block;
} */
/*
.li {
  transition: all 200ms ease-in;
  display: flex;
  width: inherit;
} */

.timestamp {
}

/* .status:before {
  left: -8%;
  top: 30%;
  transition: all 200ms ease-in;
} */
}
html, body {
width: 100%;
height: 100%;
display: flex;
justify-content: center;
font-family: "Titillium Web", sans serif;
color: #758D96;
}



#toggleButton {
position: absolute;
left: 50px;
top: 20px;
background-color: #75C7F6;
}

</style>
