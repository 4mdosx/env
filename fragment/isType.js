console.log(typeof 'foo' === 'string') // true
console.log(typeof String('foo') === 'string') // true
console.log(typeof new String('foo') === 'string') // false，因为new操作产生的都是对象。
console.log(typeof 1.2 === 'number') // true
console.log(typeof new Date() === 'Date') // false ，Date是对象
console.log(typeof [1, 2, 3] === 'array') // false, 数组也是对象

/** 正确检测对象类型方法 **/

function is (type, obj) {
  var clas = Object.prototype.toString.call(obj).slice(8, -1)
  return obj !== undefined && obj !== null && clas === type
}

console.log(is('String', 'test')) // true
console.log(is('String', new String('test'))) // true
console.log(is('Date', new Date())) // true
