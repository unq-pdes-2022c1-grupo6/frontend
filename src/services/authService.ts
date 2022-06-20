import axiosInstance from "../utils/mock-axios";
import {useMutation} from "react-query";
import {AxiosResponseHeaders} from "axios";
import {useNavigate} from "react-router-dom";
import {CONFIRM_ROUTE, LOGIN_ROUTE} from "../utils/routes";
import {useAuth} from "../state/auth";

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
        onSuccess: (response) => {
            console.log(response);
            auth?.setStudent(dni);
        }
    });
};

const postRegister = (newRegister: StudentAccount): Promise<number> => {
    const data = {...newRegister,
        dni: parseInt(newRegister.dni),
        confirmacionContrasenia: newRegister.contrasenia};
    return  axiosInstance.post('/auth/alumno/registrar', data).then((response) => response.data)
};

export const useRegisterStudent = (dni: string) => {
    const auth = useAuth();
    const navigate = useNavigate();

    return useMutation(postRegister,{
        onSuccess: (response) => {
            auth?.setStudent(dni);
            navigate(CONFIRM_ROUTE);
            console.log(response);
        }
    });
};

const postConfirmation = (confirmation: ConfirmationInfo): Promise<void> => {
    const body = {codigo: parseInt(confirmation.codigo), dni: parseInt(confirmation.dni)}
    return  axiosInstance.post('/auth/alumno/confirmar', body).then((response) => response.data)
};

export const useConfirm = () => {
    const navigate = useNavigate();

    return useMutation(postConfirmation,{
        onSuccess: (response) => {
            console.log(response);
            navigate(LOGIN_ROUTE);
        }
    });
};
