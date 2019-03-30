import * as React from 'react';
import Header from '../../containers/Header';
import SellAside, { IProductItemData } from './sell-aside/SellAside';
import SellContainer from './sell-container/SellContainer';
import { History } from 'history';
import "./Sell.css";
import { uploadImg, BASE_URL } from '../../api/CaiApi';
import { message, Modal } from 'antd';
import { CaiPost, CaiGet } from '../../api/CaiApi';
const confirm = Modal.confirm;

interface IGoodsKind {
    name: string;
    id: number;
}

interface IProductData {
    productName: string;
    productKindId: number;
    introducation: string;
    productOldPrice: number;
    productNewPrice: number;
    details: string;
}

interface IProps {
    id: string;
    identity: number;
    username: string;
    isLogin: boolean;
    token: string;
    history: History
}

interface IState {
    goodsKinds: IGoodsKind[];
    goods: IProductItemData[];
    updateGoods: IProductItemData | undefined;
}

export default class Sell extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            goodsKinds: [],
            goods: [],
            updateGoods: undefined
        }
    }

    public componentWillMount() {
        this.getAllGoodsKinds();
        this.getAllGoodsByUId();
    }

    public render() {
        const { goodsKinds, goods } = this.state;
        return (
            <div>
                {(this.props.isLogin === false || this.props.identity !== 1) ? this.isLogin()
                    :
                    <div className="sell">
                        <Header history={this.props.history} />
                        <div className="sell-container">
                            <SellAside className="sell-aside" goods={goods} clickItem={this.clickItem} />
                            <SellContainer className="sell-content"
                                editorUploadImage={this.editorUploadImage}
                                goodsKinds={goodsKinds}
                                publicProduct={this.publicProduct}
                                updateGoods={this.state.updateGoods}
                                deleteProduct={this.deleteProduct}
                                updateProduct={this.updateProduct} />
                        </div>
                    </div>
                }
            </div>
        )
    }


    private deleteProduct = (pid: number) => {
        const self = this;
        confirm({
            title: '提示',
            content: '确定要删除该商品吗？',
            okText: "确定",
            cancelText: "取消",
            onOk() {
                CaiPost('/deleteGoodsByGid', { token: self.props.token, gid: pid }).then(({ status, data }) => {
                    if (status === 200 && data.code === 1212) {
                        message.success(data.msg);
                        window.location.reload();
                    } else {
                        message.error(data.msg);
                    }
                }).catch((e: Error) => {
                    console.log(e);
                    message.error(e && e.message);
                })
            }
        });
    }

    private clickItem = (pid: number) => {
        console.log(pid);
        const r = this.state.goods.find(item => item.id === pid);
        if (r) {
            this.setState({ updateGoods: r });
        }
    }

    private editorUploadImage = (blobInfo: any, success: any, failure: any) => {
        const imgBlob = blobInfo.blob();
        uploadImg(this.props.id, imgBlob).then(({ status, data }) => {
            if (status === 200 && data.code === 1234) {
                message.success(data.msg);
                success(`${BASE_URL}/${data.data.imgUrl}`);
            } else {
                message.error(data && data.msg);
            }
        }).catch(e => {
            message.error(`图片上传失败, ${e.message}`);
        });
    }

    private isLogin() {
        this.props.history.replace("/");
        return "";
    }

    private getAllGoodsKinds = () => {
        CaiGet("/goodsKind").then((result: any) => {
            if (result.status === 200 && result.data.code === 5500) {
                this.setState({
                    goodsKinds: result.data.data
                });
            } else {
                message.error(result.data.msg);
            }
        }).catch((e: Error) => {
            console.log(e);
            message.error(e && e.message);
        })
    }


    private publicProduct = async (product: IProductData) => {
        console.log(product);
        const { id, token } = this.props;
        try {
            const { status, data } = await CaiPost("/publishProduct", { ...product, token, id });
            if (status === 200 && data.code === 5678) {
                message.success(data.msg);
                return true;
            }
            message.error(data.msg);
        } catch (e) {
            console.log(e);
            message.error(e && e.message);
        };
        return false;
    }

    private updateProduct = async (product: IProductData, pid: number) => {
        console.log(product);
        const { id, token } = this.props;
        try {
            const { status, data } = await CaiPost("/updateProduct", { ...product, token, pid, id });
            if (status === 200 && data.code === 5678) {
                message.success(data.msg);
                return true;
            }
            message.error(data.msg);
        } catch (e) {
            console.log(e);
            message.error(e && e.message);
        };
        return false;
    }

    private getAllGoodsByUId() {
        CaiGet('/getGoodsByUId', {
            uid: this.props.id, token: this.props.token
        }).then(({ status, data }) => {
            if (status === 200 && data.code === 6789) {
                console.log(data);
                this.setState({ goods: data.data });
                return;
            }
            message.error(data.msg);
        }).catch((e: Error) => {
            console.log(e);
            message.error(e && e.message);
        })
    }
}