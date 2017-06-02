const mongoose = require('mongoose')
const db = mongoose.createConnection('localhost', 'test')

db.once('open', function () {
  console.log('open success')
})

// 定义一个Schema
var PersonSchema = new mongoose.Schema({
  name: String   // 定义一个属性name，类型为String
})
