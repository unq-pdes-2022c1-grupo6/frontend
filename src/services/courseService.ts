import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "../utils/axios-instance";
import {EnrolledCourse} from "./dtos/requestDTO";
import {getCurrentSemester} from "../model/semester";
import {subjectsKeys} from "../utils/query-keys";
import {useGlobalNotificator} from "../state/notificator";


const getOfferedCourses = (anio: number, semestre: string, nombre: string): Promise<EnrolledCourse[]> => {
    const params = {anio, semestre, nombre};
    return axiosInstance.get("/cuatrimestres/oferta", {params})
        .then((response) => response.data)
}

export const useOfferedCoursesQuery = (excluding: (string | number)[], search: string) => {
    const {year, semester} = getCurrentSemester();

    return useQuery(subjectsKeys.coursesOffered(search),
        () => getOfferedCourses(year, semester, search), {
            select: (data) => {
                return data.filter(c => !excluding.find(exc => c.id === exc || c.materia === exc))
            }
        })
}


export const getSubjectCourses = (code: string | undefined): Promise<EnrolledCourse[]> => {
    return code?
        axiosInstance.get(`/materias/${code}/comision`)
            .then((response) => response.data):
        Promise.reject(new Error("Materia no especificada en ruta"))
}


export const useSubjectCoursesQuery = (code: string | undefined) => {
    return useQuery(subjectsKeys.courses(code),
        () => getSubjectCourses(code),{
        enabled: Boolean(code),
        initialData: []
    })
}

export const patchCourseQuota = ({newQuota, id}: {newQuota: number, id: number}): Promise<EnrolledCourse> => {
    const body = {cantidadSobrecupos: newQuota, idComision: id};
    return axiosInstance.patch("/comisiones/cupos", body).then((response) => response.data)
}


export const useUpdateCourseQuota = (code: string | undefined) => {
    const queryClient = useQueryClient();
    const notificator = useGlobalNotificator();

    return useMutation(patchCourseQuota, {
        onSuccess: (data, {id}) => {
            queryClient.setQueryData<EnrolledCourse[]>(subjectsKeys.courses(code),
                (prevState) => {
                    return prevState?
                        prevState.map(c => {
                            let newCourse = {...c};
                            if (c.id === id) {
                                newCourse.sobreCuposTotales = data.sobreCuposTotales;
                                newCourse.cuposDisponibles = data.cuposDisponibles;
                            }
                            return newCourse
                        }): prevState
                });
            notificator?.setNotification("Sobrecupo total actualizado correctamente!");
        }
    })
}
