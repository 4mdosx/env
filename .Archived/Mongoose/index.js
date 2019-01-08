const mongoose = require('mongoose')
const db = mongoose.createConnection('localhost', 'test')

db.once('open', function () {
  console.log('open success')
})

// 定义一个Schema
var PersonSchema = new mongoose.Schema({
  name: String,   // 定义一个属性name，类型为String
  type: String
})
// var ExampleSchema = new Schema(config,options);
PersonSchema.methods.speak = function () {
  console.log('我的名字叫' + this.name)
}
PersonSchema.methods.findSimilarTypes = function (cb) {
  return this.model('Person').find({type: this.type}, cb)
}
PersonSchema.statics.findByName = function (name, cb) {
  // 静态方法在 Modul层可以使用
  this.find({name: new RegExp(name, 'i'), cb})
}
PersonSchema.virtual('name.full').get(function () {
  // 虚拟属性
  return this.name.first + ' ' + this.name.last
})

// 将该Schema发布为Model
var PersonModel = db.model('Person', PersonSchema)
//  如果该Model已经发布，则可以直接通过名字索引到，如下：
//  var PersonModel = db.model('Person');
//  如果没有发布，上一段代码将会异常
// var personEntity = new PersonModel({name: 'Krouky'})
// // 打印这个实体的名字看看
// console.log(personEntity.name) // Krouky
// personEntity.speak()// 我的名字叫Krouky
// personEntity.save()
PersonModel.find(function (err, persons) {
      // 查询到的所有person
  if (err) {
    throw err
  }
  console.log(persons)
  for (let val of persons) {
    console.log(val)
    val.name = 'MMM'
  }
})
