<template>
  <div class="container">
    <input ref="input" type="text" v-model="value" @focus="visible = true" @blur="visible = false" :style="{width, height}">
    <i :class="{'el-icon-caret-bottom': !visible, 'el-icon-caret-top': visible}"></i>
    <transition name="fade">
      <div class="div" v-show="visible" :style="divStyle">
        <ul>
          <li v-for="item in filterData" :key="item[options.id]" @click="liClick(item)">{{ item[options.name] }}</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      filterData: [],
      value: ''
    }
  },
  props: {
    width: {
      type: String,
      default: '150px'
    },
    height: {
      type: String,
      default: '15px'
    },
    position: {
      type: String,
      default: 'left'
    },
    data: {
      type: Array,
      default: () => [{
        orgId: '8a8142c431b6a5c90131bd3d360517be',
        orgCode: '591905',
        orgName: '福建区',
        orgType: 'REGION_MANAGE'
      }, {
        orgId: '8a8142c3336653e70133686d8e050dbf',
        orgCode: '351905',
        orgName: '山西区',
        orgType: 'REGION_MANAGE'
      }, {
        orgId: '8a8142c3336653e70133686f04490de0',
        orgCode: '220908',
        orgName: '天津区',
        orgType: 'REGION_MANAGE'
      }, {
        orgId: '8a8142c3336653e7013368719dd40e10',
        orgCode: '250907',
        orgName: '江苏区',
        orgType: 'REGION_MANAGE'
      }, {
        orgId: '8a8142c3336653e7013368708ba10dfb',
        orgCode: '571902',
        orgName: '浙江区',
        orgType: 'REGION_MANAGE'
      }, {
        orgId: '8a8142c3336653e701336866fdd10d47',
        orgCode: '240907',
        orgName: '辽宁区',
        orgType: 'REGION_MANAGE'
      }, {
        orgId: '8a8142c3336653e7013368679bbf0d52',
        orgCode: '431906',
        orgName: '吉林区',
        orgType: 'REGION_MANAGE'
      }, {
        orgId: '8a8142c3336653e701336868343d0d5d',
        orgCode: '451906',
        orgName: '黑龙江区',
        orgType: 'REGION_MANAGE'
      }, {
        orgId: '8a8142c3336653e701336868c5500d66',
        orgCode: '791906',
        orgName: '江西区',
        orgType: 'REGION_MANAGE'
      }, {
        orgId: '8a8142c3336653e70133686a55a10d7d',
        orgCode: '731912',
        orgName: '湖南区',
        orgType: 'REGION_MANAGE'
      }, {
        orgId: '8a8142c3336653e70133686adef40d86',
        orgCode: '371907',
        orgName: '河南区',
        orgType: 'REGION_MANAGE'
      }, {
        orgId: '8a8142c3336653e70133686b77510d9b',
        orgCode: '270914',
        orgName: '湖北区',
        orgType: 'REGION_MANAGE'
      }, {
        orgId: '8a8142c3336653e70133686c20a90da7',
        orgCode: '851904',
        orgName: '贵州区',
        orgType: 'REGION_MANAGE'
      }, {
        orgId: '8a8142c3336653e70133686e36b00dca',
        orgCode: '311903',
        orgName: '河北区',
        orgType: 'REGION_MANAGE'
      }, {
        orgId: '8a8142c3336653e70133686f8fe70de9',
        orgCode: '898905',
        orgName: '海南区',
        orgType: 'REGION_MANAGE'
      }, {
        orgId: '8a8142c3336653e7013368700a2f0df2',
        orgCode: '200988',
        orgName: '广州区',
        orgType: 'REGION_MANAGE'
      }, {
        orgId: '8a8142c3336653e70133687100640e05',
        orgCode: '551904',
        orgName: '安徽区',
        orgType: 'REGION_MANAGE'
      }, {
        orgId: '8a8142c3336653e701336873eeb60e21',
        orgCode: '210963',
        orgName: '上海区',
        orgType: 'REGION_MANAGE'
      }, {
        orgId: '8a8142c3336653e701336875d7400e30',
        orgCode: '100919',
        orgName: '北京区',
        orgType: 'REGION_MANAGE'
      }]
    },
    options: {
      type: Object,
      default: () => {
        return {
          id: 'orgId',
          name: 'orgName'
        }
      }
    }
  },
  methods: {
    liClick (item) {
      this.value = item[this.options.name]
      this.$emit('selected', item)
    }
  },
  computed: {
    divStyle () {
      switch (this.position) {
        case 'left':
          return { left: 0 }
        case 'right':
          return { right: 0 }
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler () {
        if (!this.value.trim()) {
          this.filterData = this.data
        } else {
          this.filterData = this.data.filter(item => item[this.options.name].includes(this.value))
        }
      }
    }
  }
}
</script>

<style scoped lang='scss'>
  .container {
    display: inline-flex;
    position: relative;
    align-items: center;
    > i {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%)
    }
    > input {
      padding-left: 5px;
      border: 1px solid purple;
      outline: none;
    }
    .div {
      position: absolute;
      top: calc(100% + 2px);
      border: 1px solid #ccc;
      width: calc(100% * 2);
      min-width: 100%;
      min-height: 150px;
      ul {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        list-style: none;
        margin: 0;
        padding: 10px 0;
        li {
          padding: 10px 0;
          cursor: pointer;
          width: calc(100% /6);
          font-size: 12px;
          color: #333;
          text-align: center;
        }
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
