import { connect } from 'react-redux';
import { IStoreUser } from '../store/types';
import Main from '../components/main/Main';

function mapStateToProps({ username, identity, isLogin, token, id }: IStoreUser) {
    return {
        id,
        username,
        identity,
        isLogin,
        token
    }
}

export default connect(mapStateToProps, null)(Main);