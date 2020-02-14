// 引入模块 核心

const http = require('http')
const fs = require('fs')
const path = require('path')
const URL = require('url')
const qs = require('querystring')
// 引入模块 自定义
const msg = require("./msg")
// 创建静态库
const STATIC_PATH = "board_front"; //  所有静态资源放置的地方

// 集中设置 content-type 映射关系 
const TYPE_MAP = {
    ".html": "text/html;charset=utf-8",
    ".css": "text/css;charset=utf-8",
    ".png": "image/png",
    ".js": "application/javascript",
    ".jpg": "image/jpg",
}
// 创建服务器
const server = http.createServer((req, res) => {
    let obj = URL.parse(req.url) //将请求地址转换为对象
    if (obj.pathname === "/get_msg" && req.method === "GET") {
        let result = {
            code: 200,
            data: msg.get()
        } //设置响应数据
        res.setHeader('content-type', 'application/json;charset=utf-8')
        res.end(JSON.stringify(result)) //结束本次请求并返回响应数据
    } else if (obj.pathname === "/add_msg" && req.method === "POST") {
        let result = '';
        req.on('data', buf => {
            result += buf;
        })
        req.on('end', () => {
            let {
                name,
                content
            } = qs.parse(result);
            msg.add(name, content);
            // 返回一个响应值
            let rs = {
                code: 200,
                msg: '添加成功'
            }
            res.setHeader('content-type', 'application/json;charset=utf-8')
            res.end(JSON.stringify(rs))
        })

    } else {
        let filePath = path.join(__dirname, STATIC_PATH, req.url)
        // console.log(filePath);
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