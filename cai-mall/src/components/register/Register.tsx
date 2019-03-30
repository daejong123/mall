import * as React from 'react';
import { Input, Icon, Button, message } from 'antd';
import './Register.css';
import { Link } from "react-router-dom";
import { CaiPost } from '../../api/CaiApi';
import { History } from 'history';


interface IProps {
    history: History;
}

interface IState {
    username: string;
    password: string;
    phone: string;
    identity: number;
    code: string;
    codeRight: boolean;
}

export default class Register extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            username: "",
            password: "",
            phone: "",
            identity: 0,
            code: "",
            codeRight: false
        }
    }


    public render() {
        const { identity } = this.state;
        return (
            <div className="register">
                <div className="register-title">
                    南财二手市场注册
                </div>
                <div className="register-container">
                    <div className="identity-tab">
                        <div className={["identity-tab-item", identity ? "" : "identity-tab-item-current"].join(" ")} onClick={this.doSelectBuyer}>普通用户</div>
                        <div className={["identity-tab-item", identity ? "identity-tab-item-current" : ""].join(" ")} onClick={this.doSelectSeller}>商家注册</div>
                    </div>
                    <div className="register-inputs">
                        {this.inputs()}
                    </div>
                </div>
            </div>
        )
    }

    private inputs() {
        const { username, password, phone, identity, codeRight, code } = this.state;
        if (identity === 0 || codeRight === true) {
            return (
                <div><Input
                    className="register-input"
                    placeholder="输入用户名"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    value={username}
                    onChange={(e) => this.setState({ username: e.target.value })}
                />
                    <Input
                        className="register-input"
                        placeholder="输入密码"
                        type="password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        value={password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                    />
                    <Input
                        className="register-input"
                        placeholder="注册手机号"
                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        value={phone}
                        onChange={(e) => this.setState({ phone: e.target.value })}
                    />
                    <div className="register-btn">
                        <Button type="primary" onClick={this.doRegister}>注册</Button>
                        <Link to="/login">去登录</Link>
                    </div></div>);
        }
        return (<div>
            <Input
                className="register-input"
                placeholder="输入注册码（需向管理员申请）"
                prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                value={code}
                onChange={(e) => this.setState({ code: e.target.value })}
            />
            <div className="register-btn register-next-step-btn">
                <Button type="primary" onClick={this.doValidCode}>下一步</Button>
            </div>
        </div>);
    }

    private doSelectBuyer = () => {
        this.setState({ identity: 0, code: "", codeRight: false, username: "", password: "", phone: "" });
    }

    private doSelectSeller = () => {
        this.setState({ identity: 1, code: "", codeRight: false, username: "", password: "", phone: "" });
    }

    private doRegister = () => {
        const { username, password, phone, identity, code } = this.state;
        if (username.trim().length > 6) {
            message.warning("用户名字数不能大于6");
            return;
        }
        if (password.trim().length < 3) {
            message.warning("密码不能少于3位");
            return;
        }

        if (identity === 0) {
            CaiPost("/register", { name: username, password, phone }).then(({ status, data }) => {
                if (status === 200 && data.code === 9000) {
                    message.success(data.msg);
                    this.props.history.replace("/login");
                    return;
                }
                message.error(data.msg);
            }).catch((e: Error) => {
                console.log(e);
                message.error(e && e.message);
            });
        }
        if (identity === 1) {
            CaiPost("/sellerRegister", { name: username, password, phone, code }).then(({ status, data }) => {
                if (status === 200 && data.code === 9900) {
                    message.success(data.msg);
                    this.props.history.replace("/login");
                    return;
                }
                message.error(data.msg);
            }).catch((e: Error) => {
                console.log(e);
                message.error(e && e.message);
            });
        }
    }

    private doValidCode = () => {
        if (this.state.code.trim().length === 0) {
            message.warning("注册码不能为空!");
            return;
        }
        CaiPost("/validCode", { code: this.state.code }).then(({ status, data }) => {
            if (status === 200 && data.code === 1000) {
                message.success(data.msg);
                this.setState({ codeRight: true });
                return;
            }
            message.error(data.msg);
        }).catch((e: Error) => {
            console.log(e);
            message.error(e && e.message);
        });
    }
}