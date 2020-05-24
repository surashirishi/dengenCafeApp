
<template>
  <div class="container" v-if="!notFoundCount < 2 && $store.getters['api/getRestaurantList'].restaurantList">
    <div
      v-for="(rest, index) in $store.getters['api/getRestaurantList'].restaurantList" :key="index"
      class="content"
    >
      <div class="content-image" @click="setModal(rest.id)">
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
        <div class="content-detail-footer" @click="setModal(rest.id)">詳細を確認する</div>
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
export default {
  data() {
    return {
      isLoading: true,
      notFoundRestaurant: false,
      notFoundCount: 0,
      latitude: 0,
      longitude: 0,
      cityGetbyManually: ''
    }
  },
  created() {
    this.getLocation()
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      if(this.notFoundCount < 2 && this.$store.getters['api/getRestaurantList'].restaurantList) {
        this.$router.push('/error')
      }
      setTimeout(() => this.$nuxt.$loading.finish(), 5000)
    })
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
        if (res) {
          this.cityGetbyManually = res.response.location[0].city
          this.getRestaurantIndex()
        }
      })
    },
    getRestaurantIndex() {
      if (this.notFoundCount > 2) {
        this.notFoundCount = 0
        this.$router.push('/error')
        return
      }
      let params = {}
      // 緯度・経度から店舗が見つからなかった場合には、市町村を取得し再検索
      if(this.notFoundRestaurant) {
        params = {
          keyid: process.env.GURUNAVI_KEY,
          freeword: 'カフェ',
          address: this.cityGetbyManually,
          wifi: 1
        }
      } else {
        params = {
          keyid: process.env.GURUNAVI_KEY,
          freeword: 'カフェ',
          latitude: this.latitude,
          longitude: this.longitude,
          wifi: 1
        }
      }
      this.$store.dispatch('api/apiRequest', {
        api: 'restaurantIndex',
        params: params
      }).then((res) => {
        this.$store.commit('api/setRestaurantList', res.rest)
        // this.restaurantList = res.rest
        this.notFoundRestaurant = false
        this.notFoundCount = 0
      }).catch((err) => {
        this.notFoundRestaurant = true
        this.notFoundCount += 1
        this.getCurrentCity()
      })
    },
    useCreditCard(credit_card) {
      return credit_card.length > 0 ? '可  ' : '不可'
    },
    setModal(shop_id) {
      this.$store.dispatch('api/apiRequest', {
        api: 'restaurantIndex',
        params: {
          keyid: process.env.GURUNAVI_KEY,
          id: shop_id
        }
      }).then((shopinfo) => {
        this.$store.commit('api/setShopInfo', shopinfo)
        this.$store.commit('modal/setModalState', true)
      })
    }
  }
}
</script>
<style lang="scss">
@import 'assets/scss/color.scss';
.container {
  .content {
    width: 80%;
    height: 400px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-top: dashed 2px #668ad8;
    background: $base;
    padding: 0.5em 0.5em 0.5em 2em;

    &-image {
      position: relative;
      width: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
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
            border-top: dashed 1px $site;
            border-bottom: dashed 1px $site;
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
            border-right: solid 20px $main;
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
        border-left: solid 6px $strong;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &-footer {
        color: $main;
        font-size: 1.2em;;
        font-weight: bold;
        cursor: pointer;
        &:after {
          content: '＞＞'
        }
      }
    }
  }
}
</style>
