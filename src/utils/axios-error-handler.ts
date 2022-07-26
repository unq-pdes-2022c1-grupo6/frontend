import {AxiosResponse} from "axios";
import {StatusType} from "grommet";
import {isRequestNotFound} from "../services/requestService";
import {isSemesterNotFound} from "../services/semesterService";


type ErrorHandlerFn = (response: AxiosResponse,
                       setNotification: ((message: string, status?: StatusType | undefined) => void) | undefined,
                       logout: (() => void) | undefined) => void


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

export const handle401or403Errors: ErrorHandlerFn = ({status}, setNotification, logout) => {
    if (status === 401) {
        setNotification && setNotification(`401 Unauthorized: Es necesario autenticar para
         obtener la respuesta solicitada`, "critical");
        logout && logout()
    }
    if (status === 403) {
        setNotification && setNotification(`403 Forbidden: El cliente no posee los permisos necesarios para cierto contenido,
         por lo que el servidor está rechazando otorgar una respuesta apropiada.`, "critical")
        logout && logout()
    }
}

export const handleGlobally = (error: unknown) => {
    const handleLocallyCheckers = [isRequestNotFound, isSemesterNotFound];
    return !handleLocallyCheckers.some(checker => checker(error))
}