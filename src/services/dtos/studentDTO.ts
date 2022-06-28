import {RequestWithCommentsDTO} from "./requestDTO";

export interface StudentDTO {
    nombre: string,
    dni: number,
    legajo: number,
    carrera: "TPI" | "LI" | "SIMULTANEIDAD",
    coeficiente: number,
    formulario: RequestWithCommentsDTO,
    resumenCursadas: TakenSubjectDTO[]
}

export interface TakenSubjectDTO {
    nombreMateria: string,
    codigoMateria: string,
    estado: "APROBADO" | "DESAPROBADO" | "PA"
    fechaDeCarga: string,
    cantidadDeVecesCursada: number
}
