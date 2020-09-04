import Mock from 'mockjs'
const Random = Mock.Random
let arr = []
for (let i = 0; i < 10; i++) {
  let newName = Random.cname()
  arr.push(newName)
}
function sendData (res) {
  const type = res.type.toLowerCase()
  switch (type) {
    case 'get':
      break
    case 'post':
      const id = JSON.parse(res.body).id
      console.log(id)
      arr.splice(id, 1)
      break
  }
  return arr
}
Mock.mock(/^mock\/home/, /get|post/i, sendData)
