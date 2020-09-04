<template>
  <label :class="['my-checkbox', {'is-checked': isChecked, 'is-disabled': disabled}]">
    <span class="my-checkbox__input">
      <span class="my-checkbox__inner"></span>
      <input
        type="checkbox"
        class="my-checkbox__original"
        :value="label"
        v-model="model"
        :disabled="disabled"
        @change="handleChange"
      >
    </span>
    <span class="my-checkbox__label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
/* eslint-disable */
import Emitter from '../emitter'
export default {
  mixins: [Emitter],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    label: String,
    trueLabel: String,
    falseLabel: String,
    disabled: Boolean
  },
  data () {
    return {
      selfModel: false
    }
  },
  methods: {
    handleChange (e) {
      const label = e.target.checked
        ? this.trueLabel ? this.trueLabel : true
        : this.falseLabel ? this.falseLabel : false
      this.$emit('change', label, e)
      this.$nextTick(() => {
        this.dispatch('myCheckboxGroup', 'change', [this._checkboxGroup.value])
      })
    }
  },
  computed: {
    model: {
      get () {
        return this.isGroup ? this.store : this.value !== undefined ? this.value : this.selfModel
      },
      set (val) {
        if (this.isGroup) {
          this.dispatch('myCheckboxGroup', 'input', [val])
        } else {
          this.selfModel = val
        }
      }
    },
    isGroup () {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName === 'myCheckboxGroup') {
          this._checkboxGroup = parent
          return true
        } else {
          parent = parent.$parent
        }
      }
      return false
    },
    isChecked () {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model
      } else if (Array.isArray(this.model)) {
        return this.model.includes(this.label)
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel
      }
    },
    store () {
      return this.isGroup ? this._checkboxGroup.value : this.value
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang='scss'>
  .my-checkbox {
    display: inline-block;
    font-size: 0;
    user-select: none;
    cursor: pointer;
    &__input, &__label {
      display: inline-block;
    }
    &__input {
      .my-checkbox__inner {
        display: inline-block;
        vertical-align: middle;
        box-sizing: border-box;
        border-radius: 2px;
        border: 1px solid #dcdfe6;
        width: 14px;
        height: 14px;
      }
      .my-checkbox__original {
        visibility: hidden;
        width: 0;
        height: 0;
      }
    }
    &__label {
      vertical-align: middle;
      margin-left: 5px;
      font-size: 14px;
      color: #606266;
    }
  }
  .is-checked {
    .my-checkbox__inner {
      background-color: #409EFF;
      border-color: #409EFF;
      &::after {
        content: '';
        display: inline-block;
        width: 3px;
        height: 7px;
        border: 1px solid #fff;
        border-top-color: transparent;
        border-left-color: transparent;
        transform: rotate(45deg);
        margin-left: 4px;
      }
    }
    .my-checkbox__label {
      color: #409EFF;
    }
  }
  .is-disabled {
    .my-checkbox__inner {
      border-color: #dcdfe6;
      background-color: #edf2fc;
      &::after {
        border-bottom-color: #c0c4cc;
        border-right-color: #c0c4cc;
      }
    }
    .my-checkbox__label {
      color: #c0c4cc;
    }
  }
</style>
