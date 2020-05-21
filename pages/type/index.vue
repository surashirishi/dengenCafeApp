
<template>
  <section class="container">
    <div>
      <h1>飲食店type別のindexページです。</h1>
    </div>
  </section>
</template>

<script>
export default {
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
        console.log(res)
      })
    }
  }
}
</script>
