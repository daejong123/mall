import ResultUtil, { IData, CaiCode } from '../util/ResultUtil';
import execute from '../db/io';

export interface IGoodsKind {
    id: number;
    name: string;
}

export interface IProductData {
    productName: string;
    productKindId: number;
    introducation: string;
    productOldPrice: number;
    productNewPrice: number;
    details: string;
    id: number; // 这是userId
    token: string;
    pid?: number;
}

interface ICount {
    count: number;
}

export default class GoodsService {

    public async isLogin(token: string): Promise<boolean> {
        const r: string[] = await execute('select name from user_token where is_expired = ? and token = ?', [0, token]);
        if (r && r.length) {
            return true;
        }
        return false;
    }

    public async getAllGoodsKinds(): Promise<IData> {
        const kinds: IGoodsKind[] = await execute("select id, name from good_kind where is_expired = ?", [0]);
        return ResultUtil.make("商品种类", CaiCode.Get_Goods_Kind_Success, kinds);
    }

    public async uploadGoods(product: IProductData): Promise<IData> {
        const isLogin = await this.isLogin(product.token);
        if (isLogin) {
            const result = await execute(`
            insert into goods (name, old_price, price, introduce, details, user_id, kind_id) values(?, ?, ?, ?, ?, ?, ?)`,
                [product.productName, product.productOldPrice, product.productNewPrice, product.introducation, product.details, product.id, product.productKindId]);
            if (result && result.insertId) {
                return ResultUtil.make("发布商品成功", CaiCode.Publish_Goods_Success);
            }
        }
        return ResultUtil.make("发布商品失败", CaiCode.Publish_Goods_Fail);
    }

    public async getAllGoods(): Promise<IData> {
        const result: [] = await execute('select id, name, old_price, price, introduce, details, user_id, kind_id, click_time from goods where is_expired = ? and is_deleted = ?', [0, 0]);
        if (result) {
            return ResultUtil.make("获取商品成功", CaiCode.Get_All_Goods_Success, result);
        }
        return ResultUtil.make("获取商品失败", CaiCode.Get_All_Goods_Fail);
    }

    public async getAllUserGoodsByUid(token: string, uid: number): Promise<IData> {
        const isLogin = await this.isLogin(token);
        if (!isLogin) {
            return ResultUtil.make('未登录,获取失败', CaiCode.Need_Login);
        }
        const result: [] = await execute('select good_id, count from user_goods where user_id = ? and is_finished = ? and count <> ?', [uid, 0, 0]);
        if (result) {
            return ResultUtil.make("获取用户购物记录成功", CaiCode.Get_User_Goods_Success, result);
        }
        return ResultUtil.make("获取用户购物记录失败", CaiCode.Get_User_Goods_Fail);
    }

    public async deleteCountInCart(token: string, uid: number, gid: number): Promise<IData> {
        const isLogin = await this.isLogin(token);
        if (!isLogin) {
            return ResultUtil.make('未登录, 操作购物车失败', CaiCode.Add_Goods_To_Cart_Fail);
        }
        const countsArr: ICount[] = await execute('select count from user_goods where user_id = ? and good_id = ?', [uid, gid]);
        if (countsArr && countsArr.length) {
            const count = countsArr[0].count - 1;
            if (count === -1) {
                return ResultUtil.make('操作购物车失败, 数量为0', CaiCode.Add_Goods_To_Cart_Fail);
            }
            const r = await execute('update user_goods set count = ? where user_id = ? and good_id = ?', [count, uid, gid]);
            if (r && r.affectedRows) {
                return ResultUtil.make('操作购物车成功', CaiCode.Add_Goods_To_Cart_Success);
            }
        }
        return ResultUtil.make('操作购物车失败', CaiCode.Add_Goods_To_Cart_Fail);
    }
    public async addGoodsCount(token: string, uid: number, gid: number): Promise<IData> {
        const isLogin = await this.isLogin(token);
        if (!isLogin) {
            return ResultUtil.make('未登录, 添加购物车失败', CaiCode.Add_Goods_To_Cart_Fail);
        }
        const countsArr: ICount[] = await execute('select count from user_goods where user_id = ? and good_id = ?', [uid, gid]);
        if (countsArr && countsArr.length) {
            let count = 1;
            count += countsArr[0].count;
            const r = await execute('update user_goods set count = ? where user_id = ? and good_id = ?', [count, uid, gid]);
            if (r && r.affectedRows) {
                return ResultUtil.make('添加购物车成功', CaiCode.Add_Goods_To_Cart_Success);
            }
        } else {
            const r = await execute('insert into user_goods (user_id, good_id, count) values(?, ?, ?)', [uid, gid, 1]);
            if (r && r.insertId) {
                return ResultUtil.make('添加购物车成功', CaiCode.Add_Goods_To_Cart_Success);
            }
        }
        return ResultUtil.make('添加购物车失败', CaiCode.Add_Goods_To_Cart_Fail);
    }

    public async getAllPublishGoodsByUid(token: string, uid: number): Promise<IData> {
        const isLogin = await this.isLogin(token);
        if (!isLogin) {
            return ResultUtil.make('未登录, 获取数据失败', CaiCode.Need_Login);
        }
        const result: [] = await execute('select id, name, old_price, price, introduce, details, user_id, kind_id, click_time from goods where is_expired = ? and is_deleted = ? and user_id = ?', [0, 0, uid]);
        if (result) {
            return ResultUtil.make("获取商品成功", CaiCode.Get_UserId_All_Goods_Success, result);
        }
        return ResultUtil.make("获取商品失败", CaiCode.Get_UserId_All_Goods_Fail);
    }

    public async updatedGoods(product: IProductData): Promise<IData> {
        const isLogin = await this.isLogin(product.token);
        if (isLogin) {
            const result = await execute(`
            update goods set name = ?, old_price = ?, price = ?, introduce = ?, details = ?,  kind_id = ? where user_id = ? and id = ?`,
                [product.productName, product.productOldPrice, product.productNewPrice, product.introducation, product.details, product.productKindId, product.id, product.pid]);
            if (result && result.affectedRows) {
                return ResultUtil.make("更新商品成功", CaiCode.Publish_Goods_Success);
            }
        }
        return ResultUtil.make("更新商品失败", CaiCode.Publish_Goods_Fail);
    }

    public async deleteGoodsById(token: string, gid: number): Promise<IData> {
        const isLogin = await this.isLogin(token);
        if (isLogin) {
            const r = await execute('update goods set is_deleted = ? where id = ?', [1, gid]);
            if (r && r.affectedRows) {
                return ResultUtil.make("删除商品成功", CaiCode.Delete_Goods_Success);
            }
        }
        return ResultUtil.make("删除商品失败", CaiCode.Delete_Goods_Fail);
    }
}
