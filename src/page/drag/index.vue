<template>
  <div class="drag-container">
    <ul>
      <li
        v-for="(item, index) in list"
        :key="item.num"
        draggable
        @dragstart="dragstart($event, index === list.length - 1, item)"
        @drag="drag"
        @dragend="dragend($event, index === list.length - 1)"
      >{{ item.num }}</li>
    </ul>
    <ul
      style="marginLeft: 40px"
      ref="uul"
    >
      <li
        v-for="(item, index) in list2"
        :key="item.num"
        @dragover="dragover"
        @dragenter="dragenter($event, index === list2.length - 1)"
        @dragleave="dragleave($event, index === list2.length - 1)"
        @drop="drop($event, item)"
      >{{ item.num }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [{
        num: 1
      }, {
        num: 2
      }, {
        num: 3
      }, {
        num: 4
      }],
      list2: [{
        num: 10
      }, {
        num: 20
      }, {
        num: 30
      }, {
        num: 40
      }]
    }
  },
  methods: {
    dragstart (e, isLast, item) {
      console.log('dragstart', e)
      e.currentTarget.style.borderColor = 'red'
      if (!isLast) {
        e.currentTarget.nextSibling.style.borderTopColor = 'red'
      }
      e.dataTransfer.effectAllowed = 'link'
      e.dataTransfer.setData('item', JSON.stringify(item))
      e.dataTransfer.setDragImage(e.currentTarget, 0, 20)
    },
    dragend (e, isLast) {
      console.log('dragend', e)
      e.currentTarget.style.borderColor = '#999'
      if (!isLast) {
        e.currentTarget.nextSibling.style.borderTopColor = '#999'
      }
    },
    drag (e) {
      // console.log('drag')
      // this.$refs.uul.insertBefore()
    },
    dragenter (e, isLast) {
      // e.dataTransfer.dropEffect = 'link'
      console.log('dragenter', e, e.currentTarget)
      e.preventDefault()
    },
    dragover (e) {
      e.dataTransfer.dropEffect = 'link'
      console.log('ondragover', e.offsetY, parseInt(window.getComputedStyle(e.currentTarget).height))
      if (e.offsetY > (parseInt(window.getComputedStyle(e.currentTarget).height) / 2)) {
        e.currentTarget.style.borderBottom = '1px dashed blue'
        e.currentTarget.style.borderTopColor = '#999'
      } else {
        e.currentTarget.style.borderTopColor = 'blue'
        e.currentTarget.style.borderBottomColor = 'transparent'
      }
      e.preventDefault()// 阻止默认事件
      // e.stopPropagation()// 阻止冒泡事件
      // return false
    },
    dragleave (e, isLast) {
      console.log('dragleave', e, e.currentTarget, isLast)
      e.currentTarget.style.borderTopColor = '#999'
      e.currentTarget.style.borderBottomColor = 'transparent'
    },
    drop (e, item) {
      const index = this.list2.findIndex(o => o.num === item.num)
      const obj = JSON.parse(e.dataTransfer.getData('item'))
      e.currentTarget.style.borderTopColor = '#999'
      e.currentTarget.style.borderBottonColor = 'transparent'
      this.list2.splice(index, 0, obj)
    }
  }
}
</script>

<style scoped lang='scss'>
.drag-container {
  display: flex;
  justify-content: space-around;
  ul {
    width: 50%;
    li {
      user-select: none;
      height: 40px;
      width: 100%;
      border: 1px dashed #999;
      border-bottom: none;
      line-height: 40px;
      text-align: center;
      // cursor: move;
      &:last-child {
        border-bottom: 1px dashed #999;
      }
    }
  }
}
</style>
