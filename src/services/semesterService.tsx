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

export const isSemesterNotFound = (error: unknown) => {
    return error instanceof AxiosError && isEqual(error.response?.data, {
        exception: "ErrorDeNegocio",
        message: "El cuatrimestre no existe"
    });
}

const getSemester = (anio: number, semestre: string): Promise<SemesterDTO> => {
    const params = {anio, semestre};
    return axiosInstance.get("/cuatrimestres", {params})
        .then((response) => response.data)
}

export const useSemesterQuery = (year: number, semester: string, setTerm: (term: string[]) => void) => {
    return useQuery(["enrollment", year, semester],
        () => getSemester(year, semester),
        {
            onSuccess: (data) => {
                setTerm([data.inicioInscripciones + ".000Z", data.finInscripciones + ".000Z"]);
            }
        }
    )
}

const postSemester = ([start, end]: string[]): Promise<void> => {
    const body = {
        inicioInscripciones: start.replace('.000Z', ''),
        finInscripciones: end.replace('.000Z', '')
    };
    return axiosInstance.post('/comisiones/oferta', body)
        .then((response) => response.data)
}

export const useUpdateSemesterQuery = (year: number, semester: string) => {
    const notificator = useGlobalNotificator();
    const queryClient = useQueryClient();

    return useMutation(postSemester, {
        onSuccess: () => {
            queryClient.invalidateQueries(["enrollment", year, semester]);
            notificator?.setNotification("Plazo fijado exitosamente!");
        }
    });
}

const patchCloseAllRequest = (): Promise<void> => {
    return axiosInstance.patch("/formulario/cerrar").then((response) => response.data)
}


export const useCloseAllRequest = () => {
    const queryClient = useQueryClient();
    const notificator = useGlobalNotificator();

    return useMutation(patchCloseAllRequest, {
        onSuccess: () => {
            queryClient.invalidateQueries(["subjects"]);
            queryClient.invalidateQueries(["requestingStudents"]);
            notificator?.setNotification("Se terminó la inscripción correctamente!");
        }})
}
