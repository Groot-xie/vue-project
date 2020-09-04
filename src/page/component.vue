<template>
  <el-main>
    <div>
      <h2>示例：</h2>
      <el-checkbox v-model="checked" disabled @change="change">备选项</el-checkbox>
    </div>
    <hr>
    <div>
      <h2>我的：</h2>
      <my-checkbox v-model="checked" @change="change" label="嘿嘿和" true-label="是" false-label="否" >备选项</my-checkbox>
    </div>
    <hr>
    <div>
      <h2>示例组：</h2>
       <el-checkbox-group :min="1" :max="2" v-model="checkList" @change="groupChange">
        <el-checkbox v-for="o in list" :key="o" :label="o"></el-checkbox>
      </el-checkbox-group>
    </div>
    <hr>
    <div>
      <h2>我的组：</h2>
      <my-checkbox-group :min="1" :max="2" v-model="checkList" @change="groupChange">
        <my-checkbox v-for="o in list" :key="o" :label="o"></my-checkbox>
      </my-checkbox-group>
    </div>
  </el-main>
</template>

<script>
import MyCheckbox from '../components/checkbox/my-checkbox'
import MyCheckboxGroup from '../components/checkbox/my-checkbox-group'
export default {
  data () {
    return {
      checked: true,
      checkList: ['选中且禁用', '复选框 A'],
      list: ['选中且禁用', '复选框 A', '复选框 B', '复选框 C', '复选框 D']
    }
  },
  methods: {
    change (e, a) {
      console.log(e, a)
    },
    groupChange (a, b, c) {
      console.log(a, b, c)
    }
  },
  components: {
    MyCheckbox,
    MyCheckboxGroup
  }
}
</script>

<style scoped lang='scss'>

</style>
