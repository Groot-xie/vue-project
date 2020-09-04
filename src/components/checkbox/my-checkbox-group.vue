<template>
  <div class="my-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  componentName: 'myCheckboxGroup',
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    min: Number,
    max: Number
  },
  methods: {

  }
}
</script>

<style lang='scss'>
  .my-checkbox-group {
    .my-checkbox {
      margin-right: 30px;
    }
  }
</style>
