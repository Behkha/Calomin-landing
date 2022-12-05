<template>
<ul class="vuejs-countdown px-3 py-1" style="direction: ltr;">
  <li v-if="days > 0">
    <p class="digit px-4">{{ days | twoDigits }}</p>
    <p class="text">روز</p>
  </li>
  <li>
    <p class="digit px-4">{{ hours | twoDigits }}</p>
    <p class="text">ساعت</p>
  </li>
  <li>
    <p class="digit px-4">{{ minutes | twoDigits }}</p>
    <p class="text">دقیقه</p>
  </li>
  <li>
    <p class="digit px-4">{{ seconds | twoDigits }}</p>
    <p class="text">ثانیه</p>
  </li>
</ul>
</template>

<script>
let interval = null;

export default {
  name: 'vuejsCountDown',
  props: {
    // deadline: {
    //   type: String
    // },
    // end: {
    //   type: String
    // },
    time: {
      type: Number
    },
    stop: {
      type: Boolean
    }
  },
  data() {
    return {
      now: Math.trunc((new Date()).getTime() / 1000),
      date: null,
      isRunning: false,
      interval: null,
      diff: 0
    }
  },
  created() {
    this.diff = this.time
    // if (!this.deadline && !this.end) {
    //   throw new Error("Missing props 'deadline' or 'end'");
    // }

    // let endTime = this.deadline ? this.deadline : this.end;
    // this.date = Math.trunc(Date.parse(endTime.replace(/-/g, "/")) / 1000);

    // if (!this.date) {
    //   throw new Error("Invalid props value, correct the 'deadline' or 'end'");
    // }
    this.toggleTimer()
    // interval = setInterval(() => {
    //   this.now = Math.trunc((new Date()).getTime() / 1000);
    // }, 1000);
  },
  computed: {
    seconds() {
      return Math.trunc(this.diff) % 60
    },

    minutes() {
      return Math.trunc(this.diff / 60) % 60
    },

    hours() {
      return Math.trunc(this.diff / 60 / 60) % 24
    },

    days() {
      return Math.trunc(this.diff / 60 / 60 / 24)
    }
  },
  methods: {
    toggleTimer() {
      if (this.isRunning) {
        clearInterval(this.interval);
      } else {
        // alert('dd')
        this.interval = setInterval(this.incrementTime, 1000);
      }
      this.isRunning = !this.isRunning
    },
    incrementTime() {
      if (this.diff > 0)
        this.diff = parseInt(this.diff) - 1;

    },
  },
  watch: {
    now(value) {
      // this.temp = this.date - this.now;
      // this.deff -= 1
      if (this.diff <= 0 || this.stop) {
        this.diff = 0;
        // Remove interval
        clearInterval(interval);
      }
    }
  },
  filters: {
    twoDigits(value) {
      if (value.toString().length <= 1) {
        return '0' + value.toString()
      }
      return value.toString()
    }
  },
  destroyed() {
    clearInterval(interval);
  }
}
</script>
<style>
.vuejs-countdown {
  background-color: white;
  border-radius: 20px;
  padding: 0;
  margin: 0;
}

.vuejs-countdown li {
  display: inline-block;
  margin: 0 8px;
  text-align: center;
  position: relative;
}

.vuejs-countdown li p {
  margin: 0;
}

.vuejs-countdown li:after {
  content: ":";
  position: absolute;
  top: 5px;
  right: -13px;
  font-size: 32px;
}

.vuejs-countdown li:first-of-type {
  margin-left: 0;
}

.vuejs-countdown li:last-of-type {
  margin-right: 0;
}

.vuejs-countdown li:last-of-type:after {
  content: "";
}

.vuejs-countdown .digit {
  font-size: 32px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 0;
}

@media (max-width: 48em) {
  .vuejs-countdown .digit {
    font-size: 12px;
  }

  .vuejs-countdown li:after {
    content: ":";
    position: absolute;
    top: -5px;
    right: -7px;
    font-size: 25px;
  }

  .vuejs-countdown li {
    margin: 10px 0;
  }
}

.vuejs-countdown .text {
  text-transform: uppercase;
  margin-bottom: 0;
  font-size: 10px;
}
</style>
