"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResultUtil_1 = __importStar(require("../util/ResultUtil"));
const io_1 = __importDefault(require("../db/io"));
class GoodsService {
    isLogin(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = yield io_1.default('select name from user_token where is_expired = ? and token = ?', [0, token]);
            if (r && r.length) {
                return true;
            }
            return false;
        });
    }
    getAllGoodsKinds() {
        return __awaiter(this, void 0, void 0, function* () {
            const kinds = yield io_1.default("select id, name from good_kind where is_expired = ?", [0]);
            return ResultUtil_1.default.make("商品种类", ResultUtil_1.CaiCode.Get_Goods_Kind_Success, kinds);
        });
    }
    uploadGoods(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const isLogin = yield this.isLogin(product.token);
            if (isLogin) {
                const result = yield io_1.default(`
            insert into goods (name, old_price, price, introduce, details, user_id, kind_id) values(?, ?, ?, ?, ?, ?, ?)`, [product.productName, product.productOldPrice, product.productNewPrice, product.introducation, product.details, product.id, product.productKindId]);
                if (result && result.insertId) {
                    return ResultUtil_1.default.make("发布商品成功", ResultUtil_1.CaiCode.Publish_Goods_Success);
                }
            }
            return ResultUtil_1.default.make("发布商品失败", ResultUtil_1.CaiCode.Publish_Goods_Fail);
        });
    }
    getAllGoods() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield io_1.default('select id, name, old_price, price, introduce, details, user_id, kind_id, click_time from goods where is_expired = ? and is_deleted = ?', [0, 0]);
            if (result) {
                return ResultUtil_1.default.make("获取商品成功", ResultUtil_1.CaiCode.Get_All_Goods_Success, result);
            }
            return ResultUtil_1.default.make("获取商品失败", ResultUtil_1.CaiCode.Get_All_Goods_Fail);
        });
    }
    getAllUserGoodsByUid(token, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const isLogin = yield this.isLogin(token);
            if (!isLogin) {
                return ResultUtil_1.default.make('未登录,获取失败', ResultUtil_1.CaiCode.Need_Login);
            }
            const result = yield io_1.default('select good_id, count from user_goods where user_id = ? and is_finished = ? and count <> ?', [uid, 0, 0]);
            if (result) {
                return ResultUtil_1.default.make("获取用户购物记录成功", ResultUtil_1.CaiCode.Get_User_Goods_Success, result);
            }
            return ResultUtil_1.default.make("获取用户购物记录失败", ResultUtil_1.CaiCode.Get_User_Goods_Fail);
        });
    }
    deleteCountInCart(token, uid, gid) {
        return __awaiter(this, void 0, void 0, function* () {
            const isLogin = yield this.isLogin(token);
            if (!isLogin) {
                return ResultUtil_1.default.make('未登录, 操作购物车失败', ResultUtil_1.CaiCode.Add_Goods_To_Cart_Fail);
            }
            const countsArr = yield io_1.default('select count from user_goods where user_id = ? and good_id = ?', [uid, gid]);
            if (countsArr && countsArr.length) {
                const count = countsArr[0].count - 1;
                if (count === -1) {
                    return ResultUtil_1.default.make('操作购物车失败, 数量为0', ResultUtil_1.CaiCode.Add_Goods_To_Cart_Fail);
                }
                const r = yield io_1.default('update user_goods set count = ? where user_id = ? and good_id = ?', [count, uid, gid]);
                if (r && r.affectedRows) {
                    return ResultUtil_1.default.make('操作购物车成功', ResultUtil_1.CaiCode.Add_Goods_To_Cart_Success);
                }
            }
            return ResultUtil_1.default.make('操作购物车失败', ResultUtil_1.CaiCode.Add_Goods_To_Cart_Fail);
        });
    }
    addGoodsCount(token, uid, gid) {
        return __awaiter(this, void 0, void 0, function* () {
            const isLogin = yield this.isLogin(token);
            if (!isLogin) {
                return ResultUtil_1.default.make('未登录, 添加购物车失败', ResultUtil_1.CaiCode.Add_Goods_To_Cart_Fail);
            }
            const countsArr = yield io_1.default('select count from user_goods where user_id = ? and good_id = ?', [uid, gid]);
            if (countsArr && countsArr.length) {
                let count = 1;
                count += countsArr[0].count;
                const r = yield io_1.default('update user_goods set count = ? where user_id = ? and good_id = ?', [count, uid, gid]);
                if (r && r.affectedRows) {
                    return ResultUtil_1.default.make('添加购物车成功', ResultUtil_1.CaiCode.Add_Goods_To_Cart_Success);
                }
            }
            else {
                const r = yield io_1.default('insert into user_goods (user_id, good_id, count) values(?, ?, ?)', [uid, gid, 1]);
                if (r && r.insertId) {
                    return ResultUtil_1.default.make('添加购物车成功', ResultUtil_1.CaiCode.Add_Goods_To_Cart_Success);
                }
            }
            return ResultUtil_1.default.make('添加购物车失败', ResultUtil_1.CaiCode.Add_Goods_To_Cart_Fail);
        });
    }
    getAllPublishGoodsByUid(token, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const isLogin = yield this.isLogin(token);
            if (!isLogin) {
                return ResultUtil_1.default.make('未登录, 获取数据失败', ResultUtil_1.CaiCode.Need_Login);
            }
            const result = yield io_1.default('select id, name, old_price, price, introduce, details, user_id, kind_id, click_time from goods where is_expired = ? and is_deleted = ? and user_id = ?', [0, 0, uid]);
            if (result) {
                return ResultUtil_1.default.make("获取商品成功", ResultUtil_1.CaiCode.Get_UserId_All_Goods_Success, result);
            }
            return ResultUtil_1.default.make("获取商品失败", ResultUtil_1.CaiCode.Get_UserId_All_Goods_Fail);
        });
    }
    updatedGoods(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const isLogin = yield this.isLogin(product.token);
            if (isLogin) {
                const result = yield io_1.default(`
            update goods set name = ?, old_price = ?, price = ?, introduce = ?, details = ?,  kind_id = ? where user_id = ? and id = ?`, [product.productName, product.productOldPrice, product.productNewPrice, product.introducation, product.details, product.productKindId, product.id, product.pid]);
                if (result && result.affectedRows) {
                    return ResultUtil_1.default.make("更新商品成功", ResultUtil_1.CaiCode.Publish_Goods_Success);
                }
            }
            return ResultUtil_1.default.make("更新商品失败", ResultUtil_1.CaiCode.Publish_Goods_Fail);
        });
    }
    deleteGoodsById(token, gid) {
        return __awaiter(this, void 0, void 0, function* () {
            const isLogin = yield this.isLogin(token);
            if (isLogin) {
                const r = yield io_1.default('update goods set is_deleted = ? where id = ?', [1, gid]);
                if (r && r.affectedRows) {
                    return ResultUtil_1.default.make("删除商品成功", ResultUtil_1.CaiCode.Delete_Goods_Success);
                }
            }
            return ResultUtil_1.default.make("删除商品失败", ResultUtil_1.CaiCode.Delete_Goods_Fail);
        });
    }
}
exports.default = GoodsService;
//# sourceMappingURL=GoodsService.js.map