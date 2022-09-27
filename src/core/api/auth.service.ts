import {axios} from "../axios";
import {IUser} from "../../interfaces";

export interface ILoginResponse {
    token: string;
    user: IUser
}

export const login = async (email: string, password: string): Promise<ILoginResponse> => {
    const {data} = await axios.post('/auth/login', {
        email,
        password,
    });

    return data;
}

export const getMe = async (token: string): Promise<IUser> => {
    const {data} = await axios.get('/auth/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return data;
}
