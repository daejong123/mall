import * as React from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import logo from './logo.svg';
import { CaiPost, CaiGet } from '../../api/CaiApi';
import { message, Modal, Drawer, Button } from 'antd';
import { History } from 'history';

const confirm = Modal.confirm;


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
  id: string;
  identity: number;
  username: string;
  isLogin: boolean;
  token: string;
  logout: () => void;
  history: History
}

interface ICart {
  count: number;
  good_id: number;
}

interface IState {
  visible: boolean;
  visible2: boolean;
  goodsData: IProductItemData[],
  cart: ICart[],
  currentGoodsDetail: string;
}


class Header extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      visible2: false,
      goodsData: [],
      cart: [],
      currentGoodsDetail: ""
    }
  }


  public render() {
    return (
      <header className="App-header">
        <div className="App-logo">
          <img src={logo} className="App-logo-img" alt="logo" onClick={this.reload} />
          <span className="App-title">南财二手市场</span>
        </div>
        <div className="App-person">
          <div>
            {
              this.props.isLogin ?
                <span className="App-login" onClick={() => this.logout()}>你好: <span style={{ color: "#33a1d0" }}>{this.props.username}</span></span>
                :
                <Link to="/login" className="App-login login-btn">登录</Link>
            }
            <Link to="/register" className="App-register">免费注册</Link>
          </div>
          <div className="App-private">
            <span>个人中心</span>
            <div className="App-private-content">
              <div className="private-content-item" onClick={this.goToCart}>购物车</div>
              {
                this.props.identity ?
                  <div className="private-content-item" onClick={this.gotoMakeProduct}>商家发布</div>
                  :
                  ""
              }
            </div>
          </div>
          <div className="cart">
            <Drawer
              width={340}
              placement="right"
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
            >
              <div>
                <h3>我的购物车</h3>
                {
                  this.state.cart.map((item: ICart, index: number) => (
                    <div key={index}
                    >
                      {this.getGoodsByGid(item.good_id, item.count)}
                    </div>
                  ))
                }
              </div>
            </Drawer>
          </div>
          <div>
            <Drawer
              width={640}
              placement="right"
              closable={false}
              onClose={this.onClose2}
              visible={this.state.visible2}
            >
              <div dangerouslySetInnerHTML={{ __html: this.state.currentGoodsDetail }} />
            </Drawer>
          </div>
        </div>
      </header>
    );
  }

  private getGoodsByGid = (gid: number, count: number) => {
    const { goodsData } = this.state;
    const r = goodsData.find(it => it.id === gid);
    if (r) {
      return (
        <div style={{
          "boxShadow": '0 0 1em 0 gray',
          "marginTop": '1em',
          "padding": ".5em",
          "borderRadius": ".5em",
          "cursor": "pointer"
        }}>
          <div onClick={() => this.showDetail(gid)}>
            <div>{r.name}</div>
            <div>现在售价：{r.price} 元</div>
            <div>{r.introduce}</div>
          </div>
          <div>
            <span> 数量：{count} 个</span>
            <Button size="small" onClick={() => this.deleteCartByPid(gid)}>-</Button>
            <Button size="small" type="danger" style={{ margin: "0 .5em" }} onClick={() => this.addCartById(gid)}>+</Button>
            <Button size="small" onClick={() => message.success("该功能还未上线哦！")}>购买</Button>
          </div>
        </div>
      );
    }
    return "";
  }

  private getAllGoods = () => {
    CaiGet('/getAllGoods').then(({ status, data }) => {
      if (status === 200 && data.code === 2345) {
        console.log(data.data);
        this.setState({ goodsData: data.data });
        return;
      }
      message.error(data && data.msg)
    }).catch((e: Error) => {
      console.log(e);
      message.error(e && e.message);
    });
  }

  private getCartByUid = () => {
    const { id, token } = this.props;
    console.log(id);
    CaiGet('/getUserGoodsByUId', { uid: id, token }).then(({ status, data }) => {
      if (status === 200 && data.code === 7896) {
        console.log(data.data);
        this.setState({ cart: data.data });
        return;
      }
      message.error(data && data.msg)
    }).catch((e: Error) => {
      console.log(e);
      message.error(e && e.message);
    });
  }

  private addCartById = (itemId: number) => {
    const { token, id } = this.props;
    CaiPost('/addCart', { token, uid: id, gid: itemId }).then(({ status, data }) => {
      if (status === 200 && data.code === 4567) {
        // message.success(data.msg);
        this.getCartByUid();
        return;
      }
      message.error(data.msg);
    }).catch((e: Error) => {
      console.log(e);
      message.error(e && e.message);
    })
  }

  private deleteCartByPid = (itemId: number) => {
    const { id, token } = this.props;
    CaiPost('/deleteCart', { token, uid: id, gid: itemId }).then(({ status, data }) => {
      if (status === 200 && data.code === 4567) {
        // message.success(data.msg);
        this.getCartByUid();
        return;
      }
      message.error(data.msg);
    }).catch((e: Error) => {
      console.log(e);
      message.error(e && e.message);
    })
  }

  private showDetail = (itemId: number) => {
    const r = this.state.goodsData.find(it => it.id === itemId);
    if (r) {
      this.setState({ currentGoodsDetail: r.details });
      this.showDrawer2();
    }
  }

  private showDrawer2 = () => {
    this.setState({
      visible2: true,
    });
  };

  private onClose2 = () => {
    this.setState({
      visible2: false,
    });
  };

  private showDrawer = () => {
    this.getAllGoods();
    this.getCartByUid();
    this.setState({
      visible: true,
    });
  };

  private onClose = () => {
    this.setState({
      visible: false,
    });
  };

  private goToCart = () => {
    if (!this.props.isLogin) {
      message.error("还未登录, 请先登录");
      return;
    }
    this.showDrawer();
  }

  private gotoMakeProduct = () => {
    if (!this.props.isLogin) {
      message.error("还未登录, 请先登录");
    } else if (!this.props.identity) {
      message.error("您不是商家！");
    } else {
      this.props.history.push('/seller');
    }
    return "";
  }

  private reload = () => {
    this.props.history.replace("/");
    window.location.reload();
  }

  private logout() {
    const self = this;
    confirm({
      title: '提示',
      content: '确定要退出登录吗？',
      okText: "确定",
      cancelText: "取消",
      onOk() {
        const { token } = self.props;
        CaiPost('/logout', { token }).then(({ status, data }) => {
          if (status === 200 && data.code === 3000) {
            message.success(data.msg);
            self.props.logout();
            self.props.history.replace("/");
          } else {
            message.error(data.msg);
          }
        })
      }
    });
  }

}

export default Header;
