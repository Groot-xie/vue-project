<template>
  <div>
    <canvas ref="mycanvas" >
      当前浏览器不支持canvas，请更换浏览器
    </canvas>
  </div>
</template>

<script>
import digit from './digit'
export default {
  data () {
    return {
      width: 1024,
      height: 600,
      ctx: null,
      date: null,
      radius: 8,
      marginTop: 30,
      marginLeft: 30,
      balls: []
    }
  },
  methods: {
    init () {
      /** @type { HTMLCanvasElement } */
      const mycanvas = this.$refs.mycanvas
      mycanvas.width = this.width
      mycanvas.height = this.height
      this.ctx = mycanvas.getContext('2d')

      const date = new Date()
      let hours = date.getHours()
      let minutes = date.getMinutes()
      let seconds = date.getSeconds()
      this.date = {
        hours,
        minutes,
        seconds
      }
      console.log(this.date)
      this.render()
    },
    render () {
      setInterval(_ => {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.date.seconds++
        if (this.date.seconds >= 60) {
          this.date.seconds = 0
          this.date.minutes++
          if (this.date.minutes >= 60) {
            this.date.minutes = 0
            this.date.hours++
            if (this.date.hours >= 24) {
              this.date.hours = 0
              this.date.minutes = 0
              this.date.seconds = 0
            }
          }
        }
        this.drawArc(parseInt(this.date.hours / 10), this.marginLeft)
        this.drawArc(parseInt(this.date.hours % 10), this.marginLeft + 15 * (this.radius + 1))

        this.drawArc(10, this.marginLeft + 30 * (this.radius + 1))

        this.drawArc(parseInt(this.date.minutes / 10), this.marginLeft + 39 * (this.radius + 1))
        this.drawArc(parseInt(this.date.minutes % 10), this.marginLeft + 54 * (this.radius + 1))

        this.drawArc(10, this.marginLeft + 69 * (this.radius + 1))

        this.drawArc(parseInt(this.date.seconds / 10), this.marginLeft + 78 * (this.radius + 1))
        this.drawArc(parseInt(this.date.seconds % 10), this.marginLeft + 93 * (this.radius + 1))
      }, 1000)
    },
    drawArc (num, marginLeft) {
      for (let i = 0; i < digit[num].length; i++) {
        for (let j = 0; j < digit[num][i].length; j++) {
          if (digit[num][i][j] === 1) {
            this.ctx.fillStyle = 'hotpink'
            this.ctx.beginPath()
            this.ctx.arc(
              marginLeft + j * 2 * (this.radius + 1),
              this.marginTop + i * 2 * (this.radius + 1),
              this.radius,
              0,
              2 * Math.PI
            )
            this.ctx.fill()
          }
        }
      }
    }
  },
  mounted () {
    this.init()
  }

}
</script>

<style scoped lang='scss'>
  canvas {
    display: block;
    margin: 0 auto;
  }
</style>
