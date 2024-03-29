import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "../utils/axios-instance";
import {CourseState, EnrolledCourse, RequestCourseDTO, RequestDTO, RequestWithCommentsDTO} from "./dtos/requestDTO";
import {AxiosError} from "axios";
import isEqual from "lodash/isEqual";
import {REQUEST_ROUTE} from "../utils/routes";
import {useNavigate} from "react-router-dom";
import {useRequest} from "../components/layouts/PrivateStudentLayout";
import {useGlobalNotificator} from "../state/notificator";
import {studentsKeys, subjectsKeys} from "../utils/query-keys";
import {useAuth} from "../state/auth";
import {CourseRequesterDTO, newApproved, StudentDTO} from "./dtos/studentDTO";


export type RequestFormType = [Set<number>, Set<number>];

type UpdateCourseDTO = {
    dni: number,
    id: number,
    courseNumber?: number,
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

const patchCourseState = ({dni, id, state, courseId}: UpdateCourseDTO): Promise<RequestCourseDTO> => {
    return axiosInstance
        .patch(`/alumnos/${dni}/solicitudes/${courseId}?formularioId=${id}&estado=${state}`)
        .then((response) => response.data)
}

export const useUpdateCourseState = (dni: number | undefined) => {
    const queryClient = useQueryClient();

    return useMutation(patchCourseState, {
        onSuccess: (data) => {
            queryClient.setQueryData<StudentDTO>(studentsKeys.detail(dni + ""),
                (prevState) => {
                    if (prevState) {
                        prevState.formulario.solicitudes = prevState.formulario.solicitudes.map(
                            (s) => s.id === data.id? data: s);
                    }
                    return prevState;
            });
        }
    })
}

const patchCloseRequest = ({dni, id}: { dni: number, id: number }): Promise<RequestWithCommentsDTO> => {
    return axiosInstance
        .patch(`/formulario/${id}/cerrar?dni=${dni}`)
        .then((response) => response.data)
}

export const useCloseRequest = (dni: number | undefined) => {
    const queryClient = useQueryClient();
    const notificator = useGlobalNotificator();

    return useMutation(patchCloseRequest, {
        onSuccess: (data) => {
            queryClient.setQueryData<StudentDTO>(studentsKeys.detail(dni + ""),
                (prevState) => {
                    if (prevState) prevState.formulario = data;
                    return prevState
                }
            );
            notificator?.setNotification("Solicitud cerrada, no se pueden hacer más modificaciones", "warning");
        }
    })
}

const patchNewCourse = ({dni, id}: { dni: number, id: number }): Promise<RequestWithCommentsDTO> => {
    return axiosInstance
        .patch(`/alumnos/${dni}/formulario?idComision=${id}`)
        .then((response) => response.data)
}

export const useAddCourseToRequest = (dni: number | undefined) => {
    const queryClient = useQueryClient();
    const notificator = useGlobalNotificator();

    return useMutation(patchNewCourse, {
        onSuccess: (data) => {
            queryClient.setQueryData<StudentDTO>(studentsKeys.detail(dni + ""),
                (prevState) => {
                    if (prevState) prevState.formulario = data;
                    return prevState
                }
            );
            notificator?.setNotification("Comisión agregada correctamente!");
        }
    })
}

export const useUpdateCourseRequest = (subject: string, filter: string, course?: number) => {
    const queryClient = useQueryClient();

    return useMutation(patchCourseState, {
        onSuccess: (data, {courseNumber, dni}) => {
             queryClient.setQueryData<CourseRequesterDTO[]>(
                 subjectsKeys.courseRequests(subject, course, filter),
                 (prevState) => {
                     let newState = prevState;
                     if (prevState) {
                         let newCant = 0;
                         newState = prevState.map(c => {
                             if (c.dni === dni && c.codigoMateria === subject && c.numeroComision === courseNumber) {
                                 newCant = c.cantidadDeAprobadas + newApproved(c.estado, data.estado);
                                 c.estado = data.estado;
                             }
                             return c
                         });
                         newState = newState.map(c => {
                             if (c.dni === dni) c.cantidadDeAprobadas = newCant;
                             return c
                         })
                     }
                     return newState
                 });
            queryClient.setQueryData<EnrolledCourse[]>(subjectsKeys.courses(subject),
                (prevState) => {
                return prevState?
                    prevState.map(c => {
                        const newCourse = {...c};
                        if (c.numero === courseNumber) {
                            newCourse.cuposDisponibles = data.comision.sobrecuposDisponibles;
                        }
                        return newCourse
                    }): prevState
                });
        }
    })
}


const patchRejectCourseRequesters = ({code, course}: {code: string, course: string}): Promise<void> => {
    const query = course === "Todas"? "": `?numero=${course}`;
    return axiosInstance.patch(`/materias/${code}/solicitudes/rechazar${query}`)
        .then((response) => response.data)
}

export const useRejectCourseRequesters = () => {
    const queryClient = useQueryClient();

    return useMutation(patchRejectCourseRequesters, {
        onSuccess: (data, {code, course}) => {
            const courseNumber = course === "Todas"? 0: +course;
            return queryClient.invalidateQueries(subjectsKeys.allCourseRequests(code, courseNumber));
        }
    });
}