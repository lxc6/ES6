// 创建方法
const fs = require('fs')
const path = require('path')
const FILE_PATH = path.join(__dirname, "../json/message.json") //文件地址
//读取
const get = () => JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'))
//添加
const add = (name, content) => {
    let arr = get()
    let id = arr.length ? arr[arr.length - 1].id + 1 : 1
    arr.push({
        id,
        name,
        content,
        "dt": Date.now()
    })
    fs.writeFileSync(FILE_PATH, JSON.stringify(arr))
    return arr
}
//删除
const del = id => {
    let arr = get()
    let idx = arr.findIndex(item => item.id = id)
    arr.splice(idx, 1)
    fs.writeFileSync(FILE_PATH, JSON.stringify(arr))
}

// 导出
module.exports = {
    get,
    add,
    del
}