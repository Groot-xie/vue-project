<template>
  <div>
    <input type="text" ref="text" >
    <iframe width="1200" height="700" ref="myAbc" id="my" src="http://192.168.16.176:85/test" frameborder="0"></iframe>
    <button @click="fn">点击</button>
  </div>
</template>
<script>

export default {
  data () {
    return {}
  },
  methods: {
    fn () {
      const iframe = this.$refs.myAbc
      iframe.contentWindow.postMessage({
        type: 1,
        data: {
          name: this.$refs.text.value
        }
      }, 'http://localhost:5211')
    }
  },
  mounted () {

  },
  components: {

  }
}
</script>

<style scoped lang='less'>

</style>
