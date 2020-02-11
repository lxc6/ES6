// 读出
const fs = require('fs')
const path = require('path')
const DATA_FILE = 'message.json'
// 绝对地址
let filePath = path.join(__dirname, DATA_FILE)
// 读取
const getMsg = () => {
    let res = fs.readFileSync(filePath, 'UTF8');
    let arr = JSON.parse(res)
    return arr
}
// 添加
const addMsg = (name, content) => {
    // 读出转化数组  数组.push  写入  
    let arr = getMsg();
    // 判断id
    let id = arr.length ? arr[arr.length - 1]["id"] + 1 : 1
    let obj = {
        id,
        name,
        content,
        "dt": Date.now()
    }
    // 填入数组
    arr.push(obj);
    // 同步写入
    fs.writeFileSync(filePath, JSON.stringify(arr));
    return arr
}
let res = addMsg('荒天帝', '谁敢称无敌，哪个敢言不败')
let res1 = addMsg('叶天帝', '我为天帝，当镇压世间一切敌')
let res2 = addMsg('楚终极', '举世皆寂，沧海桑田')

console.log(res2);