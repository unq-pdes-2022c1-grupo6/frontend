import {useMutation, useQuery} from "react-query";
import axiosInstance from "../utils/axios-instance";
import {Semester} from "../model/semester";
import {useGlobalNotificator} from "../state/notificator";

export interface SemesterDTO {
    id: number,
    anio: number,
    semestre: "S1" | "S2",
    inicioInscripciones: string,
    finInscripciones: string,
}

export type TermFormType = { term: string[] };

const getCurrentSemester = (): Promise<SemesterDTO> => {
    return axiosInstance.get("/alumno/cuatrimestre").then((response) => response.data)
}

export const useCurrentSemesterQuery = () => {
    return useQuery(["currentSemester"],
        () => getCurrentSemester(), {
            select: (data) => new Semester(data)
        })
}

const getSemester = (anio: number, semestre: string): Promise<SemesterDTO> => {
    const params = {anio, semestre};
    return axiosInstance.get("/cuatrimestres", {params})
        .then((response) => response.data)
}

export const useSemesterQuery = (year: number, semester: string, setTerm: (term: TermFormType) => void) => {
    return useQuery(["semester", year, semester],
        () => getSemester(year, semester), {
            onSuccess: (data) =>
                setTerm({term: [data.inicioInscripciones, data.finInscripciones]})
        })
}

const postSemester = ([inicioInscripciones, finInscripciones]: string[]): Promise<void> => {
    return axiosInstance.post('/comisiones/oferta', {inicioInscripciones, finInscripciones})
        .then((response) => response.data)
}

export const useUpdateSemesterQuery = () => {
    const notificator = useGlobalNotificator();

    return useMutation(postSemester, {
        onSuccess: () => {
            notificator?.setNotification("Plazo fijado exitosamente!");
        }
    });
}
