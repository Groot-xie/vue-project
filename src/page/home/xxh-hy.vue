<script>
import abcD from './abc-d'
export default {
  props: {
    level: Number
  },
  data () {
    return {
      list: ['aa', 'bb', 'cc'],
      a: 20
    }
  },
  components: {
    abcD
  },
  render (h) {
    return (
      <div class="abc">
        { h(`h${this.level}`, {
          style: {
            backgroundColor: 'red'
          },
          on: {
            click: function () {
              alert(1111)
            }
          }
        }, '我是谁') }
        <ul>
          { this.list.map(o => {
            return (
              <li> { o } </li>
            )
          }) }
        </ul>
        { h('abcD') }
        <el-button size="mini" onClick={this.fn}>我是谁</el-button>
      </div>
    )
  },
  methods: {
    fn () {
      alert(this.a)
      this.list = [1, 2, 3, 4, 5, 8]
    }
  }
}
</script>
