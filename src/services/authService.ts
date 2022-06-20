import axiosInstance from "../utils/mock-axios";
import {useMutation} from "react-query";
import {useAuth} from "../state/auth";
import {AxiosResponseHeaders} from "axios";

export interface StudentAccount {
    dni: string,
    contrasenia: string
}

export interface ConfirmationInfo {
    dni: string,
    codigo: string
}

export interface User {
    role: string;
    accessToken: string
}

const postLoginStudent = (newLogin: StudentAccount): Promise<AxiosResponseHeaders> => {
    const data = {...newLogin, dni: parseInt(newLogin.dni)};
    return  axiosInstance.post('/auth/alumno/login', data).then((response) => response.headers)
};

export const useLoginStudent = (dni: string) => {
    const auth = useAuth();

    return useMutation(postLoginStudent,{
        onSuccess: (response) => console.log(response)
    });
};

const postRegister = (newRegister: StudentAccount): Promise<void> => {
    const data = {...newRegister,
        dni: parseInt(newRegister.dni),
        confirmacionContrasenia: newRegister.contrasenia};
    return  axiosInstance.post('/auth/alumno/registrar', data).then((response) => response.data)
};

export const useRegisterStudent = (newRegister: StudentAccount) => {
    const auth = useAuth();

    return useMutation(postRegister,{
        onSuccess: (response) => console.log(response)
    });
};

const postConfirmation = (confirmation: ConfirmationInfo): Promise<void> => {
    const body = {codigo: parseInt(confirmation.codigo), dni: parseInt(confirmation.dni)}
    return  axiosInstance.post('/auth/alumno/confirmar', body).then((response) => response.data)
};

export const useConfirm = () => {
    return useMutation(postConfirmation,{
        onSuccess: (response) => console.log(response)
    });
};