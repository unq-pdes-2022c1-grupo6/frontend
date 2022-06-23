import {useMutation, useQuery, useQueryClient} from "react-query";
import axiosInstance from "../utils/axios-instance";
import {RequestDTO} from "./dtos/requestDTO";
import {AxiosError} from "axios";
import isEqual from "lodash/isEqual";
import {REQUEST_ROUTE} from "../utils/routes";
import {useNavigate} from "react-router-dom";


export type RequestFormType = [Set<number>, Set<number>];

const getRequest = (): Promise<RequestDTO> => {
    return axiosInstance.get("/alumno/formulario").then((response) => response.data)
}

export const useRequestQuery = (isStudentLogged: boolean | undefined) => {
    return useQuery(["request"],
        () => getRequest(),
        {enabled: isStudentLogged}
    )
}

export const isRequestNotFound = (error: unknown) => {
    return error instanceof AxiosError && isEqual(error.response?.data, {
        error: "ExcepcionUNQUE",
        message: "No se encontró ningun formulario para el cuatrimestre dado"
    });
}

const postRequest = ([selectionS, selectionG]: RequestFormType): Promise<RequestDTO> => {
    const body = {comisiones: Array.from(selectionS), comisionesInscripto: Array.from(selectionG)};
    return axiosInstance.post("/api/alumno/solicitudes", body).then((response) => response.data)
}


export const useCreateRequest = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation(postRequest, {
        onSuccess: (data) => {
            queryClient.setQueryData(["request"], data)
            navigate(REQUEST_ROUTE);
        }
    })
}

const editRequest = ([selectionS, selectionG]: RequestFormType): Promise<RequestDTO> => {
    const body = {comisiones: Array.from(selectionS), comisionesInscripto: Array.from(selectionG)};
    return axiosInstance.patch("/api/alumno/solicitudes", body).then((response) => response.data)
}


export const useEditRequest = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation(editRequest, {
        onSuccess: (data) => {
            queryClient.setQueryData(["request"], data)
            navigate(REQUEST_ROUTE);
        }
    })
}

