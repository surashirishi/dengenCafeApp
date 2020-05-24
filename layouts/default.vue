<template>
  <div>
    <header>
      <h1>
        <a href="/">Hey there! 電源カフェ<img src="~/static/wifi-solid.svg" width="24" height="24" style="margin-left: 4px"></a>
      </h1>
      <nav class="pc-nav">
        <SelectBox @select="selectCity" :options="city23"/>
      </nav>
    </header>
    <nuxt/>
    <!-- ダイアログ -->
    <modal />
  </div>
</template>
<script>
import Modal from '~/components/Modal.vue'
import SelectBox from '~/components/Select.vue'

export default {
  components: {
    Modal,
    SelectBox
  },
  data() {
    return {
      city23: [
        '千代田区',
        '中央区',
        '港区',
        '新宿区',
        '文京区',
        '台東区',
        '墨田区',
        '江東区',
        '品川区',
        '目黒区',
        '大田区',
        '世田谷区',
        '渋谷区',
        '中野区',
        '杉並区',
        '豊島区',
        '北区',
        '荒川区',
        '板橋区',
        '練馬区',
        '足立区',
        '葛飾区',
        '江戸川区'
      ]
    }
  },
  methods: {
    selectCity(event) {
      this.$store.dispatch('api/apiRequest', {
        api: 'restaurantIndex',
        params: {
          keyid: 'ee16c358353c48730bc3264ead7330a7',
          // keyid: process.env.GURUNAVI_KEY,
          freeword: 'カフェ',
          address: event.target.value,
          wifi: 1
        }
      }).then((res) => {
        // console.log('res', res)
        this.$store.commit('api/setRestaurantList', res.rest)
      })
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/color.scss';
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  body {
    margin: 0;
    padding: 0;
    font-family: "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", メイリオ, Meiryo, "ＭＳ Ｐゴシック", "Helvetica Neue", Helvetica, Arial, sans-serif;
    // background-color: #e6e6e6;
    header {
      width: 100%;
      padding: 30px 10% 10px;
      background-color:  $site;
      position: fixed;
      top: 0;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .container {
      margin: 100px auto;
    }
  }
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color:  $site;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color:  $site;
  background-color: #35495e;
}

img {
  margin: 0 0;
}
</style>

