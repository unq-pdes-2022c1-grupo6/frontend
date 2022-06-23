import {useQuery} from "react-query";
import axiosInstance from "../utils/axios-instance";
import {RequestDTO} from "./dtos/requestDTO";
import {AxiosError} from "axios";
import isEqual from "lodash/isEqual";


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
