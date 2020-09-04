<template>
  <div class="search-input">
    <el-button v-show="!visible" type="text" size="mini" @click="$emit('update:visible', !visible)">搜索</el-button>
    <div class="root" ref="root">
      <el-input
        ref="input"
        :size="size"
        :value="value"
        @input="$emit('input', $event)"
        prefix-icon="el-icon-search"
      >
        <i slot="suffix" class="el-input__icon el-icon-close" @click="handleClose" />
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    placeholder: String,
    size: String,
    visible: {
      type: Boolean,
      default: false
    },
    direction: {
      validator: function (v) {
        return ['left', 'right'].indexOf(v) !== -1
      },
      default: 'right'
    }
  },
  methods: {
    init () {
      const input = this.$refs.input.$el
      if (this.visible) {
        input.style.transform = 'translateX(0)'
      } else {
        input.style.transform = this.direction === 'left' ? 'translateX(100%)' : 'translateX(-100%)'
      }
    },
    open () {
      const root = this.$refs.root
      const input = this.$refs.input.$el
      root.style.width = 'auto'
      root.style.heigt = 'auto'
      input.style.transform = 'translateX(0)'
    },
    close () {
      const root = this.$refs.root
      const input = this.$refs.input.$el
      input.style.transform = this.direction === 'left' ? 'translateX(100%)' : 'translateX(-100%)'
      setTimeout(() => {
        root.style.width = 0
        root.style.heigt = 0
      }, 300)
    },
    handleClose () {
      this.$emit('update:visible', !this.visible)
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    visible (nV) {
      if (nV) {
        this.open()
      } else {
        this.close()
      }
    }
  }
}
</script>

<style scoped lang='scss'>
  .search-input {
    display: flex;
    .root {
      overflow: hidden;
      .el-input {
        transition: all 0.3s;
      }
    }
  }
  .el-icon-close {
    cursor: pointer;
  }

  .fade-enter {
    transform: tranlateX(-100%);
  }
  .fade-enter-to {
    transform: translateX(0);
  }
  .fade-enter-active {
    transition: all 1s;
  }
</style>
