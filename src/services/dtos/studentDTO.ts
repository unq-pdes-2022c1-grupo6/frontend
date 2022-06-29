import {RequestWithCommentsDTO} from "./requestDTO";
import {TakenSubjectDTO} from "./subjectDTO";


export interface StudentDTO {
    nombre: string,
    dni: number,
    legajo: number,
    carrera: "TPI" | "LI" | "SIMULTANEIDAD",
    coeficiente: number,
    formulario: RequestWithCommentsDTO,
    resumenCursadas: TakenSubjectDTO[]
}

export interface SearchedStudentDTO {
    alumno: SStudentInfo,
    formularioId: number,
    estadoFormulario: "ABIERTO" | "CERRADO",
    cantComisionesInscripto: number,
    cantSolicitudesPendientes: number,
    cantSolicitudesAprobadas: number
}

interface SStudentInfo {
    dni: number,
    nombre: string,
    apellido: string,
    correo: "jorge.arenales20@alu.edu.ar",
    legajo: 12345,
    coeficiente: 8.7
}
