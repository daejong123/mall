import * as React from 'react';
import './Aside.css';
import { Icon } from 'antd';

interface IGoodsKind {
    name: string;
    id: number;
}
interface IProps {
    goodsKinds: IGoodsKind[];
    doSelectKind: (kindId: number) => void;
}

interface IState {
    currentSelect: number;
}

const kindPic = [
    "shop", "phone", "laptop", "book", "gift", "woman", "trophy", "smile", "rocket", "shop", "phone", "laptop", "book", "gift", "woman", "trophy", "smile", "rocket"
]

class Aside extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            currentSelect: 0
        }
    }

    public render() {
        const { goodsKinds } = this.props;
        const { currentSelect } = this.state;
        return (
            <div className="Main-aside">
                {
                    goodsKinds.map((item: IGoodsKind, index: number) => {
                        return (
                            <div
                                key={index}
                                className={["goods-kind", currentSelect === index ? "kind-current" : ""].join(" ")}
                                onClick={() => this.doSelect(index, item.id)}
                            >
                                <Icon type={kindPic[index]} />
                                <span className="goods-name">
                                    {item.name}
                                </span>
                            </div>);
                    })
                }
            </div>
        )
    }

    private doSelect(selectIndex: number, kindId: number) {
        this.setState({ currentSelect: selectIndex });
        this.props.doSelectKind && this.props.doSelectKind(kindId);
    }
}

export default Aside;