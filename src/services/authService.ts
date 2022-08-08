import axiosInstance from "../utils/axios-instance";
import {useMutation} from "@tanstack/react-query";
import {AxiosResponseHeaders} from "axios";
import {useNavigate} from "react-router-dom";
import {CONFIRM_ROUTE, HOME_ROUTE, LOGIN_ROUTE} from "../utils/routes";
import {useAuth} from "../state/auth";
import {useGlobalNotificator} from "../state/notificator";

export interface Account {
    user: string,
    password: string
}

export interface ConfirmationInfo {
    dni: string,
    codigo: string
}

const postLoginStudent = (newLogin: Account): Promise<AxiosResponseHeaders> => {
    const data = {contrasenia: newLogin.password, dni: parseInt(newLogin.user)};
    return  axiosInstance.post('/auth/alumno/login', data).then((response) => response.headers)
};

export const useLoginStudent = (dni: string) => {
    const auth = useAuth();
    const navigate = useNavigate();

    return useMutation(postLoginStudent,{
        onSuccess: (headers) => {
            auth?.login(dni, headers);
            navigate("/" + HOME_ROUTE)
        }
    });
};

const postRegister = (newRegister: Account): Promise<void> => {
    const data = {
        dni: parseInt(newRegister.user),
        contrasenia: newRegister.password,
        confirmacionContrasenia: newRegister.password};
    return  axiosInstance.post('/auth/alumno/registrar', data).then((response) => response.data)
};

export const useRegisterStudent = (dni: string) => {
    const navigate = useNavigate();
    const notificator = useGlobalNotificator();

    return useMutation(postRegister,{
        onSuccess: () => {
            navigate({
                pathname: "/" + CONFIRM_ROUTE,
                search: "?dni=" + dni,
            });
            notificator?.setNotification("Cuenta creada correctamente! Ahora solo falta confirmar");
        }
    });
};

const postConfirmation = (confirmation: ConfirmationInfo): Promise<void> => {
    const body = {codigo: parseInt(confirmation.codigo), dni: parseInt(confirmation.dni)}
    return  axiosInstance.post('/auth/alumno/confirmar', body).then((response) => response.data)
};

export const useConfirm = () => {
    const navigate = useNavigate();
    const notificator = useGlobalNotificator();

    return useMutation(postConfirmation,{
        onSuccess: () => {
            navigate(LOGIN_ROUTE);
            notificator?.setNotification("Cuenta confirmada correctamente, ya puede iniciar sesión normalmente")
        }
    });
};

const postLoginDirector = (directorLogin: Account): Promise<AxiosResponseHeaders> => {
    const body = {correo: directorLogin.user, contrasenia: directorLogin.password};
    return  axiosInstance.post('/auth/directivo/login', body).then((response) => response.headers)
}

export const useLoginDirector = (email: string) => {
    const auth = useAuth();
    const navigate = useNavigate();

    return useMutation(postLoginDirector,{
        onSuccess: (headers) => {
            auth?.login(email, headers);
            navigate(HOME_ROUTE);
        }
    });
}
