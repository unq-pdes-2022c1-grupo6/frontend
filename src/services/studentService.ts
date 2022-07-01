import axiosInstance from "../utils/axios-instance";
import {useQuery} from "react-query";
import {CourseRequesterDTO, SearchedStudentDTO, StudentDTO} from "./dtos/studentDTO";
import {StudentSearch, toStudentSearchDTO} from "../state/search";


const getStudent = (dni: number | undefined): Promise<StudentDTO> => {
    return dni?
        axiosInstance.get(`/alumnos/${dni}`)
            .then((response) => response.data)
        : Promise.reject(new Error("DNI no especificado"))
};

export const useStudentQuery = (dni: number | undefined) => {
    return useQuery(["student", dni],
        () => getStudent(dni),
        {enabled: Boolean(dni)}
    );
}

const getRequestingStudents = (search: StudentSearch): Promise<SearchedStudentDTO[]> => {
    const params =  toStudentSearchDTO(search);
    return axiosInstance.get("/alumnos/formulario", {params}).then((response) => response.data);
};

export const useSearchRequestingStudentsQuery = (search: StudentSearch) => {
    return useQuery(["requestingStudents", search],
        () => getRequestingStudents(search));
}

export const getCourseRequesters = (subject: string, numero: number, filter: string): Promise<CourseRequesterDTO[]> => {
    const filterDTO = filter === "Todos"? {} : {pendiente: "Pendiente" === filter};
    const params = {numero, ...filterDTO};
    return axiosInstance.get(`/materias/${subject}/solicitantes`, {params})
        .then((response) => response.data);
}

export const useCourseRequestersQuery = (subject: string, course: number, filter: string) => {
    return useQuery(["requests", "subject", subject, "course", course, filter],
        () => getCourseRequesters(subject, course, filter));
}
