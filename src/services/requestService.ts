import {useMutation, useQuery, useQueryClient} from "react-query";
import axiosInstance from "../utils/axios-instance";
import {CourseState, RequestCourseDTO, RequestDTO, RequestWithCommentsDTO} from "./dtos/requestDTO";
import {AxiosError} from "axios";
import isEqual from "lodash/isEqual";
import {REQUEST_ROUTE} from "../utils/routes";
import {useNavigate} from "react-router-dom";
import {useRequest} from "../components/layouts/PrivateStudentLayout";
import {useGlobalNotificator} from "../state/notificator";
import {studentsKeys} from "../utils/query-keys";
import {useAuth} from "../state/auth";


export type RequestFormType = [Set<number>, Set<number>];

type UpdateCourseDTO = {
    dniAlumno: number,
    id: number,
    state: CourseState,
    courseId: number
}

export type SetRequestFn =  (newData: RequestCourseDTO[], newState?: "CERRADO" | "ABIERTO") => void;

const getRequest = (): Promise<RequestDTO> => {
    return axiosInstance.get("/alumno/formulario").then((response) => response.data)
}

export const useRequestQuery = () => {
    const [, setRequest] = useRequest();
    const queryClient = useQueryClient();
    const auth = useAuth();


    return useQuery(studentsKeys.request(auth?.user), getRequest,
        {
            retry: 1,
            onSuccess: (data) => setRequest(data),
            onError: (err) => {
                if (isRequestNotFound(err)) {
                    queryClient.setQueryData(studentsKeys.request(auth?.user), {} as RequestDTO);
                    setRequest({} as RequestDTO)
                }
            }}
    )
}

export const isRequestNotFound = (error: unknown) => {
    return error instanceof AxiosError && isEqual(error.response?.data, {
        exception: "ErrorDeNegocio",
        message: "No se encontró ningun formulario para el cuatrimestre dado"
    });
}

export const useCreateUpdateRequest = (
    axiosRequest: ([selectionG, selectionS]: RequestFormType) => Promise<RequestDTO>,
    successMessage: string
) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const auth = useAuth();
    const [, setRequest] = useRequest();
    const notificator = useGlobalNotificator();

    return useMutation(axiosRequest, {
        onSuccess: (data) => {
            queryClient.setQueryData(studentsKeys.request(auth?.user), data);
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
    const auth = useAuth();
    const queryClient = useQueryClient();
    const [, setRequest] = useRequest();
    const notificator = useGlobalNotificator();

    return useMutation(deleteRequest, {
        onSuccess: () => {
            setRequest({} as RequestDTO);
            notificator?.setNotification("Solicitud borrada correctamente!");
            queryClient.setQueryData(studentsKeys.request(auth?.user), {} as RequestDTO);
        }
    })
}

const patchCourseState = ({dniAlumno, id, state, courseId}: UpdateCourseDTO): Promise<RequestCourseDTO> => {
    return axiosInstance
        .patch(`/alumnos/${dniAlumno}/solicitudes/${courseId}?formularioId=${id}&estado=${state}`)
        .then((response) => response.data)
}

export const useUpdateCourseState = (dni: number | undefined, updateCourse: (data: RequestCourseDTO) => void) => {
    const queryClient = useQueryClient();

    return useMutation(patchCourseState, {
        onSuccess: (data) => {
            updateCourse(data);
            queryClient.invalidateQueries(["requestingStudents"]);
            return queryClient.invalidateQueries(["student", dni]);
        }
    })
}

const patchCloseRequest = ({dniAlumno, id}: { dniAlumno: number, id: number }): Promise<RequestWithCommentsDTO> => {
    return axiosInstance
        .patch(`/formulario/${id}/cerrar?dni=${dniAlumno}`)
        .then((response) => response.data)
}

export const useCloseRequest = (dni: number | undefined, close: SetRequestFn) => {
    const queryClient = useQueryClient();

    return useMutation(patchCloseRequest, {
        onSuccess: (data) => {
            close(data.solicitudes, data.estado);
            queryClient.invalidateQueries(["requestingStudents"]);
            return queryClient.invalidateQueries(["student", dni]);
        }
    })
}

const patchNewCourse = ({dni, id}: { dni: number, id: number }): Promise<RequestWithCommentsDTO> => {
    return axiosInstance
        .patch(`/alumnos/${dni}/formulario?idComision=${id}`)
        .then((response) => response.data)
}

export const useAddCourseToRequest = (dni: number | undefined, onAddCourse: SetRequestFn) => {
    const queryClient = useQueryClient();
    const notificator = useGlobalNotificator();

    return useMutation(patchNewCourse, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(["requestingStudents"]);
            return queryClient.invalidateQueries(["student", dni]).then(() => {
                notificator?.setNotification("Comisión cambiada correctamente!");
                onAddCourse(data.solicitudes);
            });
        }
    })
}


export const useUpdateCourseState2 = () => {
    const queryClient = useQueryClient();
    return useMutation(patchCourseState, {
        onSuccess: () => {
            return queryClient.invalidateQueries(["requests", "subject"]);
        }
    });
}

const patchRejectAllCourseRequesters = ({code, course}: {code: string, course: string}): Promise<void> => {
    const query = course === "Todas"? "": `?numero=${course}`;
    return axiosInstance.patch(`/materias/${code}/solicitudes/rechazar${query}`)
        .then((response) => response.data)
}

export const useRejectAllCourseRequesters = () => {
    const queryClient = useQueryClient();

    return useMutation(patchRejectAllCourseRequesters, {
        onSuccess: () => {
            return queryClient.invalidateQueries(["requests", "subject"]);
        }
    });
}