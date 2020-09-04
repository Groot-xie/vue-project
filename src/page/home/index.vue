<template>
  <el-container>
    <el-main>
      <button @click="getList">getList</button>
      <button @click="getInfo">getInfo</button>
      <button @click="getOther">getOther</button>
      <button @click="$router.push('/canvas')">canvas</button>
      <button @click="$router.push('/drag')">drag</button>

        <el-button @click="url = url === 'xxh-a' ? 'xxh-b' : 'xxh-a'">切换</el-button>
      <div style="border: 1px solid black" id="org">
        <h3>测试东塔引入</h3>
        <div id="content"></div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import ceshi from './ceshi.vue'
import Vue from 'vue'
const resultComps = {}
let requireComponent = require.context(
  './', // 在当前目录下查找
  false, // 不遍历子文件夹
  /\.vue$/ // 正则匹配 以 .vue结尾的文件
)
requireComponent.keys().forEach(fileName => {
  let comp = requireComponent(fileName)
  resultComps[fileName.replace(/^\.\/(.*)\.\w+$/, '$1')] = comp.default
})
console.log(222, resultComps)
// /* eslint-disable */
export default {
  data () {
    return {
      show: false,
      todoType: 'myCreateList',
      url: 'xxh-a'
    }
  },
  methods: {
    fn (scope) {
      console.log(scope)
    },
    getList () {
      this.$axios.post('/api/getList').then(res => {
        console.log(111, res)
      })
    },
    getInfo () {
      this.$axios.post('/api/getInfo').then(res => {
        console.log(222, res)
      })
    },
    getOther () {
      this.$axios.post('/api/getOther').then(res => {
        console.log(333, res)
      })
    },
    click () {
      this.todoType =
        this.todoType === 'myCreateList'
          ? 'myFinishedWorkList'
          : 'myCreateList'
    },
    conso (text, record) {
      console.log(1212, text, record)
    }

  },
  watch: {
    url: {
      handler (url) {
        console.log(1111)
        import(`./${url}`).then(res => {
          console.log(111, res.default)
          document.getElementById('org').innerHTML = ('<div id="content"></div>')
          var Profile = Vue.extend(res.default)
          // 创建 Profile 实例，并挂载到一个元素上。
          new Profile().$mount('#content')
        })
      }
    }
  },
  mounted () {
    // 创建构造器

  },
  components: {
    ceshi
  }
}
</script>

<style scoped lang='scss'>
  #xxh {
    li {
      width: 100%;
      overflow: hidden;
    }
  }
  .el-container {
    ul, li {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    li {
      margin-right: 10px;

    }
    height: 800px;
    background-color: var(--main-bg-color);
    .xxh {
      position: relative;
      border: 1px solid black;
      width: 200px;
      height: 600px;
      overflow: hidden;
      margin: 0 auto;
      button {
        position: absolute;
      }
      .one,
      .two {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .one {
        background-color: red;
      }
      .two {
        background-color: green;
      }
    }
  }
  @keyframes xxh {
    from {
      transform: translateX(0)
    }
    to {
      transform: translateX(-100%)
    }
  }
  @keyframes zhy {
    from {
      transform: translateX(100%)
    }
    to {
      transform: translateX(0)
    }
  }

  .dv {
    width: 200px;
    border: 1px solid black;
  }
  .xxh22 {
    background-color: red;
    height: 200px;
  }
  .my-enter-active, .my-leave-active {
    transition: all 1s;
  }
  .my-enter, .my-leave-to {
    height: 0;
  }
</style>
