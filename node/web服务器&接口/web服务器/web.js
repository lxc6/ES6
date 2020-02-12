// 实现web服务器，让用户访问

const http = require('http')
const fs = require('fs')
const path = require('path')
const STATIC_PATH = 'public' //消除魔术树  将静态资源放在一个地方
const TYPE_MAP = {
    '.html': 'text/html;charset=utf-8',
    '.css': 'text/css;charset=utf-8',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpg'
}
const server = http.createServer((req, res) => {
    console.log(req.connection.remoteAddress);
    let filePath = path.join(__dirname, STATIC_PATH, req.url)
    try {
        let rs = fs.readFileSync(filePath);
        let extname = path.extname(req.url)
        // if(){}==&&
        TYPE_MAP[extname] && res.setHeader('content-type', TYPE_MAP[extname])
        res.end(rs)
    } catch (err) {
        // res.setHeader('content-type', 'index/html;charset=utf-8');
        // 找不到时 状态码 设置404
        res.statusCode = 404;
        res.end(`${req.url} 没有找到`)
    }
})
server.listen(8084, () => {
    console.log('8084服务器启动：success');
})