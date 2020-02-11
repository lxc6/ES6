// 引入 msg.js中的方法，来操作message.json
const msg = require('./msg')
let rs = msg.del(3); // 删除id=1那一条数据
console.log(rs);