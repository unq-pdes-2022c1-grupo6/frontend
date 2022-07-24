import axiosInstance from "../utils/axios-instance";
import {useMutation, useQuery} from "react-query";
import {CourseRequesterDTO, RequestingStudentDTO, StudentDTO} from "./dtos/studentDTO";
import {StudentSearch, toStudentSearchDTO} from "../state/search";
import {DTORowType} from "../utils/csv/Mapping";
import {studentsKeys} from "../utils/query-keys";


const getStudent = (dni: number | undefined): Promise<StudentDTO> => {
    return dni ?
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

const getRequestingStudents = (search: StudentSearch): Promise<RequestingStudentDTO[]> => {
    const params = toStudentSearchDTO(search);
    return axiosInstance.get("/alumnos/formulario", {params})
        .then((response) => response.data);
};

export const useSearchRequestingStudentsQuery = (search: StudentSearch) => {
    return useQuery(studentsKeys.requests(search), () => getRequestingStudents(search));
}

export const getCourseRequesters = (subject: string, numero: number, filter: string): Promise<CourseRequesterDTO[]> => {
    const filterDTO = filter === "Todos" ? {} : {pendiente: "Pendiente" === filter};
    const params = {numero, ...filterDTO};
    return axiosInstance.get(`/materias/${subject}/solicitantes`, {params})
        .then((response) => response.data);
}

export const useCourseRequestersQuery = (subject: string, course: number, filter: string) => {
    return useQuery(["requests", "subject", subject, "course", course, filter],
        () => getCourseRequesters(subject, course, filter));
}

const postStudents = ({rows}: { rows: DTORowType[] }): Promise<void> => {
    return axiosInstance.post("/alumnos", rows).then((response) => response.data)
}

export const useCreateStudents = () => {
    return useMutation(postStudents)
}

const postRecords = ({rows}: { rows: DTORowType[] }): Promise<void> => {
    return axiosInstance.patch("/alumnos/historia-academica", rows)
        .then((response) => response.data)
}

export const useCreateRecords = () => {
    return useMutation(postRecords)
}
