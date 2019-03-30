import LoginService, { IUser, ICode, IUserRegister } from '../../service/LoginService';
import ResultUtil, { CaiCode, IData, isEmpty, generateCode } from '../../util/ResultUtil';

export default class LoginController {

    private app: any;
    private static instance: LoginController;
    private loginService: LoginService;

    private constructor() { }

    public static getInstance(app: any): LoginController {
        if (!this.instance) {
            this.instance = new LoginController();
            this.instance.app = app;
            this.instance.loginService = new LoginService();
        }
        return this.instance;
    }

    public startListen(): void {
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
    private doLogin(): void {
        this.app.post('/login', (req: any, res: any) => {
            const user = {
                name: req.body.name,
                password: req.body.password
            };
            if (isEmpty(user.name) || isEmpty(user.password)) {
                res.send(ResultUtil.make("用户名或者密码不能为空", CaiCode.UserName_Password_Can_Not_Empty));
                return;
            }
            this.loginService.doLogin(user).then((r: IData) => {
                res.send(r);
            }).catch((e: Error) => {
                const vo = ResultUtil.make(e.message, CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }

    private doLogOut(): void {
        this.app.post("/logout", (req: any, res: any) => {
            const token = req.body.token;
            if (isEmpty(token)) {
                res.send(ResultUtil.make("token不能为空，退出登录失败", CaiCode.Logout_Fail));
                return;
            }
            this.loginService.doLogOut(token).then((data: IData) => {
                res.send(data);
            }).catch((e: Error) => {
                const vo = ResultUtil.make(e.message, CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }

    /**
     * post
     * 买家注册
     * {name: string, password: string, identity: 0, phone: string} phone可以为空
     */
    private doRegister(): void {
        this.app.post('/register', (req: any, res: any) => {
            const { name, password, phone = "" } = req.body;
            if (isEmpty(name) || isEmpty(password)) {
                res.send(ResultUtil.make("用户名或者密码不能为空", CaiCode.UserName_Password_Can_Not_Empty));
                return;
            }
            this.loginService.doRegisterByBuyer({ name, password, phone }).then((r: IData) => {
                res.send(r);
            }).catch((e: Error) => {
                const vo = ResultUtil.make(e.message, CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }

    /**
     * post
     * 卖家注册
     * {name: string, password: string, phone: string, code} phone可以为空
     */
    private doSellerRegister(): void {
        this.app.post('/sellerRegister', (req: any, res: any) => {
            const { name, password, phone = "", code = "" } = req.body;
            if (isEmpty(name) || isEmpty(password)) {
                res.send(ResultUtil.make("用户名或者密码不能为空", CaiCode.UserName_Password_Can_Not_Empty));
                return;
            }
            this.loginService.doRegisterBySeller({ name, password, phone }, code).then((r: IData) => {
                res.send(r);
            }).catch((e: Error) => {
                const vo = ResultUtil.make(e.message, CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }

    /**
     * post
     * 验证注册码
     * {code: string} 不可以为空
     */
    private doValidCode(): void {
        this.app.post("/validCode", (req: any, res: any) => {
            const code = req.body.code;
            if (isEmpty(code)) {
                res.send(ResultUtil.make("注册码不能为空", CaiCode.UserName_Password_Can_Not_Empty));
                return;
            }
            this.loginService.validCode(code).then((data: IData) => {
                res.send(data);
            }).catch((e: Error) => {
                const vo = ResultUtil.make(e.message, CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }

    /**
     * POST
     * 后台产生注册码
     * {username: string} 不可以为空
     */
    private doGenerateCode(): void {
        this.app.post("/generateCode", (req: any, res: any) => {
            const username = req.body.username;
            if (isEmpty(username) || !req.session.userName || req.session.userName !== username) {
                res.send(ResultUtil.make("还未登录，请先登录", CaiCode.Need_Login));
                return;
            }
            this.loginService.getAllCode().then((data: ICode[]) => {
                let code = "";
                do {
                    code = generateCode(4);
                } while (data.find((item: ICode) => item.code === code));
                this.loginService.insertCode(code, username).then((insertResult: IData) => {
                    res.send(insertResult);
                }).catch((e: Error) => {
                    const vo = ResultUtil.make(e.message, CaiCode.Inner_Error);
                    res.send(vo);
                });
            }).catch((e: Error) => {
                const vo = ResultUtil.make(e.message, CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }

    /**
     * post
     * 后台登录
     * {username, password}不可以为空
     */
    private doBackLogin(): void {
        this.app.post("/backLogin", (req: any, res: any) => {
            const { username, password } = req.body;
            if (isEmpty(username) || isEmpty(password)) {
                res.send(ResultUtil.make("用户名或者密码不能为空", CaiCode.UserName_Password_Can_Not_Empty));
                return;
            }
            this.loginService.backLogin(username, password).then((data: IData) => {
                if (data.code === CaiCode.Exist_Admin) {
                    console.log("登录成功");
                    req.session.userName = username;
                }
                res.send(data);
            }).catch((e: Error) => {
                const vo = ResultUtil.make(e.message, CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }

    /**
     * post
     * 后台退出登录
     * {username: string}不可以为空
     */
    private doBackLogout(): void {
        this.app.post("/backLogout", (req: any, res: any) => {
            const username = req.body.username;
            if (isEmpty(username)) {
                res.send(ResultUtil.make("用户名不能为空", CaiCode.UserName_Password_Can_Not_Empty));
                return;
            }
            if (req.session.userName && req.session.userName === username) {
                req.session.userName = null;
                res.send(ResultUtil.make("退出登录成功", CaiCode.Logout_Success));
                console.log("退出登录成功");
            } else {
                res.send(ResultUtil.make("退出登录失败", CaiCode.Logout_Fail));
            }
        });
    }

    /**
     * get
     * 后端获取所有用户
     */
    private doGetAllUser(): void {
        this.app.get("/allUsers", (req: any, res: any) => {
            const username = req.query.username;
            if (isEmpty(username)) {
                res.send(ResultUtil.make("用户名不能为空", CaiCode.UserName_Password_Can_Not_Empty));
                return;
            }
            if (req.session.userName && req.session.userName === username) {
                this.loginService.getAllUsers().then((data: IData) => {
                    res.send(data);
                }).catch((e: Error) => {
                    const vo = ResultUtil.make(e.message, CaiCode.Inner_Error);
                    res.send(vo);
                });
            } else {
                res.send(ResultUtil.make("还未登录，请先登录", CaiCode.Need_Login));
            }
        });
    }

    private uploadImage() {
        const multer = require('multer');
        const fs = require('fs');
        const upload = multer({
            dest: './uploads',
            limits: {
                fileSize: 1024 * 1024 * 10
            }
        });
        this.app.post("/uploadImg", upload.single('file'), (req: any, resp: any) => {
            const file = req.file;
            const userId = req.body.uid;
            const fileSaveName = `${userId}-${new Date().getTime()}`;
            fs.rename(file.path, "uploads/" + fileSaveName, (err: Error) => {
                if (err) {
                    console.log(err);
                    console.log(`${fileSaveName}--上传图片失败!`);
                    resp.send(ResultUtil.make("上传图片失败", CaiCode.Upload_Image_Fail));
                    return;
                }
                console.log(`${fileSaveName}--上传图片成功!`);
                resp.send(ResultUtil.make("上传图片成功", CaiCode.Upload_Image_Success, { imgUrl: fileSaveName }));
            });
        });
    }
}
