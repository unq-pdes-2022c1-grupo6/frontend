import axiosInstance from "../utils/mockAxios";
import {useMutation} from "react-query";
import {useAuth} from "../state/auth";

export interface User {
    role: string;
    accessToken: string
}

export interface RegisterForm {
    dni: string,
    username: string,
    password: string,
}

export interface LoginForm {
    username?: string,
    password?: string
}

const postLogin = (newLogin: LoginForm): Promise<User> => {
    return  axiosInstance.post('/login', newLogin).then((response) => response.data)
};

export const usePostLogin = () => {
    const auth = useAuth();

    return useMutation(postLogin,{
        onSuccess: (data) => auth?.login(data)
    });
};

const postRegister = (newRegister: RegisterForm): Promise<User> => {
    return  axiosInstance.post('/register', newRegister).then((response) => response.data)
};

export const usePostRegister = () => {
    const auth = useAuth();

    return useMutation(postRegister,{
        onSuccess: (data) => auth?.login(data)
    });
};

