<template lang="html">
  <div class="content_detail__pagination cdp" actpage="1">
			<a href="#!-1" class="cdp_i mx-2" @click="(pnPage(-1))">قبلی</a>
			<a v-for="page in pages" v-bind:href="'#!'+page" class="cdp_i mx-2" @click="changePage(page)">{{page}}</a>
			<a href="#!+1" class="cdp_i mx-2"   @click="(pnPage(1))">بعدی</a>
		</div>
</template>


<!-- this javascript is only to change the "actpage" attribut on the .cdp div -->


<script >
import $ from 'jquery'

export default {
  props: {
    pages: {
      required: true,
    }
  },
  data: () => ({
    currentPage: 1
  }),
  methods: {
    setAttr() {
      var paginationPage = parseInt($('.cdp').attr('actpage'), 10);
      $('.cdp_i').on('click', function() {
        var go = $(this).attr('href').replace('#!', '');
        if (go === '+1') {
          paginationPage++;
        } else if (go === '-1') {
          paginationPage--;
        } else {
          paginationPage = parseInt(go, 10);
        }
        $('.cdp').attr('actpage', paginationPage);
      });
    },
    changePage(k) {
      if (this.currentPage != k) {
        this.currentPage = k;
        this.setAttr();
        this.$emit('changePage', this.currentPage);
      }
    },
    pnPage(k) {
      if (this.pages >= (this.currentPage + k)) {
        this.currentPage += k;
        this.setAttr();
        this.$emit('changePage', this.currentPage);
      }
    }
  }

}
</script>
<style lang="scss" scoped>
body {
    background: #333;
    font-family: sans-serif;
    overflow: hidden;
}

@keyframes cdp-in {
    from {
        transform: scale(1.5);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

.cdp {
    position: relative;
    text-align: center;
    padding: 20px 0;
    font-size: 0;
    z-index: 6;
    margin: 50px 0;

    animation: cdp-in 500ms ease both;
    animation-timeout: 200ms;

    &_i {
        font-size: 14px;
        text-decoration: none;

        transition: background 250ms;

        display: inline-block;
        text-transform: uppercase;
        margin: 0 3px 6px;
        height: 38px;
        min-width: 38px;
        border-radius: 38px;
        // border: 2px solid #fff;
        line-height: 38px;
        padding: 0;
        color: #000;
        font-weight: 700;
        letter-spacing: 0.03em;
        display: none;

        &:first-child,
        &:last-child {
            padding: 0 16px;
            margin: 0 12px 6px;
        }

        &:last-child,
        &:nth-child(2),
        &:nth-last-child(2) {
            display: inline-block;
        }
    }

    &_i:hover {
        background-color: #FA446C;
        color: #fff;
    }

    &:not([actpage="1"]) &_i:nth-child(1) {
        display: inline-block;
    }
}
@for $i from 1 through 80 {
    .cdp[actpage="#{$i}"] {
        // 3 before
        .cdp_i:nth-child(#{$i - 2}):not(:first-child):not(:nth-child(2)) {
            display: inline-block;
            pointer-events: none;
            color: transparent;
            border-color: transparent;
            width: 50px;
            &:after {
                content: '...';
                color: #fff;
                font-size: 32px;
                margin-left: -6px;
            }
        }
        // 2 before
        .cdp_i:nth-child(#{$i - 1}):not(:first-child) {
            display: inline-block;
        }
        // before
        .cdp_i:nth-child(#{$i}):not(:first-child) {
            display: inline-block;
        }
        // active
        .cdp_i:nth-child(#{$i + 1}) {
            background-color: #FA446C;
            color: #fff;
            display: inline-block;

            +.cdp_i:last-child {
                display: none !important;
            }
        }
        // next
        .cdp_i:nth-child(#{$i + 2}):not(:last-child) {
            display: inline-block;
        }
        // 2 next
        .cdp_i:nth-child(#{$i + 3}):not(:last-child) {
            display: inline-block;
        }
        // 3 next
        .cdp_i:nth-child(#{$i + 4}):not(:last-child):not(:nth-last-child(2)) {
            display: inline-block;
            pointer-events: none;
            color: transparent;
            border-color: transparent;
            width: 50px;
            &:after {
                content: '...';
                color: #fff;
                font-size: 32px;
                margin-left: -6px;
            }
        }
    }
}
</style>
