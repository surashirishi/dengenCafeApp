<template>
  <div class="select-wrapper sl01">
    <select name="都市選択" @change="select">
      <option value="都市選択" hidden>東京23区から選択</option>
      <option
        v-for="(item, index) in options" :key="index"
        :value="item"
      >
        {{item}}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/scss/color.scss';
.select-wrapper {
	overflow: hidden;
	width: 90%;
	margin: 2em auto;
	text-align: center;
  select {
    width: 180px;
    padding: 8px 38px 8px 8px;
    color: #666666;
    cursor: pointer;
    text-indent: 0.01px;
    text-overflow: ellipsis;
    border: none;
    outline: none;
    background: transparent;
    background-image: none;
    box-shadow: none;
    -webkit-appearance: none;
    appearance: none;
    &:-ms-expand {
      display: none;
    }
  }
}
.select-wrapper.sl01 {
	position: relative;
	border: 1px solid #bbbbbb;
	border-radius: 2px;
	background:  $site;
  &:before {
    position: absolute;
    top: 0.8em;
    right: 0.9em;
    width: 0;
    height: 0;
    padding: 0;
    content: '';
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #666666;
    pointer-events: none;
  }
}

</style>
<script>
export default {
  data() {
    return {
    }
  },
  props: {
    options: {
      type: Array,
      default: () => {},
    },
  },
  methods: {
    select() {
      if (this.$route.name === 'error') {
        this.$router.push('/')
      }
      this.$emit('select', event)
    },
  }
}
</script>


