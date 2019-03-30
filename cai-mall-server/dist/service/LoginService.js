"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const io_1 = __importDefault(require("../db/io"));
const ResultUtil_1 = __importStar(require("../util/ResultUtil"));
class LoginService {
    doLogOut(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenR = yield io_1.default("update user_token set is_expired = ? where token = ?", [1, token]);
            if (tokenR && tokenR.affectedRows) {
                return ResultUtil_1.default.make("退出登录成功", ResultUtil_1.CaiCode.Logout_Success);
            }
            return ResultUtil_1.default.make("退出登录失败", ResultUtil_1.CaiCode.Logout_Fail);
        });
    }
    doLogin(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield io_1.default("select id, name, password, identity from user where name = ? and password = ? and is_admin <> 1 and is_expired = 0", [user.name, user.password]);
            if (!results.length) {
                return ResultUtil_1.default.make("用户名或者密码不正确", ResultUtil_1.CaiCode.User_Not_Exist);
            }
            const token = ResultUtil_1.generateToken(results[0].name);
            const tokenR = yield io_1.default("insert into user_token (name, token) values(?, ?)", [results[0].name, token]);
            if (tokenR && tokenR.insertId) {
                return ResultUtil_1.default.make("登录成功!", ResultUtil_1.CaiCode.User_Exists, { id: results[0].id, identity: results[0].identity, username: results[0].name, token });
            }
            else {
                return ResultUtil_1.default.make("内部错误，token存储出错!", ResultUtil_1.CaiCode.Inner_Error);
            }
        });
    }
    doRegisterByBuyer(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const names = yield io_1.default('select name from user where name = ?', [user.name]);
            if (names.length) {
                return ResultUtil_1.default.make("注册失败, 用户名已存在", ResultUtil_1.CaiCode.User_Name_Has_Exists);
            }
            const result = yield io_1.default("insert into user (name, password, phone) values(?, ?, ?)", [user.name, user.password, user.phone]);
            if (result && result.insertId) {
                return ResultUtil_1.default.make("买家注册成功", ResultUtil_1.CaiCode.Buyer_Registe_Success);
            }
            return ResultUtil_1.default.make("买家注册失败", ResultUtil_1.CaiCode.Buyer_Registe_Fail);
        });
    }
    doRegisterBySeller(user, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const names = yield io_1.default('select name from user where name = ?', [user.name]);
            if (names.length) {
                return ResultUtil_1.default.make("注册失败, 用户名已存在", ResultUtil_1.CaiCode.User_Name_Has_Exists);
            }
            const codes = yield io_1.default('select code, is_expired from code where code = ?', [code]);
            if (!codes.length) {
                return ResultUtil_1.default.make("注册码不存在", ResultUtil_1.CaiCode.ValidCode_NotExist);
            }
            if (codes.length && codes[0].is_expired !== 0) {
                return ResultUtil_1.default.make("注册码已过期", ResultUtil_1.CaiCode.ValidCode_Expired);
            }
            const result = yield io_1.default("insert into user (name, password, phone, identity) values(?, ?, ?, ?)", [user.name, user.password, user.phone, 1]);
            if (result && result.insertId) {
                const codeResult = yield io_1.default('update code set user_id = ?, is_expired = ? where code = ?', [result.insertId, 1, code]);
                if (codeResult && codeResult.affectedRows) {
                    return ResultUtil_1.default.make("卖家注册成功", ResultUtil_1.CaiCode.Seller_Registe_Success);
                }
            }
            return ResultUtil_1.default.make("卖家注册失败", ResultUtil_1.CaiCode.Seller_Registe_Fail);
        });
    }
    validCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield io_1.default("select code, is_expired from code where code = ?", [code]);
            if (!results.length) {
                return ResultUtil_1.default.make("注册码不存在", ResultUtil_1.CaiCode.ValidCode_NotExist);
            }
            if (results[0].is_expired) {
                return ResultUtil_1.default.make("注册码已过期", ResultUtil_1.CaiCode.ValidCode_Expired);
            }
            return ResultUtil_1.default.make("注册码验证通过", ResultUtil_1.CaiCode.ValidCode_Right);
        });
    }
    backLogin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const admins = yield io_1.default("select name, password from user where is_admin = 1");
            const existAdmin = admins.find((item) => item.name === username && item.password === password);
            if (!existAdmin) {
                return ResultUtil_1.default.make("用户名或者密码错误", ResultUtil_1.CaiCode.Not_Exist_Admin);
            }
            return ResultUtil_1.default.make("管理员存在", ResultUtil_1.CaiCode.Exist_Admin);
        });
    }
    getAllCode() {
        return __awaiter(this, void 0, void 0, function* () {
            const codes = yield io_1.default('select code from code', null);
            return codes;
        });
    }
    insertCode(code, who) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield io_1.default("insert into code (code, make_name) values(?, ?)", [code, who]);
            if (result && result.insertId) {
                return ResultUtil_1.default.make("产生卖家注册码成功", ResultUtil_1.CaiCode.Generate_Code_Success, code);
            }
            else {
                return ResultUtil_1.default.make("产生卖家注册码失败", ResultUtil_1.CaiCode.Generate_Code_Fail);
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield io_1.default('select name, phone, create_at, is_expired, identity from user where is_admin <> 1', null);
            return ResultUtil_1.default.make("系统的用户", ResultUtil_1.CaiCode.Get_System_User_Success, users);
        });
    }
}
exports.default = LoginService;
//# sourceMappingURL=LoginService.js.map