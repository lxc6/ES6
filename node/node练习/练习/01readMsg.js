// 读出
const fs = require('fs');
const path = require('path');
const DATA_FILE = "message.json"
// 
let filePath = path.join(__dirname, DATA_FILE)
const getMsg = () => {

    let res = fs.readFileSync(filePath, 'UTF8');
    let arr = JSON.parse(res)
    return arr
}
// 不要忘了执行封装 (=_=)!
let res = getMsg();
console.log(res);