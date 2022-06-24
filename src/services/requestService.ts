import {useMutation, useQuery, useQueryClient} from "react-query";
import axiosInstance from "../utils/axios-instance";
import {RequestDTO} from "./dtos/requestDTO";
import {AxiosError} from "axios";
import isEqual from "lodash/isEqual";
import {REQUEST_ROUTE} from "../utils/routes";
import {useNavigate} from "react-router-dom";
import {useRequest} from "../components/layouts/PrivateStudentLayout";


export type RequestFormType = [Set<number>, Set<number>];

const getRequest = (): Promise<RequestDTO> => {
    return axiosInstance.get("/alumno/formulario").then((response) => response.data)
}

export const useRequestQuery = () => {
    const [, setRequest] = useRequest();

    return useQuery(["request"],
        () => getRequest(),
        {onSuccess: (data) => setRequest(data), retry: 1}
    )
}

export const isRequestNotFound = (error: unknown) => {
    return error instanceof AxiosError && isEqual(error.response?.data, {
        error: "ExcepcionUNQUE",
        message: "No se encontró ningun formulario para el cuatrimestre dado"
    });
}

const postRequest = ([selectionG, selectionS]: RequestFormType): Promise<RequestDTO> => {
    const body = {comisiones: Array.from(selectionS), comisionesInscripto: Array.from(selectionG)};
    return axiosInstance.post("/alumno/solicitudes", body).then((response) => response.data)
}


export const useCreateRequest = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [, setRequest] = useRequest();

    return useMutation(postRequest, {
        onSuccess: (data) => {
            queryClient.setQueryData(["request"], data);
            setRequest(data);
            navigate("/" + REQUEST_ROUTE);
        }
    })
}

const editRequest = ([selectionG, selectionS]: RequestFormType): Promise<RequestDTO> => {
    const body = {comisiones: Array.from(selectionS), comisionesInscripto: Array.from(selectionG)};
    return axiosInstance.patch("/alumno/solicitudes", body).then((response) => response.data)
}


export const useEditRequest = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [, setRequest] = useRequest();

    return useMutation(editRequest, {
        onSuccess: (data) => {
            queryClient.setQueryData(["request"], data);
            setRequest(data);
            navigate("/" + REQUEST_ROUTE);
        }
    })
}

const deleteRequest = (): Promise<void> => {
    return axiosInstance.delete("/alumno/formulario").then((response) => response.data)
}

export const useDeleteRequest = () => {
    const queryClient = useQueryClient();
    const [, setRequest] = useRequest();

    return useMutation(deleteRequest, {
        onSuccess: () => {
            queryClient.removeQueries(["request"]);
            queryClient.refetchQueries(["request"]);
            setRequest(undefined);
        }
    })
}
