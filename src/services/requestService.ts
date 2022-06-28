import {useMutation, useQuery, useQueryClient} from "react-query";
import axiosInstance from "../utils/axios-instance";
import {CourseState, RequestDTO} from "./dtos/requestDTO";
import {AxiosError} from "axios";
import isEqual from "lodash/isEqual";
import {REQUEST_ROUTE} from "../utils/routes";
import {useNavigate} from "react-router-dom";
import {useRequest} from "../components/layouts/PrivateStudentLayout";
import {useGlobalNotificator} from "../state/notificator";


export type RequestFormType = [Set<number>, Set<number>];

export type UpdateCourseDTO = {
    dni: number,
    requestId: number,
    state: CourseState,
    id: number
}

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

export const useCreateUpdateRequest = (
    axiosRequest: ([selectionG, selectionS]: RequestFormType) => Promise<RequestDTO>,
    successMessage: string
) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [, setRequest] = useRequest();
    const notificator = useGlobalNotificator();

    return useMutation(axiosRequest, {
        onSuccess: (data) => {
            queryClient.setQueryData(["request"], data);
            setRequest(data);
            navigate("/" + REQUEST_ROUTE);
            notificator?.setNotification(successMessage);
        }
    })
}

const patchRequest = ([selectionG, selectionS]: RequestFormType): Promise<RequestDTO> => {
    const body = {comisiones: Array.from(selectionS), comisionesInscripto: Array.from(selectionG)};
    return axiosInstance.patch("/alumno/solicitudes", body).then((response) => response.data)
}

export const useEditRequest = () => {
    return useCreateUpdateRequest(patchRequest, "Solicitud actualizada correctamente!");
}

const postRequest = ([selectionG, selectionS]: RequestFormType): Promise<RequestDTO> => {
    const body = {comisiones: Array.from(selectionS), comisionesInscripto: Array.from(selectionG)};
    return axiosInstance.post("/alumno/solicitudes", body).then((response) => response.data)
}

export const useCreateRequest = () => {
    return useCreateUpdateRequest(postRequest, "Solicitud creada correctamente!");
}

const deleteRequest = (): Promise<void> => {
    return axiosInstance.delete("/alumno/formulario").then((response) => response.data)
}

export const useDeleteRequest = () => {
    const queryClient = useQueryClient();
    const [, setRequest] = useRequest();
    const notificator = useGlobalNotificator();

    return useMutation(deleteRequest, {
        onSuccess: () => {
            queryClient.removeQueries(["request"]);
            queryClient.refetchQueries(["request"]);
            setRequest(undefined);
            notificator?.setNotification("Solicitud borrada correctamente!");
        }
    })
}

const patchCourseState = ({dni, requestId, state, id}: UpdateCourseDTO) => {
    console.log("fetchendo");
    return axiosInstance
        .patch(`/alumnos/${dni}/solicitudes/${id}?formularioId=${requestId}&estado=${state}`)
        .then((response) => response.data)
}

export const useUpdateCourseState = (dni: number | undefined) => {
    const queryClient = useQueryClient();

    return useMutation(patchCourseState, {
        onSuccess: (data) => {
            console.log(data);
            return queryClient.invalidateQueries(["student", dni]);
        }})
}

