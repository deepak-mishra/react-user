import http from './base-http';
import { IUser } from '../models/users';

const getAll = () => {
    return http.get('/users');
};

const get = (id: string) => {
    return http.get(`/user/${id}`);
};

const create = (data: IUser) => {
    return http.post('/user', data);
};

const update = (id: string, data: IUser) => {
    return http.put(`/user/${id}`, data);
};

const remove = (id: string) => {
    return http.delete(`/user/${id}`);
};

const removeAll = () => {
    return http.delete(`/user`);
};

const findByTitle = (name: string) => {
    return http.get(`/user?firstName=${name}`);
};

const UserService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle,
};

export default UserService;
