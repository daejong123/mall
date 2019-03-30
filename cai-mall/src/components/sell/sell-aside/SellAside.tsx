import * as React from 'react';
import './SellAside.css';

export interface IProductItemData {
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
    goods: IProductItemData[],
    clickItem: (pid: number) => void;
}

export default class SellAside extends React.Component<IProps> {
    public render() {
        return (
            <div className={this.props.className}>
                <h3>已发布的商品：</h3>
                {
                    this.props.goods.map((item:IProductItemData, index: number ) => (
                        <div className="p-item" key={index} onClick={() => this.props.clickItem(item.id)}>
                            <div className="p-name">{item.name}</div>
                            <div className="p-old">
                                <span>商品现价：</span>
                                <span>{item.old_price}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}