import * as React from 'react';
import './Main.css';
import Aside from '../aside/Aside';
import Content, { IProductItemData } from '../content/Content';
import { CaiGet, CaiPost } from '../../api/CaiApi';
import { message, Drawer } from 'antd';

interface IState {
    goodsKinds: Array<{ name: string, id: number }>;
    goodsData: IProductItemData[];
    currentKindGoodsData: IProductItemData[];
    visible: boolean;
    currentGoodsDetail: string;
}

interface IProps {
    id: string;
    identity: number;
    username: string;
    isLogin: boolean;
    token: string;
}

class Main extends React.Component<IProps, IState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            goodsKinds: [],
            goodsData: [],
            currentKindGoodsData: [],
            visible: false,
            currentGoodsDetail: ""
        }
    }

    public render() {
        const { goodsKinds, currentKindGoodsData, currentGoodsDetail } = this.state;
        return (
            <div className="App-main">
                <Aside goodsKinds={goodsKinds} doSelectKind={this.doSelectKind} />
                <Content goodsData={currentKindGoodsData} productItemClick={this.productItemClick} clickAddToCart={this.clickAddToCart} />
                <div>
                    <Drawer
                        width={640}
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <div dangerouslySetInnerHTML={{ __html: currentGoodsDetail }} />
                    </Drawer>
                </div>
            </div>
        );
    }

    public componentDidMount() {
        this.getAllGoodsKinds();
        this.getAllGoods();
    }


    private showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    private onClose = () => {
        this.setState({
            visible: false,
        });
    };

    private doSelectKind = (kindId: number) => {
        const r = this.state.goodsData.filter(item => item.kind_id === kindId);
        this.setState({
            currentKindGoodsData: r
        });
    }

    private clickAddToCart = (itemId: number) => {
        console.log('ddd', itemId);
        console.log(this.props.id, this.props.token);
        const { token, id } = this.props;
        CaiPost('/addCart', { token, uid: id, gid: itemId }).then(({ status, data }) => {
            if (status === 200 && data.code === 4567) {
                message.success(data.msg);
                return;
            }
            message.error(data.msg);
        }).catch((e: Error) => {
            console.log(e);
            message.error(e && e.message);
        })
    }

    private productItemClick = (itemId: number) => {
        const current = this.state.goodsData.find(item => item.id === itemId);
        if (current) {
            this.setState({
                currentGoodsDetail: current.details
            });
        }
        this.showDrawer();
        console.log('click id: ' + itemId);
    }

    private getAllGoodsKinds() {
        CaiGet("/goodsKind").then((result: any) => {
            console.log(result);
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

    private getAllGoods() {
        CaiGet('/getAllGoods').then(({ status, data }) => {
            if (status === 200 && data.code === 2345) {
                console.log(data.data);
                this.setState({ goodsData: data.data });
                this.doSelectKind(1);
                return;
            }
            message.error(data && data.msg)
        }).catch((e: Error) => {
            console.log(e);
            message.error(e && e.message);
        });
    }
}

export default Main;