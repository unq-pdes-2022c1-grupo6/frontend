import {useQuery} from "@tanstack/react-query";
import axiosInstance from "../utils/axios-instance";
import {EnrolledCourse} from "./dtos/requestDTO";
import {getCurrentSemester} from "../model/semester";
import {subjectsKeys} from "../utils/query-keys";


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
