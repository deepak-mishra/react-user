import UserService from '../services/UserService';
import {CREATE_USER, DELETE_ALL_USERS, DELETE_USER, GET_USERS, UPDATE_USER} from './types';
import { IUser, UserAction } from '../models/users';
import { Dispatch } from 'redux';

export const createUserAction = (user: IUser) => async (
    dispatch: Dispatch<UserAction>
) => {
    try {
        const res = await UserService.create(user);
        dispatch({
            type: CREATE_USER,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const getUsersAction = () => async (dispatch: Dispatch<UserAction>) => {
    try {
        const res = await UserService.getAll();

        dispatch({
            type: GET_USERS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateUserAction = (id: string, data: IUser) => async (dispatch: Dispatch<UserAction>) => {
    try {
        const res = await UserService.update(id, data);

        dispatch({
            type: UPDATE_USER,
            payload: data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteAllUsersAction = () => async (dispatch: Dispatch<UserAction>) => {
    try {
		const res = await UserService.removeAll();
        dispatch({
            type: DELETE_ALL_USERS,
            payload: res.data,
        });
		return Promise.resolve(res.data);
    } catch (err) {
		return Promise.reject(err);
    }
};


export const deleteUserAction = (id: string) => async (dispatch: Dispatch<UserAction>) => {
	try {
		const res = await UserService.remove(id);
		dispatch({
			type: DELETE_USER,
			payload: res.data,
		});
		return Promise.resolve(res.data);
	} catch (err) {
		return Promise.reject(err);
	}
};

export const findUserByNameAction = (name: string) => async (dispatch: Dispatch<UserAction>) => {
    try {
        const res = await UserService.findByTitle(name);

        dispatch({
            type: GET_USERS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};
