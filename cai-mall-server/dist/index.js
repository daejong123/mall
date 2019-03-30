"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const LoginController_1 = __importDefault(require("./controller/login/LoginController"));
const GoodsController_1 = __importDefault(require("./controller/goods/GoodsController"));
dotenv_1.default.config();
const app = express_1.default();
const port = process.env.SERVER_PORT;
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extende: true }));
app.use(bodyparser.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "lib")));
app.use(express_1.default.static(path_1.default.join(__dirname, "views")));
app.use(express_1.default.static(path_1.default.join(__dirname, "uploads")));
const session = require('express-session');
app.use(session({
    secret: 'mall-cai',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
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
app.get("/index", (req, res) => {
    if (req.session.userName) {
        res.render("index", { username: req.session.userName });
    }
    else {
        res.redirect('/');
    }
});
app.get("/", (req, res) => {
    if (req.session.userName) {
        res.redirect('/index');
    }
    else {
        res.render('login');
    }
});
LoginController_1.default.getInstance(app).startListen();
GoodsController_1.default.getInstance(app).startListen();
app.listen(port, () => {
    console.log(`serser started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map