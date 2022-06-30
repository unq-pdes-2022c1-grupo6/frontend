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

const getSemesterSubjects= (anio: number, semestre: string): Promise<SemesterSubjectDTO[]> => {
    const params = {anio, semestre};
    return axiosInstance.get("/materias/solicitudes", {params})
        .then((response) => response.data)
};

export const useSemesterSubjectsQuery = (year: number, semester: string) => {
    return useQuery(["subjects", year, semester],
        () => getSemesterSubjects(year, semester),
        {initialData: []}
    );
}
