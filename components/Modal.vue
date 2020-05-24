<template>
  <dialog class="dialog" :open="isOpen">
    <div class="dialog-header">
      <h1 class="shop-title" v-if="getShopInfo">{{getShopInfo.name}}</h1>
      <h2 class="shop-title" v-if="getShopInfo">{{getShopInfo.access.line}} {{getShopInfo.access.station}} 徒歩 {{getShopInfo.access.walk}} 分</h2>
    </div>
    <div class="dialog-body">
      <div class="shop-images" v-if="getShopInfo">
        <h2 v-if="getShopInfo.image_url.shop_image1 || getShopInfo.image_url.shop_image2">店舗イメージ：</h2>
        <img :src="getShopInfo.image_url.shop_image1" alt="shopimage1" v-if="getShopInfo.image_url.shop_image1">
        <img :src="getShopInfo.image_url.shop_image2" alt="shopimage2" v-if="getShopInfo.image_url.shop_image2">
      </div>
      <div class="shop-detail" v-if="getShopInfo">
        <h2>詳細情報：</h2>
        <p>{{getShopInfo.pr.pr_long}}</p>
      </div>
      <div class="shop-other" v-if="getShopInfo">
        <div class="shop-other-infomation">TEL：{{getShopInfo.tel}}</div>
        <div class="shop-other-infomation">住所 : {{getShopInfo.address}}</div>
        <div class="shop-other-infomation">休日：{{getShopInfo.holiday}}</div>
      </div>
    </div>
    <div class="dialog-footer">
      <div class="close-btn" @click="closeModal()">close</div>
    </div>
  </dialog>
</template>

<style lang="scss" scoped>
@import 'assets/scss/color.scss';
.dialog {
  padding: 0;
  border: 0.5px solid $main;
  border-radius: 0.6rem;
  width: 50vw;
  height: 80vh;
  box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.32);/*影*/
  margin: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  h1 {
    color: $main;
    margin: 4px 0px;
    padding: 0.5em 0;
    font-size: 20px;
    text-align: center;
    text-align: left;
    line-height: 0px;
  }
  h2 {
    color: $main;
    margin: 4px 0px;
    padding: 0.5em 0;
    font-size: 16px;
    text-align: center;
    text-align: left;
    line-height: 0px;
  }
  &-header {
    height: 10%;
    padding: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .shop-title {
      line-height: 100%;
    }
  }
  &-body {
    position: relative;
    height: 80%;
    padding: 1em;
    border-top: solid 0.1px $main;
    border-bottom: solid 0.1px $main;
    background: $base;
    overflow-y: auto;
    .shop-detail {
      p {
        margin: 0;
        padding: 1em;
      }
    }
    .shop-other {
      &-infomation {
        height: 28px;
        margin: 12px;
        padding: 4px;
        border-left: solid 6px $strong;
        overflow-y: auto;
      }
    }
  }
  &-footer {
    height: 10%;
    padding: 1em;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .close-btn {
      width: 15%;
      height: 48px;
      line-height: 48px;
      text-align: center;
      border: solid 2px $mild;
      border-radius: 3px;
      transition: .4s;
      background: $mild;
      color: white;
      &:hover {
        cursor: pointer;
        color: $mild;
        background:  $site;
      }
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      open: true
    }
  },
  created() {
  },
  mounted() {
    // console.log('getShopInfo', this.getShopInfo)
  },
  computed: {
    getShopInfo() {
      if(this.$store.getters['api/getShopInfo'].rest) {
        return this.$store.getters['api/getShopInfo'].rest[0]
      }
    },
    isOpen() {
      return this.$store.getters['modal/isOpenModal']
    }
  },
  methods: {
    closeModal() {
      this.$store.commit('modal/setModalState', false)
    }
  }
}
</script>


