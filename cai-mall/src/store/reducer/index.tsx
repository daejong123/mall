import { LoginAction } from '../actions';
import * as constants from '../constants';
import { IStoreUser } from '../types';
const Cookies = require('js-cookie');

const currentUser = Cookies.getJSON("currentUser");
const storeUser: IStoreUser = {
    id: currentUser ? currentUser.id : "",
    username: currentUser ? currentUser.username : "",
    identity: currentUser ? currentUser.identity : 0,
    token: currentUser ? currentUser.token : "",
    isLogin: currentUser ? currentUser.isLogin : false,
}

export function loginReducer(state: IStoreUser = storeUser, action: LoginAction): IStoreUser {
    console.log(action.type);
    switch (action.type) {
        case constants.LOGIN_IN_USER:
            Cookies.set("currentUser", action.user);
            return { ...state, ...action.user };
        case constants.LOGIN_OUT_USER:
            Cookies.set("currentUser", null);
            return { id: "", username: "", identity: 0, token: "", isLogin: false };
    }
    return state;
}