import {AxiosResponse} from "axios";
import {StatusType} from "grommet";
import {NavigateFunction} from "react-router-dom";
import {LOGIN_ROUTE} from "./routes";
import {isRequestNotFound} from "../services/requestService";
import {isSemesterNotFound} from "../services/semesterService";


type ErrorHandlerFn = (response: AxiosResponse,
                       setNotification: ((message: string, status?: StatusType | undefined) => void) | undefined,
                       navigate: NavigateFunction) => void


export const handle400Errors: ErrorHandlerFn = ({data, status}, setNotification) => {
    if (status === 400) {
        if (data.exception && data.message) {
            setNotification && setNotification(`400 ${data.exception} : ${data.message}`,
                "critical")
        }
        else {
            setNotification && setNotification("400 Bad Request: El servidor no puede o no procesará la petición" +
                " debido a algo que es percibido como un error del cliente", "critical")
        }
    }
}

export const handle401or403Errors: ErrorHandlerFn = ({status}, setNotification, navigate) => {
    if (status === 401) {
        setNotification && setNotification(`401 Unauthorized: Es necesario autenticar para
         obtener la respuesta solicitada`, "critical");
        navigate(LOGIN_ROUTE)
    }
    if (status === 403) {
        setNotification && setNotification(`403 Forbidden: El cliente no posee los permisos necesarios para cierto contenido,
         por lo que el servidor está rechazando otorgar una respuesta apropiada.`, "critical")
        navigate(LOGIN_ROUTE)
    }
}

export const handleGlobally = (error: unknown) => {
    const handleLocallyCheckers = [isRequestNotFound, isSemesterNotFound];
    return !handleLocallyCheckers.some(checker => checker(error))
}