// 引入模块
const http = require('http')
const fs = require('fs')
const path = require('path')
const URL = require('url')

const msg = require("./msg")

const STATIC_PATH = "board_front"; //  所有静态资源放置的地方

// 集中设置 content-type 映射关系 
const TYPE_MAP = {
    ".html": "text/html;charset=utf-8",
    ".css": "text/css;charset=utf-8",
    ".png": "image/png",
    ".js": "application/javascript",
    ".jpg": "image/jpg",
}
// 
const server = http.createServer((req, res) => {
    let obj = URL.parse(req.url)
    console.log(req.url);
    // console.log(obj);

    if (obj.pathname === "/get_msg" && req.method === "GET") {
        // 服务器执行接口的功能
        let result = {
            code: 200,
            data: msg.get()
        }
        console.log(result);

        res.setHeader('content-type', 'application/json;charset=utf-8')
        res.end(JSON.stringify(result))

    } else {

        let filePath = path.join(__dirname, STATIC_PATH, req.url)
        console.log(filePath);

        try {
            let rs = fs.readFileSync(filePath)
            let extName = path.extname(req.url)
            TYPE_MAP[extName] && res.setHeader('content-type', TYPE_MAP[extName])
            res.end(rs)
        } catch (err) {
            res.setHeader("content-type", "text/html;charset=utf-8")
            res.statusCode = 404;
            res.end(`${req.url} 没有找到`)
        }
    }
})
server.listen(8081, () => {
    console.log('服务器8081端口启动：success');
})