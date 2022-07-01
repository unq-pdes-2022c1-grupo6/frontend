import {CourseState, RequestWithCommentsDTO} from "./requestDTO";
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
    correo: string,
    legajo: number,
    coeficiente: number
}


export interface CourseRequesterDTO {
    dni: number,
    nombreApellido: string,
    coeficiente: number,
    cantidadDeAprobadas: number,
    idSolicitud: number,
    numeroComision: number,
    codigoMateria: string,
    idFormulario: number,
    estado: CourseState
}

export const countApprovedRequesters = (requesters: CourseRequesterDTO[] | undefined = []) => {
    return requesters.reduce((acc, r) => r.estado === CourseState.APROBADO? acc + 1: acc, 0);
}