import axiosInstance from "../utils/axios-instance";
import {useQuery} from "react-query";
import {SearchedStudentDTO, StudentDTO} from "./dtos/studentDTO";
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
