import {CourseState, RequestWithCommentsDTO} from "./requestDTO";
import {TakenSubjectDTO} from "./subjectDTO";


export interface RequestRecord {
    nombreMateria: string,
    cuatrimestre: {
        anio: number,
        semestre: "S1" | "S2",
        inicio: string,
        fin: string
    }
    estado: CourseState
}

export interface StudentDTO {
    nombre: string,
    dni: number,
    carrera: "P" | "W" | "PW",
    formulario: RequestWithCommentsDTO,
    resumenCursadas: TakenSubjectDTO[],
    solicitudesAntiguas: RequestRecord[]
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
    cantidadAprobadas: number,
    locacion: string,
    regular: "S" | "N",
    calidad: "Activo" | "Pasivo",
    estado: "Aceptado" | "Pendiente"
}


export interface CourseRequesterDTO {
    dni: number,
    nombreApellido: string,
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
