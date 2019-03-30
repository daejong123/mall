import * as React from 'react';
import './Login.css';
import { Input, Icon, Button, message } from 'antd';
import { Link } from "react-router-dom";
import { IStoreUser } from '../../store/types';
import { CaiPost } from '../../api/CaiApi';
import {History} from 'history';

interface IProps {
    login: (user: IStoreUser) => void;
    history: History
}

interface IState {
    userName: string;
    password: string;
}

class Login extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = { userName: "", password: "" };
    }

    public render() {
        const { userName, password } = this.state;
        return (
            <div className="login">
                <div className="login-title">
                    南财二手市场登录
                </div>
                <div className="login-input-container">
                    <Input
                        className="login-input"
                        placeholder="输入用户名"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        value={userName}
                        onChange={this.onChangeUserName}
                    />
                    <Input
                        className="login-input"
                        type="password"
                        placeholder="输入密码"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        value={password}
                        onChange={this.onChangePassword}
                    />
                </div>
                <div className="submit-btn">
                    <Button type="primary" onClick={this.doClick}>登录</Button>
                    <Link to="/register">去注册</Link>
                </div>
            </div>
        )
    }

    private onChangeUserName = (e: any) => {
        this.setState({ userName: e.target.value });
    }

    private onChangePassword = (e: any) => {
        this.setState({ password: e.target.value });
    }

    private doClick = () => {
        const { userName, password } = this.state;
        CaiPost("/login", {name: userName, password}).then((result: any) => {
            if (result.status === 200 && result.data.code === 8000) {
                message.success(result.data.msg);
                const r: IStoreUser = {isLogin: true, ...result.data.data};
                this.props.login(r);
                this.props.history.push("/");
            } else {
                message.error(result.data.msg);
            }
        }).catch((e: Error) => {
            message.error(e && e.message);
        });
    }
}
export default Login;