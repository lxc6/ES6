//目标：提供接口服务器
// http://localhost:8085/getmsg 返回数据给用户
const http = require('http')
const URL = require('url')
// 引入自定义
const msg = require('./msg')
const server = http.createServer((req, res) => {
    // 设置响应头
    res.setHeader('content-type', 'application/json;charset=utf-8')
    let obj = URL.parse(req.url, true)
    // console.log(obj);
    let {
        pathname,
        query: {
            id,
            dt
        }
    } = obj
    // console.log('请求的参数为', query.dt);
    // console.log('请求的接口为', pathname);
    // 约定请求的地址------和--------方式
    // 注意当前的pathname不是req.url
    if (pathname === '/get_msg' && req.method === "GET") {
        // 通过自定义模块获取数据 假装经过多次运算得到的数据
        let data = msg.get()
        if (dt) {
            // 过滤data中时间戳dt大于传入dt的数据
            let rs = data.filter(item => item.dt > dt)
            res.end(JSON.stringify(rs))
        } else {
            // res.end()里只能是string或者buffer
            res.end(JSON.stringify(data))
        }

    } else {
        res.end('404')
    }
})
server.listen(8081, () => {
    console.log('服务器8081端口启动：success');

})