import GoodsService, { IGoodsKind, IProductData } from '../../service/GoodsService';
import ResultUtil, { CaiCode, IData, isEmpty, generateCode } from '../../util/ResultUtil';

export default class GoodsController {

    private app: any;
    private static instance: GoodsController;
    private goodsService: GoodsService;

    private constructor() { }

    public static getInstance(app: any): GoodsController {
        if (!this.instance) {
            this.instance = new GoodsController();
            this.instance.app = app;
            this.instance.goodsService = new GoodsService();
        }
        return this.instance;
    }

    public startListen(): void {
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

    private doGetAllGoodsKinds() {
        this.app.get('/goodsKind', (req: any, res: any) => {
            this.goodsService.getAllGoodsKinds().then((data: IData) => {
                res.send(data);
            }).catch((e: Error) => {
                const vo = ResultUtil.make(e.message, CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }

    private doPublishGoods() {
        this.app.post('/publishProduct', (req: any, res: any) => {
            const product: IProductData = req.body;
            this.goodsService.uploadGoods(product).then((data: IData) => {
                res.send(data);
            }).catch((e: Error) => {
                const vo = ResultUtil.make(e.message, CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }

    private doGetAllGoods() {
        this.app.get('/getAllGoods', (req: any, res: any) => {
            this.goodsService.getAllGoods().then((data: IData) => {
                res.send(data);
            }).catch((e: Error) => {
                const vo = ResultUtil.make(e.message, CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }

    private doAddCart() {
        this.app.post('/addCart', (req: any, res: any) => {
            const uid = req.body.uid;
            const gid = req.body.gid;
            const token = req.body.token;
            this.goodsService.addGoodsCount(token, uid, gid).then((data: IData) => {
                res.send(data);
            }).catch((e: Error) => {
                const vo = ResultUtil.make(e.message, CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }

    private doGetGoodsByUid() {
        this.app.get('/getGoodsByUId', (req: any, res: any) => {
            const uid = req.query.uid;
            const token = req.query.token;
            this.goodsService.getAllPublishGoodsByUid(token, uid).then((data: IData) => {
                res.send(data);
            }).catch((e: Error) => {
                const vo = ResultUtil.make(e.message, CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }

    private doUpdatePublishGoods() {
        this.app.post('/updateProduct', (req: any, res: any) => {
            const product: IProductData = req.body;
            this.goodsService.updatedGoods(product).then((data: IData) => {
                res.send(data);
            }).catch((e: Error) => {
                const vo = ResultUtil.make(e.message, CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }

    private doDeleteGoodsByGid() {
        this.app.post('/deleteGoodsByGid', (req: any, res: any) => {
            const token = req.body.token;
            const gid = req.body.gid;
            this.goodsService.deleteGoodsById(token, gid).then((data: IData) => {
                res.send(data);
            }).catch((e: Error) => {
                const vo = ResultUtil.make(e.message, CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }

    private doDeleteCart() {
        this.app.post('/deleteCart', (req: any, res: any) => {
            const uid = req.body.uid;
            const gid = req.body.gid;
            const token = req.body.token;
            this.goodsService.deleteCountInCart(token, uid, gid).then((data: IData) => {
                res.send(data);
            }).catch((e: Error) => {
                const vo = ResultUtil.make(e.message, CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }

    private getAllUserGoodsInfoByUId() {
        this.app.get('/getUserGoodsByUId', (req: any, res: any) => {
            const uid = req.query.uid;
            const token = req.query.token;
            console.log(token);
            this.goodsService.getAllUserGoodsByUid(token, uid).then((data: IData) => {
                res.send(data);
            }).catch((e: Error) => {
                const vo = ResultUtil.make(e.message, CaiCode.Inner_Error);
                res.send(vo);
            });
        });
    }
}
