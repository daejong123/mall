import * as React from 'react';
import "./SellContainer.css";
import Editor from '../tinymce/CaiEditor';
import { Input, Icon, Select, InputNumber, Button, message } from 'antd';
const Option = Select.Option;

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

interface IProductItemData {
    id: number;
    name: string;
    old_price: string;
    price: string;
    introduce: string;
    details: string;
    user_id: number;
    kind_id: number;
    click_time: number;
}

interface IProps {
    className?: string;
    goodsKinds: IGoodsKind[];
    updateGoods?: IProductItemData;
    editorUploadImage: (blobInfo: any, success: any, failure: any) => void;
    publicProduct: (product: IProductData) => Promise<boolean>;
    deleteProduct: (pid: number) => void;
    updateProduct: (product: IProductData, pid: number) => Promise<boolean>;
}

interface IState {
    productName: string;
    productKindId: number;
    productOldPrice: number;
    productNewPrice: number;
    introducation: string;
    details: string;
}

export default class SellContainer extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        console.log();

        this.state = {
            productName: "",
            productKindId: 1,
            productOldPrice: 1,
            productNewPrice: 1,
            introducation: "",
            details: "",
        }
    }

    public componentWillReceiveProps(props: IProps) {
        if (props.updateGoods) {
            this.setState({
                productName: props.updateGoods.name,
                productKindId: props.updateGoods.kind_id,
                // tslint:disable-next-line:radix
                productOldPrice: parseInt(props.updateGoods.old_price),
                // tslint:disable-next-line:radix
                productNewPrice: parseInt(props.updateGoods.price),
                introducation: props.updateGoods.introduce,
                details: props.updateGoods.details,
            })
        }
    }

    public render() {
        const { productName, productKindId, introducation, productOldPrice, productNewPrice, details } = this.state;
        const { goodsKinds, updateGoods } = this.props;
        return (
            <div className={this.props.className}>
                <div className="publish-btn">
                    {
                        updateGoods ?
                            <div>
                                <Button type="primary" onClick={this.updateProduct}>更新商品</Button>
                                <Button type="danger" style={{ marginLeft: "1em" }} onClick={() => this.props.deleteProduct(updateGoods.id)}>删除商品</Button>
                            </div>
                            :
                            <Button type="primary" onClick={this.publicProduct}>发布商品</Button>
                    }
                </div>
                <br />
                <div className="basic-info">
                    <div className="product-name">
                        <Input
                            placeholder="商品名称"
                            prefix={<Icon type="inbox" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            value={productName}
                            style={{ width: "30%" }}
                            onChange={(e) => this.setState({ productName: e.target.value })}
                        />
                    </div>
                    <br />
                    <div className="product-kind">
                        <span>商品类别：</span>
                        {goodsKinds.length &&
                            <Select defaultValue={goodsKinds[0].id} value={productKindId} style={{ width: 120 }} onChange={value => this.setState({ productKindId: value })}>
                                {goodsKinds.map((item: IGoodsKind, index: number) => (<Option value={item.id} key={index}>{item.name}</Option>))}
                            </Select>
                        }
                    </div>
                    <br />
                    <div className="product-old-price">
                        <span>商品原价：</span>
                        <InputNumber min={1} max={10000} value={productOldPrice} defaultValue={1} onChange={(value: number) => this.setState({ productOldPrice: value })} />
                    </div>
                    <br />
                    <div className="product-new-price">
                        <span>现出售价：</span>
                        <InputNumber min={1} max={10000} value={productNewPrice} defaultValue={1} onChange={(value: number) => this.setState({ productNewPrice: value })} />
                    </div>
                    <br />
                    <div className="product-introducation">
                        <Input
                            placeholder="商品简单介绍"
                            prefix={<Icon type="snippets" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            value={introducation}
                            style={{ width: "30%" }}
                            onChange={(e) => this.setState({ introducation: e.target.value })}
                        />
                    </div>
                    <br />
                </div>
                <div className="product-detail">
                    <span>商品详情(可以复制粘贴图片哦！)</span>
                    <Editor
                        initialValue={details}
                        value={details}
                        editorContentOnChange={(content) => this.setState({ details: content })}
                        uploadImage={this.props.editorUploadImage} />
                </div>
            </div>
        )
    }

    private publicProduct = () => {
        const { productName, productKindId, introducation, productOldPrice, productNewPrice, details } = this.state;
        const product: IProductData = { productName, productKindId, introducation, productOldPrice, productNewPrice, details };
        if (!productName.trim().length) {
            message.warning('商品名不能为空!');
            return;
        }
        if (!introducation.trim().length) {
            message.warning("商品简介不能为空!");
            return;
        }
        if (!productOldPrice || productOldPrice <= 0 || !productNewPrice || productNewPrice <= 0) {
            message.warning("商品价格不能为空!");
            return;
        }
        this.props.publicProduct(product).then(isSuccess => {
            if (isSuccess) {
                this.setState({
                    productName: "",
                    productKindId: 0,
                    productOldPrice: 0,
                    productNewPrice: 0,
                    introducation: "",
                    details: "",
                })
            }
        });
    }

    private updateProduct = () => {
        const { productName, productKindId, introducation, productOldPrice, productNewPrice, details } = this.state;
        const product: IProductData = { productName, productKindId, introducation, productOldPrice, productNewPrice, details };
        if (!productName.trim().length) {
            message.warning('商品名不能为空!');
            return;
        }
        if (!introducation.trim().length) {
            message.warning("商品简介不能为空!");
            return;
        }
        if (!productOldPrice || productOldPrice <= 0 || !productNewPrice || productNewPrice <= 0) {
            message.warning("商品价格不能为空!");
            return;
        }
        if (this.props.updateGoods && this.props.updateGoods.id) {
            this.props.updateProduct(product, this.props.updateGoods.id).then(isSuccess => {
                if (isSuccess) {
                    alert("更新成功！");
                    window.location.reload();
                }
            });
        }
    }

}