// 构建服务器
const express = require('express')
const app = express() //注意要发放在上边因为const没有变量提升
const bodyParser = require('body-parser') //解析post 键值对 和json
// 引入工具
const msg = require('./util/messages')
const use = require('./util/user')

const session = require('express-session') //引入session id模块
// session配置项
let conf = {
    secret: '123456', //加密字符串。 使用该字符串来加密session数据，自定义
    resave: false, //强制保存session即使它并没有变化
    saveUninitialized: false //强制将未初始化的session存储。当新建了一个session且未
    //设定属性或值时，它就处于未初始化状态。
};
//使用express-session
app.use(session(conf));

const multer = require('multer') //解析文件类数据
// 配置环境
const upload = multer({
    dest: 'avatars/'
})

app.use(bodyParser.urlencoded({
    extended: false
})) //post键值对解析
app.use(bodyParser.json()) //post解析json格式
app.use(express.static('public')) //托管静态
//index页面接口
app.get('/get_msg', (req, res) => {
    let rs = {
        "code": 200,
        "data": msg.get()
    }
    res.json(rs)
})
// 添加评论
app.post('/add_msg', (req, res) => {
    let {
        name,
        content
    } = req.body
    msg.add(name, content)
    let rs = {
        "code": 200,
        "msg": "添加成功"
    }
    res.json(rs)
})


// 用户注册
app.post('/add_user', (upload.single('avatars')), (req, res) => {
    // console.log(req.file);//通过req.file获取上传的 文件数据 解析成的对象
    // console.log(req.body);//获取简单数据键值对
    let {
        name,
        pwd
    } = req.body
    let avatars = req.file.path
    use.add(name, pwd, avatars)
    res.send({
        code: 200,
        msg: "注册成功"
    })
})
// 用户登录
app.post('/login_user', (req, res) => {
    let {
        name,
        pwd
    } = req.body //获取用户信息
    let all_users = use.get()
    let cur_user = all_users.find(item => item.name == name && item.pwd == pwd)
    if (cur_user) {
        // 验证通过设置cookie  session Id
        req.session.isLogin = true; //返回sessionID 通过cookie格式来设置
        req.session.name = name
        res.send({
            code: 200,
            msg: '登陆成功',
            data: cur_user
        })
    } else {
        res.send({
            code: 400,
            msg: '用户名或密码错误'
        })
    }

})
// 获取session
app.get('/get_user', (req, res) => {
    let name = req.session.name
    let isLogin = req.session.isLogin
    if (isLogin) {
        res.send({
            code: 200,
            msg: "获取成功",
            data: {
                "name": name
            }
        })
    } else {
        res.send({
            code: 400,
            msg: "获取失败"
        })
    }
})
// 退出删除session
app.get('/quit_user', (req, res) => {
    req.session.destroy();
    res.send({
        code: 200,
        msg: "退出成功"
    })
})

app.listen(8081, () => {
    console.log('服务器8081启动:  success');

})