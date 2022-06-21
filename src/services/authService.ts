import axiosInstance from "../utils/axios-instance";
import {useMutation} from "react-query";
import {AxiosResponseHeaders} from "axios";
import {useNavigate} from "react-router-dom";
import {CONFIRM_ROUTE, HOME_ROUTE, LOGIN_ROUTE} from "../utils/routes";
import {useAuth} from "../state/auth";

export interface StudentAccount {
    dni: string,
    contrasenia: string
}

export interface ConfirmationInfo {
    dni: string,
    codigo: string
}

const postLoginStudent = (newLogin: StudentAccount): Promise<AxiosResponseHeaders> => {
    const data = {...newLogin, dni: parseInt(newLogin.dni)};
    return  axiosInstance.post('/auth/alumno/login', data).then((response) => response.headers)
};

export const useLoginStudent = (dni: string) => {
    const auth = useAuth();
    const navigate = useNavigate();

    return useMutation(postLoginStudent,{
        onSuccess: (headers) => {
            auth?.loginStudent(dni, headers);
            navigate("/" + HOME_ROUTE)
        }
    });
};

const postRegister = (newRegister: StudentAccount): Promise<void> => {
    const data = {...newRegister,
        dni: parseInt(newRegister.dni),
        confirmacionContrasenia: newRegister.contrasenia};
    return  axiosInstance.post('/auth/alumno/registrar', data).then((response) => response.data)
};

export const useRegisterStudent = (dni: string) => {
    const auth = useAuth();
    const navigate = useNavigate();

    return useMutation(postRegister,{
        onSuccess: () => {
            auth?.setStudent(dni);
            navigate("/" + CONFIRM_ROUTE);
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
        onSuccess: () => {
            navigate(LOGIN_ROUTE);
        }
    });
};
