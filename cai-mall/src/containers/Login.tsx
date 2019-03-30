import { connect } from 'react-redux';
import { Dispatch } from 'react';
import Login from '../components/login/Login';
import * as actions from '../store/actions';
import { IStoreUser } from '../store/types';

function mapDispatchToProps(dispatch: Dispatch<actions.LoginAction>) {
    return {
        login: (user: IStoreUser) => dispatch(actions.loginInUser(user)),
    }
}

export default connect(null, mapDispatchToProps)(Login);