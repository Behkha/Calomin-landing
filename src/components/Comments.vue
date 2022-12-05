<template lang="html">
  <div class="outer-container px-5 py-3 container-fluid text-right bg-light " style="max-width: 1300px;   ">
    <div class="row py-2 comment-container" v-for="comment in show_comments">
      <div class="detail-container">
        <img class="opinion-img float-right" src="../images/actors.jpg" alt="">
        <div class="float-right">
        <h5 class=" font-weight-bold  pureblack">{{comment.commented_by.name}}</h5>
        <span class=" creted_at pr-2" >{{comment.created_at}}</span>
        </div>
      </div>
      <div class=" my-auto  opinion-container  ">
        <p class="my-auto " >{{comment.body}}</p>
      </div>
    </div>
    <div class="input-group mt-3 row " >
      <input v-model="new_comment" class="comment-input form-control" placeholder="نظر خود را ثبت کنید" aria-label="comment" type="text" name="button" aria-describedby="basic-addon1" @keyup.enter="sendComment()"></input>
      <div class="input-group-prepend">
        <span class="input-group-text w-100 input-icon" id="basic-addon1" @click="sendComment()"><i class="fab fa-telegram-plane mx-auto" v-if="!loader"></i> <i class="loader" v-if="loader"></i></span>
      </div>
    </div>
    <!-- <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">@</span>
  </div>
  <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
</div> -->
    <button v-if="show" class=" d-block mx-auto mt-5 load-text font-weight-bold"  @click="increasComments()">مشاهده سایر موارد</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    new_comment: '',
    counter_comments: 4,
    comments: [],
    loader: false
  }),
  props: {
    item: {},
    type: {}
  },
  methods: {
    sendComment() {
      this.loader = true
      if (this.type == 'booths') {
        this.$store.dispatch('sendBoothCommentRequest', {
          'body': this.new_comment,
          'id': this.item.id,
          'type': this.type
        }).
        then(response => {
          this.getCommments()
          this.new_comment = ''
          this.counter_comments++;
          this.loader = false
        })
      } else {
        this.$store.dispatch('sendCommentRequest', {
          'body': this.new_comment,
          'id': this.item.id,
          'type': this.type
        }).
        then(response => {
          this.getCommments()
          this.new_comment = ''
          this.counter_comments++;

        })
      }
    },
    getCommments() {
      if (this.type == "booths") {
        this.$store.dispatch('getBoothCommentsRequest', {
          type: this.type,
          id: this.item.id
        }).
        then(response => {
          this.comments = response.data.data
          this.loader = false

        })
      } else {
        this.$store.dispatch('getCommentsRequest', {
          type: this.type,
          id: this.item.id
        }).
        then(response => {
          this.comments = response.data.data
          this.loader = false


        })
      }
    },
    increasComments() {
      if ((this.comments.length) > (this.counter_comments + 4))
        this.counter_comments += 4;
      else
        this.counter_comments = this.comments.length;
    }

  },
  computed: {
    show_comments() {
      return this.comments.slice(0, this.counter_comments)
    },
    show() {
      if ((this.counter_comments != this.comments.length) && (this.comments.length > 4))
        return true
      else
        return false

    }
  },
  mounted() {
    this.getCommments()
  }
}
</script>

<style lang="css" scoped>
.loader {
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #636363;
  width: 30px;
  height: 30px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.detail-container{
  font-size: 0.8em;
  padding-left: 5em;
}
.left-text {
  color: #648585;
  font-size: 1em;
  text-decoration: none;
  line-height: 1.5em;
  border-bottom: 1.1px solid #648585;
  font-weight: normal;
}
.load-text {
  color: #648585;
  font-size: 1.2em;
  text-decoration: none;
  font-weight: normal;
  border: 0;
  background-color: white;
}
  .outer-container{
    border-radius: 1em;
    border:1.5px solid #d7d7d7;
    background-color: #fff !important;
  }
  .opinion-img{
    width: 5em;
    height: 5em;
    border-radius: 100%;
  }
  .comment-container::after{
    content: ' ';
    display: block;
    width: 90%;
    /* margin-top: 1em; */
    margin: 1em auto 0 auto;
    height: 2px;
     background-color: #DEDEDE;
  }
  .comment-input {
  border: 0;
  border-radius: 0;
  background-color: #f7f7f7 !important;
  text-indent: 10px;
  height: 3.8em;
   box-shadow:  0px 0px 0px ;
  }
  .input-icon{
    padding-left: 1em;
    background-color: #f7f7f7;
    box-shadow:  0px 0px 0px ;
    cursor: pointer;
  }
  @media (max-width:48em) {
    .outer-container{
      padding: 1em !important;
    }
    h5{
      font-size: 0.8em;
      margin-bottom: 0;
    }
    .creted_at{
      font-size: 0.6em;
    }
    .opinion-container p{
      font-size: 0.6em;
    }
    .detail-container{
      padding-left: 1em;
    }
    .opinion-img{
      width:3em;
      height: 3em;
    }
    .input-group{
      margin: 0;
    }
    .comment-input {
    height: 3em;
    }
    .comment-input::placeholder{
      font-size: 0.7em;
    }
  }
</style>
