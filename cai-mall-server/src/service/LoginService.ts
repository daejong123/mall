import execute from '../db/io';
import ResultUtil, { CaiCode, IData, generateToken } from '../util/ResultUtil';

export interface IUser {
    id?: string;
    name: string;
    password: string;
    is_expired?: string;
    identity?: string;
}

export interface IUserRegister {
    name: string;
    password: string;
    is_admin?: number;
    is_expired?: number;
    identity?: number;
    phone?: string;
    create_at?: string;
}

export interface ICode {
    code: string;
    user_id?: number;
    is_expired?: number;
}

export default class LoginService {
    public async doLogOut(token: string): Promise<IData> {
        const tokenR = await execute("update user_token set is_expired = ? where token = ?", [1, token]);
        if (tokenR && tokenR.affectedRows) {
            return ResultUtil.make("退出登录成功", CaiCode.Logout_Success);
        }
        return ResultUtil.make("退出登录失败", CaiCode.Logout_Fail);
    }

    public async doLogin(user: IUser): Promise<IData> {
        const results: IUser[] = await execute("select id, name, password, identity from user where name = ? and password = ? and is_admin <> 1 and is_expired = 0", [user.name, user.password]);
        if (!results.length) {
            return ResultUtil.make("用户名或者密码不正确", CaiCode.User_Not_Exist);
        }
        const token = generateToken(results[0].name);
        const tokenR = await execute("insert into user_token (name, token) values(?, ?)", [results[0].name, token]);
        if (tokenR && tokenR.insertId) {
            return ResultUtil.make("登录成功!", CaiCode.User_Exists, { id: results[0].id, identity: results[0].identity, username: results[0].name, token });
        } else {
            return ResultUtil.make("内部错误，token存储出错!", CaiCode.Inner_Error);
        }
    }

    public async doRegisterByBuyer(user: IUserRegister): Promise<IData> {
        const names: string[] = await execute('select name from user where name = ?', [user.name]);
        if (names.length) {
            return ResultUtil.make("注册失败, 用户名已存在", CaiCode.User_Name_Has_Exists);
        }
        const result = await execute("insert into user (name, password, phone) values(?, ?, ?)", [user.name, user.password, user.phone]);
        if (result && result.insertId) {
            return ResultUtil.make("买家注册成功", CaiCode.Buyer_Registe_Success);
        }
        return ResultUtil.make("买家注册失败", CaiCode.Buyer_Registe_Fail);
    }

    public async doRegisterBySeller(user: IUserRegister, code: string): Promise<IData> {
        const names: string[] = await execute('select name from user where name = ?', [user.name]);
        if (names.length) {
            return ResultUtil.make("注册失败, 用户名已存在", CaiCode.User_Name_Has_Exists);
        }
        const codes: ICode[] = await execute('select code, is_expired from code where code = ?', [code]);
        if (!codes.length) {
            return ResultUtil.make("注册码不存在", CaiCode.ValidCode_NotExist);
        }
        if (codes.length && codes[0].is_expired !== 0) {
            return ResultUtil.make("注册码已过期", CaiCode.ValidCode_Expired);
        }
        const result = await execute("insert into user (name, password, phone, identity) values(?, ?, ?, ?)", [user.name, user.password, user.phone, 1]);
        if (result && result.insertId) {
            const codeResult = await execute('update code set user_id = ?, is_expired = ? where code = ?', [result.insertId, 1, code]);
            if (codeResult && codeResult.affectedRows) {
                return ResultUtil.make("卖家注册成功", CaiCode.Seller_Registe_Success);
            }
        }
        return ResultUtil.make("卖家注册失败", CaiCode.Seller_Registe_Fail);
    }

    public async validCode(code: string): Promise<IData> {
        const results: ICode[] = await execute("select code, is_expired from code where code = ?", [code]);
        if (!results.length) {
            return ResultUtil.make("注册码不存在", CaiCode.ValidCode_NotExist);
        }
        if (results[0].is_expired) {
            return ResultUtil.make("注册码已过期", CaiCode.ValidCode_Expired);
        }
        return ResultUtil.make("注册码验证通过", CaiCode.ValidCode_Right);
    }

    public async backLogin(username: string, password: string): Promise<IData> {
        const admins: IUser[] = await execute("select name, password from user where is_admin = 1");
        const existAdmin = admins.find((item) => item.name === username && item.password === password);
        if (!existAdmin) {
            return ResultUtil.make("用户名或者密码错误", CaiCode.Not_Exist_Admin);
        }
        return ResultUtil.make("管理员存在", CaiCode.Exist_Admin);
    }

    public async getAllCode(): Promise<ICode[]> {
        const codes: ICode[] = await execute('select code from code', null);
        return codes;
    }

    public async insertCode(code: string, who: string): Promise<IData> {
        const result = await execute("insert into code (code, make_name) values(?, ?)", [code, who]);
        if (result && result.insertId) {
            return ResultUtil.make("产生卖家注册码成功", CaiCode.Generate_Code_Success, code);
        } else {
            return ResultUtil.make("产生卖家注册码失败", CaiCode.Generate_Code_Fail);
        }
    }

    public async getAllUsers(): Promise<IData> {
        const users = await execute('select name, phone, create_at, is_expired, identity from user where is_admin <> 1', null);
        return ResultUtil.make("系统的用户", CaiCode.Get_System_User_Success, users);
    }

}
