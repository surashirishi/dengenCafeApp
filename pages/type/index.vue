
<template>
  <div class="container" v-if="!notFoundRestaurant">
    <div
      v-for="(rest, index) in restaurantList" :key="index"
      class="content"
    >
    <div class="content-image">
      <div class="ribbon-wrapper">
        <div class="ribbon">
          <h3>{{rest.name}}</h3>
        </div>
      </div>
      <img
        v-if="rest.image_url.shop_image1 !== ''"
        :src="rest.image_url.shop_image1"
        alt="restaurant image"
        width="300px"
        height="300px"
      >
      <img
        v-else
        src="~/assets/images/noimage.png"
        alt="restaurant no-image"
        width="300px"
        height="300px"
      >
    </div>
    <div class="content-detail">
      <div class="content-detail-instance">最寄り駅：{{rest.access.station}} (徒歩 {{rest.access.walk}} 分）</div>
      <div class="content-detail-instance">住所 : {{rest.address}}</div>
      <div class="content-detail-instance">クレジットカード：{{useCreditCard(rest.credit_card)}}{{rest.credit_card}}</div>
      <div class="content-detail-instance">休日：{{rest.holiday}}</div>
      <div class="content-detail-instance">詳細：{{rest.pr.pr_short}}</div>
      <div class="content-detail-instance">TEL：{{rest.tel}}</div>
      <div class="content-detail-instance"><a :href="rest.url" target="_blank">URL：{{rest.url}}</a></div>
    </div>
    </div>
  </div>
  <div class="container" v-else>
    <div class="content">
      <h1>
        現在地から市町村を取得します。
      </h1>
    </div>
  </div>
</template>

<script>
import SuiVue from 'semantic-ui-vue';
export default {
  data() {
    return {
      isLoading: true,
      notFoundRestaurant: false,
      restaurantList: [],
      latitude: 0,
      longitude: 0,
      cityGetbyManually: ''
    }
  },
  created() {
    this.getLocation()
  },
  computed: {
  },
  methods: {
    getLocation () {
      if (process.client) {
        if (!navigator.geolocation) {
          alert('現在地情報を取得できませんでした。お使いのブラウザでは現在地情報を利用できない可能性があります。エリアを入力してください。')
          return
        }
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
        navigator.geolocation.getCurrentPosition(this.success, this.error, options)
      }
    },
    success (position) {
      this.latitude = position.coords.latitude
      this.longitude = position.coords.longitude
      this.getRestaurantIndex()
    },
    error (error) {
      switch (error.code) {
        case 1: //PERMISSION_DENIED
          alert('位置情報の利用が許可されていません')
          break
        case 2: //POSITION_UNAVAILABLE
          alert('現在位置が取得できませんでした')
          break
        case 3: //TIMEOUT
          break
        default:
          alert('現在位置が取得できませんでした')
          break
      }
    },
    getCurrentCity() {
      this.$store.dispatch('api/apiRequest', {
        api: 'getGeoLocation',
        params: {
          method: 'searchByGeoLocation',
          x: this.longitude,
          y: this.latitude
        }
      }).then((res) => {
        this.cityGetbyManually = res.response.location[0].city
        this.getRestaurantIndex()
      })
    },
    getRestaurantIndex() {
      let params = {}
      // 緯度・経度から店舗が見つからなかった場合には、市町村を取得し再検索
      if(this.notFoundRestaurant) {
        params = {
          keyid: 'ee16c358353c48730bc3264ead7330a7',
          freeword: 'カフェ',
          address: this.cityGetbyManually
        }
      } else {
        params = {
          keyid: 'ee16c358353c48730bc3264ead7330a7',
          freeword: 'カフェ',
          latitude: this.latitude,
          longitude: this.longitude
        }
      }
      console.log('param', this.params)
      this.$store.dispatch('api/apiRequest', {
        api: 'restaurantIndex',
        params: params
      }).then((res) => {
        this.restaurantList = res.rest
        this.notFoundRestaurant = false
        console.log('rest', this.restaurantList)
      }).catch((err) => {
        this.notFoundRestaurant = true
        this.getCurrentCity()
      })
    },
    useCreditCard(credit_card) {
      return credit_card.length > 0 ? '可  ' : '不可'
    },
  }
}
</script>
<style lang="scss">
.container {
  margin: 80px auto;
  // position: relative;
  // background-color: blue;
  .content {
    width: 80%;
    height: 400px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    // color: #668ad8;/*文字色*/
    border-top: dashed 2px #668ad8;/*破線 太さ 色*/
    background: #f1f8ff; /*背景色*/
    padding: 0.5em 0.5em 0.5em 2em;

    &-image {
      position: relative;
      width: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        border-radius: 15px;
      }
      .ribbon-wrapper {
        position: absolute;
        top: 4px;
        padding: 2px 0;
        width: 300px;
        background: #f1f1f1;
        .ribbon {
          display: inline-block;
          position: relative;
          box-sizing: border-box;
          padding: 5px 0;
          margin: 0 0 0 -20px;
          width: calc(100% + 20px);
          color: white;
          background: #70a6ff;
          box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
          h3{
            margin: 0;
            padding: 0 30px 0 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            border-top: dashed 1px #FFF;
            border-bottom: dashed 1px #FFF;
            font-size: 20px;
            line-height: 46px;
          }
          &:after {
            position: absolute;
            content: '';
            z-index: 1;
            top: 0;
            right: 0;
            width: 0px;
            height: 0px;
            border-width: 30px 15px 30px 0px;
            border-color: transparent #f1f1f1 transparent transparent;
            border-style: solid;
          }
          &:before {
            position: absolute;
            content: '';
            top: 100%;
            left: 0;
            border: none;
            border-bottom: solid 15px transparent;
            border-right: solid 20px #6081b7;
          }
        }
      }
    }
    &-detail {
      width: 70%;
      height: 300px;
      &-instance {
        height: 28px;
        margin: 12px;
        padding: 4px;
        border-left: solid 6px #2d8fdd;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .rest-name {

    }
  }
}
</style>
