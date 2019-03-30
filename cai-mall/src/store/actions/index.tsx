import * as constants from '../constants';
import { IStoreUser } from '../types';

export interface ILoginInUser {
    type: constants.LOGIN_IN_USER
    user: IStoreUser
}

export interface ILoginOutUser {
    type: constants.LOGIN_OUT_USER
}

export type LoginAction = ILoginInUser | ILoginOutUser;

export function loginInUser(user: IStoreUser): ILoginInUser {
    return {
        type: constants.LOGIN_IN_USER,
        user
    }
}

export function loginOutUser(): ILoginOutUser {
    return {
        type: constants.LOGIN_OUT_USER
    }
}