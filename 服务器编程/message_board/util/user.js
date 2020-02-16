//
const fs = require('fs')
const path = require('path')
const FILE_PATH = path.join(__dirname, '../json/user.json')

const get = () => JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'))
const add = (name, pwd, avatars) => {
    let arr = get()
    let id = arr.length ? arr[arr.length - 1].id + 1 : 1
    arr.push({
        id,
        name,
        pwd,
        avatars
    })
    fs.writeFileSync(FILE_PATH, JSON.stringify(arr))
    return arr
}
module.exports = {
    get,
    add
}