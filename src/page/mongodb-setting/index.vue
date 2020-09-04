<template>
  <el-container>
    <el-main>
      <el-tabs value="first">
        <el-tab-pane label="数据库操作" name="first">
          <!-- 工具栏 -->
          <div class="tools">
            <el-select size="mini" v-model="collection" placeholder="请选择表">
              <el-option
                v-for="item in collections"
                :key="item.collectionName"
                :label="item.collectionName"
                :value="item.collectionName">
              </el-option>
            </el-select>
            <div>
              <el-button type="text" @click="beginAdd">新增文档</el-button>
            </div>
          </div>
          <!-- 表格 -->
          <el-table
            v-for="(item, i) in documentList"
            :key="i"
            :data="[item]"
            style="width: 100%"
            fill
            header-row-class-name="table-head"
          >
            <el-table-column
              v-if="key !== '_id'"
              v-for="(val, key) in item"
              :key="val"
              :prop="key"
              :label="key"
            />
            <el-table-column width="180">
              <template slot-scope="scope">
                <el-button size="mini" type="success">修改</el-button>
                <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!-- 新增弹窗 -->
      <el-dialog
        append-to-body
        title="新增文档"
        :visible.sync="addDialogVisible"
        width="30%"
      >
        <el-row :gutter="20">
          <el-col :span="10"><el-input size="small" v-model="key" placeholder="请输入健"></el-input></el-col>
          <el-col :span="10"><el-input size="small" v-model="value" placeholder="请输入值"></el-input></el-col>
          <el-col :span="4"><el-button size="small" @click="smallAdd" type="success">新增</el-button></el-col>
        </el-row>
        <el-table :data="addData" fill>
          <el-table-column label="健" prop="key" />
          <el-table-column label="值" prop="value" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="smallDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="footer" :style="{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }">
          <el-button type="primary" @click="add">保存</el-button>
          <el-button @click="addDialogVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      collections: [], // 表
      collection: '', // 当前选择的表
      documentList: [],
      addDialogVisible: false,
      addData: [],
      key: '',
      value: ''
    }
  },
  methods: {
    getDbs () {
      this.$axios.get('/api/getCollections').then(res => {
        this.collections = res.data.collections
      })
    },
    getCollection () {
      this.$axios.get('/api/getCollection', {
        params: {
          collection: this.collection
        }
      }).then(res => {
        console.log(res.data.data)
        this.documentList = res.data.data
      })
    },
    beginAdd () {
      if (this.collection === '') {
        return this.$message({
          type: 'error',
          message: '请选择一张表'
        })
      }
      this.addDialogVisible = true
    },
    smallAdd () {
      this.addData.push({
        key: this.key,
        value: this.value,
        id: +new Date()
      })
      this.key = ''
      this.value = ''
    },
    smallDelete (row) {
      const index = this.addData.findIndex(item => item.id === row.id)
      this.addData.splice(index, 1)
    },
    add () {
      let obj = {}
      this.addData.forEach(item => {
        obj[item.key] = item.value
      })
      this.$axios.post('/api/add', {
        data: {
          collection: this.collection,
          data: obj
        }
      }).then(res => {
        if (res.data.success) {
          this.addDialogVisible = false
          this.getCollection()
        }
      })
    },
    del (row) {
      console.log(row)
      this.$axios.post('/api/del', {
        data: {
          collection: this.collection,
          id: row._id
        }
      }).then(res => {
        console.log(res)
        if (res.data.success) {
          this.getCollection()
        }
      })
    }
  },
  watch: {
    collection (newVal) {
      this.getCollection()
    },
    addDialogVisible (newVal) {
      if (!newVal) {
        this.key = ''
        this.value = ''
        this.addData = []
      }
    }
  },
  mounted () {
    this.getDbs()
  }
}
</script>

<style scoped lang='scss'>
  /deep/ .el-tabs {
    &__header {
      margin: 0;
    }
  }
  .tools {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: var(--main-bd-base);
  }
</style>
