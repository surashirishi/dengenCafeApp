<template>
  <dialog class="dialog" :open="isOpen">
    <div class="dialog-header">
      <div class="shop-title" v-if="getShopInfo">店名：{{getShopInfo.name}}</div>
      <div class="shop-hours">営業時間：１０月２１日〜</div>
    </div>
    <div class="dialog-body">
      <div class="shop-title">店名：{{getShopInfo}}</div>
      <p>Finally, HTML has a native dialog box element! This is fantastic.</p>
      <p>And a polyfill makes this usable today.</p>
    </div>
    <div class="dialog-footer">
      <div class="close-btn" @click="closeModal()">close</div>
    </div>
  </dialog>
</template>

<style lang="scss" scoped>
.dialog {
  padding: 0;
  border: 0;
  border-radius: 0.6rem;
  width: 50vw;
  height: 80vh;
  box-shadow: 0 0 0.2em black;
  margin: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  &-header {
    height: 15%;
    padding: 1em;
    display: flex;
    .shop-title {
      align-items: flex-start;
    }
    .shop-hours {
      align-items: flex-end;
    }
  }
  &-body {
    height: 75%;
    padding: 1em;
    border-top: solid 0.1px #668ad8;/*破線 太さ 色*/
    border-bottom: solid 0.1px #668ad8;/*破線 太さ 色*/
  }
  &-footer {
    height: 10%;
    padding: 1em;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .close-btn {
      width: 15%;
      // height: 100%;
      height: 48px;
      line-height: 48px;
      text-align: center;
      border: solid 2px #67c5ff;
      border-radius: 3px;
      transition: .4s;
      background: #67c5ff;
      color: white;
      &:hover {
        cursor: pointer;
        color: #67c5ff;
        background: #ffffff;
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
    console.log('open', this.isOpen)
    console.log('mountget', this.$store.getters['api/getShopInfo'].rest !== true)
    console.log('getShopInfo', this.getShopInfo)
  },
  computed: {
    getShopInfo() {
      // return this.$store.getters['api/getShopInfo']
      if(this.$store.getters['api/getShopInfo'].rest) {
        return this.$store.getters['api/getShopInfo'].rest[0]
      }
    },
    isOpen() {
      return this.$store.getters['modal/isOpenModal']
    }
    // overlayClass() {
    // return this.$store.getters['modal/isOpenModal'] ? 'overlay' : ''
      // return $store.getters['api/getShopInfo'].rest[0]
    // }
  },
  methods: {
    closeModal() {
      this.$store.commit('modal/setModalState', false)
    }
  }
}
</script>


