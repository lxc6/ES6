// 引入
// 去引入 msg.js中的方法，来操作message.json
const msg = require('./msg')

console.log(msg.add('管理员', '自定义模块就是66666'))
console.log(msg.del(2))
console.log(msg.get())