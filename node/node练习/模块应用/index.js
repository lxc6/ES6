// 引入
// 去引入 msg.js中的方法，来操作message.json
const msg = require('./msg')
let res = msg.add('荒天帝', '谁敢称无敌，哪个敢言不败')
let res1 = msg.add('叶天帝', '我为天帝，当镇压世间一切敌')
let res2 = msg.add('楚终极', '举世皆寂，沧海桑田')
// console.log(res2)
// console.log(msg.del(1))
console.log(msg.get())