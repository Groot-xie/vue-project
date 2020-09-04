/*  数据库user模块
 * @Author: groot.xie
 * @Date: 2019-06-04 11:02:05
 * @Last Modified by: Groot.xie
 * @Last Modified time: 2019-08-06 10:32:41
 */
const router = require('express').Router()
const { MongoClient, ObjectId } = require('mongodb')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const URL = 'mongodb://127.0.0.1:27017'
const DB = 'user'

MongoClient.connect(URL, {useNewUrlParser: true}, (err, client) => {
  if (err) throw err
  const user = client.db(DB)
  /**
   * 获取全部表
   */
  router.use('/getCollections', (req, res) => {
    user.collections({}, (err, collections) => {
      if (err) throw new Error(err)
      res.send({
        collections: collections.map(collection => ({collectionName: collection.s.name}))
      })
    })
  })
  /**
   * 获取指定表
   */
  router.use('/getCollection', (req, res) => {
    user.collection(req.query.collection).find({}).toArray((err, data) => {
      if (err) throw new Error(err)
      res.send({
        data: data.reverse()
      })
    })
  })
  /**
   * 指定集合添加文档
   */
  router.use('/add', (req, res) => {
    const {collection, data} = req.body.data
    user.collection(collection).insert(data, function (err, result) {
      if (err) throw new Error(err)
      res.send({
        success: result.result.ok === 1
      })
    })
  })
  /**
   * 删除指定文档
   */
  router.use('/del', (req, res) => {
    const {collection, id} = req.body.data
    user.collection(collection).deleteOne({_id: ObjectId(id)}, (err, result) => {
      if (err) throw new Error(err)
      res.send({
        success: result.result.ok === 1
      })
    })
  })
})

module.exports = router
