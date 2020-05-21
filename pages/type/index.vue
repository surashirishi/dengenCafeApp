
<template>
  <div class="container">
    <h1>カフェのindexページ</h1>
    <sui-grid :columns="4">
      <sui-grid-column v-for="(rest, index) in restaurantList" :key="index" class="content-card">
        <sui-card class="fluid">
      <!-- <div v-for="(rest, index) in restaurantList" :key="index" class="content-card"> -->
        <!-- <sui-card> -->
          <sui-card-content>
            <sui-image
              :src="rest.image_url.shop_image1"
              shape="circular"
              size="mini"
            />
            {{rest.name}}
            <sui-card-meta slot="right">14h</sui-card-meta>
          </sui-card-content>
          <sui-image :src="rest.image_url.shop_image1" />
          <sui-card-content>
            <span slot="right"> <sui-icon name="heart outline" /> 17 likes </span>
            <sui-icon name="comment" /> 3 comments
          </sui-card-content>
          <sui-card-content extra>
            <sui-input
              placeholder="Add Comment"
              icon="heart outline"
              icon-position="left"
              transparent
            />
          </sui-card-content>
        </sui-card>
      <!-- </div> -->
    <!-- </div> -->
      </sui-grid-column>
    </sui-grid>
  </div>
</template>

<script>
import SuiVue from 'semantic-ui-vue';
export default {
  data() {
    return {
      restaurantList: [],
    }
  },
  mounted() {
    this.getRestaurantIndex()
  },
  methods: {
    getRestaurantIndex() {
      this.$store.dispatch('api/apiRequest', {
        api: 'index',
        params: {
          keyid: 'ee16c358353c48730bc3264ead7330a7',
          freeword: 'カフェ',
        },
      }).then((res) => {
        this.restaurantList = res.rest
        console.log(this.restaurantList)
      })
    }
  }
}
</script>
<style lang="scss">
.fluid {
  height: 400px;
}
</style>

