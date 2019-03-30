"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const LoginService_1 = __importDefault(require("../../service/LoginService"));
const ResultUtil_1 = __importStar(require("../../util/ResultUtil"));
class LoginController {
    constructor() { }
    static getInstance(app) {
        if (!this.instance) {
            this.instance = new LoginController();
            this.instance.app = app;
            this.instance.loginService = new LoginService_1.default();
        }
        return this.instance;
    }
    startListen() {
        this.doLogin();
        this.doLogOut();
        this.doRegister();
        this.doSellerRegister();
        this.doValidCode();
        this.doBackLogin();
        this.doBackLogout();
        this.doGenerateCode();
        this.doGetAllUser();
        this.uploadImage();
    }
    /**
     * post
     * 登录
     * {name: string, password: string} 均不可为空
     */
    doLogin() {
        this.app.post('/login', (req, res) => {
            const user = {
                name: req.body.name,
                password: req.body.password
            };
            if (ResultUtil_1.isEmpty(user.name) || ResultUtil_1.isEmpty(user.password)) {
                res.send(ResultUtil_1.default.make("用户名或者密码不能为空", ResultUtil_1.CaiCode.UserName_Password_Can_Not_Empty));
                return;
            }
            this.loginService.doLogin(user).then((r) => {
                res.send(r);
            }).catch((e) => {
                const vo = ResultUtil_1.default.make(e.message, ResultUtil_1.CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }
    doLogOut() {
        this.app.post("/logout", (req, res) => {
            const token = req.body.token;
            if (ResultUtil_1.isEmpty(token)) {
                res.send(ResultUtil_1.default.make("token不能为空，退出登录失败", ResultUtil_1.CaiCode.Logout_Fail));
                return;
            }
            this.loginService.doLogOut(token).then((data) => {
                res.send(data);
            }).catch((e) => {
                const vo = ResultUtil_1.default.make(e.message, ResultUtil_1.CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }
    /**
     * post
     * 买家注册
     * {name: string, password: string, identity: 0, phone: string} phone可以为空
     */
    doRegister() {
        this.app.post('/register', (req, res) => {
            const { name, password, phone = "" } = req.body;
            if (ResultUtil_1.isEmpty(name) || ResultUtil_1.isEmpty(password)) {
                res.send(ResultUtil_1.default.make("用户名或者密码不能为空", ResultUtil_1.CaiCode.UserName_Password_Can_Not_Empty));
                return;
            }
            this.loginService.doRegisterByBuyer({ name, password, phone }).then((r) => {
                res.send(r);
            }).catch((e) => {
                const vo = ResultUtil_1.default.make(e.message, ResultUtil_1.CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }
    /**
     * post
     * 卖家注册
     * {name: string, password: string, phone: string, code} phone可以为空
     */
    doSellerRegister() {
        this.app.post('/sellerRegister', (req, res) => {
            const { name, password, phone = "", code = "" } = req.body;
            if (ResultUtil_1.isEmpty(name) || ResultUtil_1.isEmpty(password)) {
                res.send(ResultUtil_1.default.make("用户名或者密码不能为空", ResultUtil_1.CaiCode.UserName_Password_Can_Not_Empty));
                return;
            }
            this.loginService.doRegisterBySeller({ name, password, phone }, code).then((r) => {
                res.send(r);
            }).catch((e) => {
                const vo = ResultUtil_1.default.make(e.message, ResultUtil_1.CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }
    /**
     * post
     * 验证注册码
     * {code: string} 不可以为空
     */
    doValidCode() {
        this.app.post("/validCode", (req, res) => {
            const code = req.body.code;
            if (ResultUtil_1.isEmpty(code)) {
                res.send(ResultUtil_1.default.make("注册码不能为空", ResultUtil_1.CaiCode.UserName_Password_Can_Not_Empty));
                return;
            }
            this.loginService.validCode(code).then((data) => {
                res.send(data);
            }).catch((e) => {
                const vo = ResultUtil_1.default.make(e.message, ResultUtil_1.CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }
    /**
     * POST
     * 后台产生注册码
     * {username: string} 不可以为空
     */
    doGenerateCode() {
        this.app.post("/generateCode", (req, res) => {
            const username = req.body.username;
            if (ResultUtil_1.isEmpty(username) || !req.session.userName || req.session.userName !== username) {
                res.send(ResultUtil_1.default.make("还未登录，请先登录", ResultUtil_1.CaiCode.Need_Login));
                return;
            }
            this.loginService.getAllCode().then((data) => {
                let code = "";
                do {
                    code = ResultUtil_1.generateCode(4);
                } while (data.find((item) => item.code === code));
                this.loginService.insertCode(code, username).then((insertResult) => {
                    res.send(insertResult);
                }).catch((e) => {
                    const vo = ResultUtil_1.default.make(e.message, ResultUtil_1.CaiCode.Inner_Error);
                    res.send(vo);
                });
            }).catch((e) => {
                const vo = ResultUtil_1.default.make(e.message, ResultUtil_1.CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }
    /**
     * post
     * 后台登录
     * {username, password}不可以为空
     */
    doBackLogin() {
        this.app.post("/backLogin", (req, res) => {
            const { username, password } = req.body;
            if (ResultUtil_1.isEmpty(username) || ResultUtil_1.isEmpty(password)) {
                res.send(ResultUtil_1.default.make("用户名或者密码不能为空", ResultUtil_1.CaiCode.UserName_Password_Can_Not_Empty));
                return;
            }
            this.loginService.backLogin(username, password).then((data) => {
                if (data.code === ResultUtil_1.CaiCode.Exist_Admin) {
                    console.log("登录成功");
                    req.session.userName = username;
                }
                res.send(data);
            }).catch((e) => {
                const vo = ResultUtil_1.default.make(e.message, ResultUtil_1.CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }
    /**
     * post
     * 后台退出登录
     * {username: string}不可以为空
     */
    doBackLogout() {
        this.app.post("/backLogout", (req, res) => {
            const username = req.body.username;
            if (ResultUtil_1.isEmpty(username)) {
                res.send(ResultUtil_1.default.make("用户名不能为空", ResultUtil_1.CaiCode.UserName_Password_Can_Not_Empty));
                return;
            }
            if (req.session.userName && req.session.userName === username) {
                req.session.userName = null;
                res.send(ResultUtil_1.default.make("退出登录成功", ResultUtil_1.CaiCode.Logout_Success));
                console.log("退出登录成功");
            }
            else {
                res.send(ResultUtil_1.default.make("退出登录失败", ResultUtil_1.CaiCode.Logout_Fail));
            }
        });
    }
    /**
     * get
     * 后端获取所有用户
     */
    doGetAllUser() {
        this.app.get("/allUsers", (req, res) => {
            const username = req.query.username;
            if (ResultUtil_1.isEmpty(username)) {
                res.send(ResultUtil_1.default.make("用户名不能为空", ResultUtil_1.CaiCode.UserName_Password_Can_Not_Empty));
                return;
            }
            if (req.session.userName && req.session.userName === username) {
                this.loginService.getAllUsers().then((data) => {
                    res.send(data);
                }).catch((e) => {
                    const vo = ResultUtil_1.default.make(e.message, ResultUtil_1.CaiCode.Inner_Error);
                    res.send(vo);
                });
            }
            else {
                res.send(ResultUtil_1.default.make("还未登录，请先登录", ResultUtil_1.CaiCode.Need_Login));
            }
        });
    }
    uploadImage() {
        const multer = require('multer');
        const fs = require('fs');
        const upload = multer({
            dest: './uploads',
            limits: {
                fileSize: 1024 * 1024 * 10
            }
        });
        this.app.post("/uploadImg", upload.single('file'), (req, resp) => {
            const file = req.file;
            const userId = req.body.uid;
            const fileSaveName = `${userId}-${new Date().getTime()}`;
            fs.rename(file.path, "uploads/" + fileSaveName, (err) => {
                if (err) {
                    console.log(err);
                    console.log(`${fileSaveName}--上传图片失败!`);
                    resp.send(ResultUtil_1.default.make("上传图片失败", ResultUtil_1.CaiCode.Upload_Image_Fail));
                    return;
                }
                console.log(`${fileSaveName}--上传图片成功!`);
                resp.send(ResultUtil_1.default.make("上传图片成功", ResultUtil_1.CaiCode.Upload_Image_Success, { imgUrl: fileSaveName }));
            });
        });
    }
}
exports.default = LoginController;
//# sourceMappingURL=LoginController.js.map