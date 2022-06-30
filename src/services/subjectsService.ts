import axiosInstance from "../utils/axios-instance";
import {useQuery} from "react-query";
import {SemesterSubjectDTO, SubjectDTO} from "./dtos/subjectDTO";


const getStudentSubjects = (): Promise<SubjectDTO[]> => {
    return axiosInstance.get("/alumno/materias")
        .then((response) => response.data)
};

export const useStudentSubjectsQuery = () => {
    return useQuery(["studentSubjects"],
        () => getStudentSubjects(),
        {initialData: []}
    );
};

const getSemesterSubjects = (nombre: string): Promise<SemesterSubjectDTO[]> => {
    return axiosInstance.get("/materias/solicitudes", {params: {nombre}})
        .then((response) => response.data)
};

export const useSemesterSubjectsQuery = (search: string) => {
    return useQuery(["subjects", search],
        () => getSemesterSubjects(search),
        {initialData: []}
    );
}
