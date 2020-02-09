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
// 删除
const delMsg = id => {
    // 读取转化数组 获取id  删除  后显示
    let arr = getMsg();
    // 直接对原数组进行修改，删除当前下标的元素,splice中一个参数标示删除从下标开始后的所有并返回
    let res = arr.splice(id - 1, 1)
    // console.log(res, arr);
    fs.writeFileSync(filePath, JSON.stringify(arr));
    return arr

}
let rs = delMsg(1); // 删除id=1那一条数据
console.log(rs);