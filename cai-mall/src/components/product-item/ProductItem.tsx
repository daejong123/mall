import * as React from 'react';
import "./ProductItem.css";
import { Button } from 'antd';

interface IProduct {
    id: number;
    pImgUrl: string;
    pName: string;
    pOldPrice: string;
    pNewPrice: string;
    pIntroduce: string;
    itemClick: (id: number) => void;
    clickAddToCart: (itemId: number) => void;
}

const productItem = (props: IProduct) => {
    return (
        <div className="product-item">
            <div className="p-img" onClick={() => props.itemClick(props.id)}>
                <img src={props.pImgUrl} alt="商品图片" />
            </div>
            <div className="p-item-info">
                <div className="pName">
                    <span>{props.pName}</span>
                </div>
                <div className="p-new-price">
                    <div>
                        <span>商品现价:</span>
                        <span className="price">{props.pNewPrice}元</span>
                    </div>
                    <div>
                        <Button size="small" onClick={() => props.clickAddToCart(props.id)}>加购物车</Button>
                    </div>
                </div>
                <div className="p-old-price">
                    <span>商品原价:</span>
                    <span className="price price-item">{props.pOldPrice}元</span>
                </div>
                <div className="p-intro">
                    <span>{props.pIntroduce}</span>
                </div>
            </div>
        </div>
    )
}

export default productItem;