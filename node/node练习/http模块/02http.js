// http1.js
// 引入核心模块 http
const http = require('http');
const fs = require('fs')

// 创建服务
// 输入http://localhost:8803/index.html 返回内容
const server = http.createServer(function (req, res) {
    if (req.url === '/test.html') {
        // 获取访问本服务器的客户端ip
        console.log(req.connection.remoteAddress);
        var htmlStr = fs.readFileSync('./test.html', 'utf8')
        res.end(htmlStr);
    } else {
        res.end('404')
    }
});
// 启动服务
server.listen(8080, function () {
    console.log('本次服务器启动：success');
});