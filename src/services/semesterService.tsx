import {useQuery} from "react-query";
import axiosInstance from "../utils/axios-instance";
import {Semester} from "../model/semester";

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