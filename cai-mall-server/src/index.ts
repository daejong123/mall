import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import LoginController from './controller/login/LoginController';
import GoodsController from './controller/goods/GoodsController';
import ResultUtil, { CaiCode } from './util/ResultUtil';

dotenv.config();

const app: express.Application = express();
const port = process.env.SERVER_PORT;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extende: true }));
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, "lib")));
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "uploads")));
const session = require('express-session');
app.use(session({
    secret: 'mall-cai', // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
        maxAge: 1000 * 60 * 60, // 设置 session 的有效时间，单位毫秒
    },
}));
/**
 * 拦截所有请求， 可做权限验证；
 */
app.use('*', (req, res, next) => {
    // 指定允许请求的源
    res.header('Access-Control-Allow-Origin', '*');
    // 允许request请求header的字段。
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With");
    // 允许前端请求的方法
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // 向前端暴露header的字段
    // res.header('Access-Control-Expose-Headers', 'mfe-token, user-id, code');
    // 前后端同时设置该字段true， 才可以在http请求时自动将本地的cookie传到后端去。
    // res.header("Access-Control-Allow-Credentials", "true");
    // console.log(req.headers.origin); // http://localhost:3000
    const method = req.method;
    if (method === 'OPTIONS') {
        res.statusCode = 200;
        res.end();
        return;
    }
    next();
});

/**
 * 供后台管理使用
 */
app.get("/index", (req: any, res) => {
    if (req.session.userName) {
        res.render("index", { username: req.session.userName });
    } else {
        res.redirect('/');
    }
});

app.get("/", (req: any, res) => {
    if (req.session.userName) {
        res.redirect('/index');
    } else {
        res.render('login');
    }
});

LoginController.getInstance(app).startListen();
GoodsController.getInstance(app).startListen();

app.listen(port, () => {
    console.log(`serser started at http://localhost:${port}`);
});
