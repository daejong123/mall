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
const GoodsService_1 = __importDefault(require("../../service/GoodsService"));
const ResultUtil_1 = __importStar(require("../../util/ResultUtil"));
class GoodsController {
    constructor() { }
    static getInstance(app) {
        if (!this.instance) {
            this.instance = new GoodsController();
            this.instance.app = app;
            this.instance.goodsService = new GoodsService_1.default();
        }
        return this.instance;
    }
    startListen() {
        this.doGetAllGoodsKinds();
        this.doPublishGoods();
        this.doGetAllGoods();
        this.doAddCart();
        this.doGetGoodsByUid();
        this.doUpdatePublishGoods();
        this.doDeleteGoodsByGid();
        this.doDeleteCart();
        this.getAllUserGoodsInfoByUId();
    }
    doGetAllGoodsKinds() {
        this.app.get('/goodsKind', (req, res) => {
            this.goodsService.getAllGoodsKinds().then((data) => {
                res.send(data);
            }).catch((e) => {
                const vo = ResultUtil_1.default.make(e.message, ResultUtil_1.CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }
    doPublishGoods() {
        this.app.post('/publishProduct', (req, res) => {
            const product = req.body;
            this.goodsService.uploadGoods(product).then((data) => {
                res.send(data);
            }).catch((e) => {
                const vo = ResultUtil_1.default.make(e.message, ResultUtil_1.CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }
    doGetAllGoods() {
        this.app.get('/getAllGoods', (req, res) => {
            this.goodsService.getAllGoods().then((data) => {
                res.send(data);
            }).catch((e) => {
                const vo = ResultUtil_1.default.make(e.message, ResultUtil_1.CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }
    doAddCart() {
        this.app.post('/addCart', (req, res) => {
            const uid = req.body.uid;
            const gid = req.body.gid;
            const token = req.body.token;
            this.goodsService.addGoodsCount(token, uid, gid).then((data) => {
                res.send(data);
            }).catch((e) => {
                const vo = ResultUtil_1.default.make(e.message, ResultUtil_1.CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }
    doGetGoodsByUid() {
        this.app.get('/getGoodsByUId', (req, res) => {
            const uid = req.query.uid;
            const token = req.query.token;
            this.goodsService.getAllPublishGoodsByUid(token, uid).then((data) => {
                res.send(data);
            }).catch((e) => {
                const vo = ResultUtil_1.default.make(e.message, ResultUtil_1.CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }
    doUpdatePublishGoods() {
        this.app.post('/updateProduct', (req, res) => {
            const product = req.body;
            this.goodsService.updatedGoods(product).then((data) => {
                res.send(data);
            }).catch((e) => {
                const vo = ResultUtil_1.default.make(e.message, ResultUtil_1.CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }
    doDeleteGoodsByGid() {
        this.app.post('/deleteGoodsByGid', (req, res) => {
            const token = req.body.token;
            const gid = req.body.gid;
            this.goodsService.deleteGoodsById(token, gid).then((data) => {
                res.send(data);
            }).catch((e) => {
                const vo = ResultUtil_1.default.make(e.message, ResultUtil_1.CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }
    doDeleteCart() {
        this.app.post('/deleteCart', (req, res) => {
            const uid = req.body.uid;
            const gid = req.body.gid;
            const token = req.body.token;
            this.goodsService.deleteCountInCart(token, uid, gid).then((data) => {
                res.send(data);
            }).catch((e) => {
                const vo = ResultUtil_1.default.make(e.message, ResultUtil_1.CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }
    getAllUserGoodsInfoByUId() {
        this.app.get('/getUserGoodsByUId', (req, res) => {
            const uid = req.query.uid;
            const token = req.query.token;
            console.log(token);
            this.goodsService.getAllUserGoodsByUid(token, uid).then((data) => {
                res.send(data);
            }).catch((e) => {
                const vo = ResultUtil_1.default.make(e.message, ResultUtil_1.CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }
}
exports.default = GoodsController;
//# sourceMappingURL=GoodsController.js.map