import axiosInstance from "../utils/axios-instance";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {RequestedSubjectDTO, SubjectDTO} from "./dtos/subjectDTO";
import {DTORowType} from "../utils/csv/Mapping";
import {CicleMappingType, fillPlanToSubjectsDTO, PlanType} from "../utils/csv/subjects-mappings";
import {studentsKeys, subjectsKeys} from "../utils/query-keys";
import {useAuth} from "../state/auth";


type SubjectsForm =  {rows: DTORowType[], plan: PlanType, cicle: CicleMappingType};


const getStudentSubjects = (): Promise<SubjectDTO[]> => {
    return axiosInstance.get("/alumno/materias").then((response) => response.data)
};

export const useStudentSubjectsQuery = () => {
    const auth = useAuth();
    return useQuery(studentsKeys.subjects(auth?.user), getStudentSubjects,
        { initialData: [], cacheTime: 600000 });
};

const getRequestedSubjects = (nombre: string): Promise<RequestedSubjectDTO[]> => {
    return axiosInstance.get("/materias/solicitudes", {params: {nombre}})
        .then((response) => response.data)
};

export const useRequestedSubjectsQuery = (search: string) => {
    return useQuery(subjectsKeys.requests(search), () => getRequestedSubjects(search),
        {initialData: []});
}

const postSubjects = ({rows, plan, cicle}: SubjectsForm): Promise<void> => {
    const subjectsDTO = {plan, materias: fillPlanToSubjectsDTO(rows, cicle)};
    return  axiosInstance.post('/materias', subjectsDTO)
        .then((response) => response.data)
}

const useCreateSubjects = (plan: PlanType, cicle: CicleMappingType) => {
    const queryClient = useQueryClient();

    return useMutation(({rows}: {rows: DTORowType[]}) =>
        postSubjects({rows, plan, cicle}), {
        onSuccess: () => queryClient.invalidateQueries(subjectsKeys.allRequests)
    });
}

export const useCreateLISubjects = () => useCreateSubjects("LI", "cicloLI")

export const useCreateTPI2010Subjects = () => useCreateSubjects("TPI2010", "cicloTPI")

export const useCreateTPI2015Subjects = () => useCreateSubjects("TPI2015", "cicloTPI")

const postCourses = ({rows}: {rows: DTORowType[]}): Promise<void> => {
    const body = {comisionesACargar: rows};
    return  axiosInstance.post("/comisiones/oferta", body).then((response) => response.data)
}

export const useCreateCourses = () => {
    const queryClient = useQueryClient();
    return useMutation(postCourses, {
        onSuccess: () => queryClient.invalidateQueries(subjectsKeys.allCourses)
    });
}
