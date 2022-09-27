import {axios} from "../axios";
import {ITest, IUser} from "../../interfaces";

const CancelToken = axios.CancelToken;

let cancel: () => void;


export interface IPageResponse<T> {
    content: T[];
}

export const getUsers = async (): Promise<IPageResponse<IUser>> => {
    const { data } = await axios.get('/users', {
        params: {
            size: 1000
        },
        cancelToken: new CancelToken(function executor(c) {
            cancel = c;
        })
    });

    return data;
}

export const getOneUserById = async (id: string): Promise<IUser> => {
    const { data } = await axios.get(`/users/${id}`);

    return data;
}

export const createUser = async (fields: unknown) => {
    const { data } = await axios.post('/users', fields);

    return data;
}

export const getUserTests = async (id: string): Promise<ITest[]> => {
    const { data } = await axios.get(`/users/${id}/tests`);

    return data;
}


export const cancelUsersRequest = function () {
    cancel && cancel();
}
