import axiosInstance from "../utils/axios-instance";
import {useQuery} from "react-query";
import {StudentDTO} from "./dtos/studentDTO";


const getStudent = (dni: string | undefined): Promise<StudentDTO> => {
    return dni?
        axiosInstance.get(`/alumnos/${dni}`)
            .then((response) => response.data)
        : Promise.reject(new Error("DNI no especificado"))
};

export const useStudentQuery = (dni: string | undefined) => {
    return useQuery(["student", dni],
        () => getStudent(dni),
        {enabled: Boolean(dni)}
    );
}