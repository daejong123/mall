import { connect } from 'react-redux';
import { IStoreUser } from '../store/types';
import * as actions from '../store/actions';
import Header from '../components/header/Header';
import { Dispatch } from 'react';

function mapStateToProps({id, username, identity, isLogin, token }: IStoreUser) {
    return {
        id,
        username,
        identity,
        isLogin,
        token
    }
}

function mapDispatchToProps(dispatch: Dispatch<actions.LoginAction>) {
    return {
        logout: () => dispatch(actions.loginOutUser()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
