import * as React from 'react';
import './Aside.css';
import { Icon, Input } from 'antd';

const Search = Input.Search;

interface IGoodsKind {
    name: string;
    id: number;
}
interface IProps {
    goodsKinds: IGoodsKind[];
    doSelectKind: (kindId: number) => void;
    doSearchContent: (search: string) => void;
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
                <div className="Main-search">
                    <Search
                        className="app-search"
                        placeholder="输入商品名称"
                        onSearch={value => this.props.doSearchContent(value)}
                        enterButton={true}
                    />
                </div>
                <div>
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
            </div>
        )
    }

    private doSelect(selectIndex: number, kindId: number) {
        this.setState({ currentSelect: selectIndex });
        this.props.doSelectKind && this.props.doSelectKind(kindId);
    }
}

export default Aside;