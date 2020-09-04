<template>
  <div>
    <h1>{{ cc.num }}</h1>
    <p v-for="item in cc.children" :key="item">{{ item }}</p>
    <el-button @click="fn">改变</el-button>
  </div>
</template>

<script>
export default {
  props: ['cc'],
  methods: {
    fn () {
      // this.cc
      this.cc.children = [ 112, 2, 3 ]
      this.$forceUpdate()
      // this.$emit('update:cc', {num: 333, children: [1, 2, 3]})
    }
  }
}
</script>

<style scoped lang='scss'>

</style>
