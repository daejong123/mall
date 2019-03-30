import * as React from 'react';
import './Content.css';
import ProductItem from '../product-item/ProductItem';


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
    goodsData: IProductItemData[],
    productItemClick: (itemId: number) => void;
    clickAddToCart: (itemId: number) => void;
}

class Content extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { goodsData } = this.props;
        return (
            <div className="Main-content">
                {
                    goodsData.map((item: IProductItemData, index: number) => (
                        <ProductItem
                            key={index}
                            pImgUrl={this.getFirstImg(item.details)}
                            id={item.id}
                            pName={item.name}
                            pOldPrice={item.old_price}
                            pNewPrice={item.price}
                            pIntroduce={item.introduce}
                            itemClick={this.props.productItemClick}
                            clickAddToCart={this.props.clickAddToCart} />
                    ))
                }
            </div>
        )
    }

    private getFirstImg = (details: string): string => {
        const imgReg = /<img.*?(?:>|\/>)/gi;
        const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        const arr = details.match(imgReg) || [];
        for (let i = 0; i < arr.length; i++) {
            const src: string[] = arr[i].match(srcReg) || [];
            if (i === 0 && src.length) {
                return src[1];
            }
        }
        return "";
    }
}

export default Content;