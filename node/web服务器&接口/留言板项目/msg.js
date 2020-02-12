// 读，删，加模块
// 引入
const fs = require('fs');
const path = require('path');
const DATA_FILE = "message.json"
// 地址
let filePath = path.join(__dirname, DATA_FILE)
// 获取
const get = () => {
    let res = fs.readFileSync(filePath, 'utf8');
    let arr = JSON.parse(res)
    return arr
}
// 添加
const add = (name, content) => {
    // 读出转化数组  数组.push  写入  
    let arr = get();
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
// 删除
const del = id => {
    // 读取转化数组 获取id  删除  后显示
    let arr = get();
    // 下标与id相对应
    let idx = arr.findIndex(item => item.id == id)
    // 直接对原数组进行修改，删除当前下标的元素,splice中一个参数标示删除从下标开始后的所有并返回
    let res = arr.splice(idx, 1)
    fs.writeFileSync(filePath, JSON.stringify(arr));
    return arr
}
// 模块导出
module.exports = {
    'get': get,
    'add': add,
    'del': del
}