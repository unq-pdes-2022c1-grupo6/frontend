import axiosInstance from "../utils/axios-instance";
import {useQuery} from "react-query";
import { SubjectDTO } from "./dtos/subjectDTO";


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

