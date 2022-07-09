import axiosInstance from "../utils/axios-instance";
import {useMutation, useQuery} from "react-query";
import {SemesterSubjectDTO, SubjectDTO} from "./dtos/subjectDTO";
import {RowType} from "../components/import/ImportForm";
import {CicleMappingType, convertToSubjectsDTO, PlanType} from "../utils/csv/subject-mappings";


type SubjectsForm =  {rows: RowType[], plan: PlanType, cicle: CicleMappingType};


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

const postSubjects = ({rows, plan, cicle}: SubjectsForm): Promise<void> => {
    const subjectsDTO = {plan, materias: convertToSubjectsDTO(rows, cicle)};
    return  axiosInstance.post('/materias/carga', subjectsDTO)
        .then((response) => response.data)
}

export const useCreateSubjects = () => {
    return useMutation(postSubjects);
}

