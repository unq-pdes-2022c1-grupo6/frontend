import {RequestDTO} from "./requestDTO";

export interface StudentDTO {
    nombre: string,
    dni: number,
    legajo: number,
    carrera: "TPI" | "LI" | "SIMULTANEIDAD",
    coeficiente: number,
    formulario: RequestWithCommentsDTO,
    resumenCursadas: TakenSubjectDTO[]
}

interface RequestWithCommentsDTO extends RequestDTO {
    comentarios: CommentDTO[]
}

interface CommentDTO {
    autor: string,
    descripcion: string,
    fecha: string
}

export interface TakenSubjectDTO {
    nombreMateria: string,
    codigoMateria: string,
    estado: "APROBADO" | "DESAPROBADO" | "PA"
    fechaDeCarga: string,
    cantidadDeVecesCursada: number
}
