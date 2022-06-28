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
