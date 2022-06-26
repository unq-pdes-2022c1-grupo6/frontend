import {useMutation, useQuery, useQueryClient} from "react-query";
import axiosInstance from "../utils/axios-instance";
import {Semester} from "../model/semester";
import {useGlobalNotificator} from "../state/notificator";
import {AxiosError} from "axios";
import isEqual from "lodash/isEqual";

export interface SemesterDTO {
    id: number,
    anio: number,
    semestre: "S1" | "S2",
    inicioInscripciones: string,
    finInscripciones: string,
}

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
    console.log("fetch semester");
    return axiosInstance.get("/cuatrimestres", {params})
        .then((response) => response.data)
}

export const isSemesterNotFound = (error: unknown) => {
    return error instanceof AxiosError && isEqual(error.response?.data, {
        error: "ExcepcionUNQUE",
        message: "No se ha encontrado el cuatrimestre"
    });
}

export const useSemesterQuery = (year: number, semester: string) => {
    return useQuery(["semester"],
        () => getSemester(year, semester))
}

const postSemester = ([inicioInscripciones, finInscripciones]: string[]): Promise<void> => {
    return axiosInstance.post('/comisiones/oferta', {inicioInscripciones, finInscripciones})
        .then((response) => response.data)
}

export const useUpdateSemesterQuery = (year: number, semester: string) => {
    const notificator = useGlobalNotificator();
    const queryClient = useQueryClient();

    return useMutation(postSemester, {
        onSuccess: () => queryClient.invalidateQueries(["semester"], {refetchInactive: true})
                .then(() => {
                    notificator?.setNotification("Plazo fijado exitosamente!");
                })
    });
}
