import { CREATE_USER, DELETE_ALL_USERS, DELETE_USER, GET_USERS, UPDATE_USER } from '../actions/types';
import { IUser } from '../models/users';

const initialState: IUser[] = [];

function usersReducer(users = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_USER:
            return [...users, payload];

        case GET_USERS:
            return payload;

        case UPDATE_USER:
            return users.map((user) => {
                if (user.id === payload.id) {
                    return {
                        ...user,
                        ...payload,
                    };
                } else {
                    return user;
                }
            });

        case DELETE_USER:
            return users.filter(({ id }) => id !== payload.id);

        case DELETE_ALL_USERS:
            return [];

        default:
            return users;
    }
}

export default usersReducer;
