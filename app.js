const express = require('express')
const app = express()
const dbs = require('./routes/dbs')

app.use(dbs)

app.listen(3000, _ => console.log('启动成功， 请访问localhost:3000'))
