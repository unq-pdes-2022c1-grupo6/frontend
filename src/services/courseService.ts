import {useQuery} from "react-query";
import axiosInstance from "../utils/axios-instance";
import {EnrolledCourse} from "./dtos/requestDTO";


const getAvailableCourses = (anio: number, semestre: string, nombre: string): Promise<EnrolledCourse[]> => {
    const params = {anio, semestre, nombre};
    return axiosInstance.get("/cuatrimestres/oferta", {params})
        .then((response) => response.data)
}


export const useAvailableCoursesQuery = (excluding: (string | number)[], year: number,
                                         semester: string, search: string) => {

    return useQuery(["courses", year, semester, search],
        () => getAvailableCourses(year, semester, search), {
            select: (data) => data.filter(c => !excluding.find(exc => c.id === exc || c.materia === exc))
        })
}

export const getSubjectCourses = (code: string | undefined): Promise<EnrolledCourse[]> => {
    console.log("fetcheado materias");
    return code?
        axiosInstance.get(`/materias/${code}/comision`)
            .then((response) => response.data):
        Promise.reject(new Error("Materia no especificada en ruta"))
}

export const useSubjectCoursesQuery = (code: string | undefined) => {
    return useQuery(["requests", "subject", code],
        () => getSubjectCourses(code),{
        enabled: Boolean(code)})
}