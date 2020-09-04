<template>
  <div>
    <el-form :model="myForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="myForm.name"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogFormVisible', false)">取 消</el-button>
      <el-button type="primary" @click="ok">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
    console.log('created')
  },
  mounted () {
    console.log('mounted')
  },
  props: ['ruleForm'],
  computed: {
    myForm () {
      console.log('computed')
      return this.ruleForm
    }
  },
  watch: {
    compHid(val, oldVal) {
      // val 为最新改变的值 oldVal 未改变之前的值
      // 这里面写要执行的事件
    }
  },
  methods: {
    ok () {
      this.ruleForm = {}
    }
  }
}
</script>

<style scoped lang='scss'>

</style>
