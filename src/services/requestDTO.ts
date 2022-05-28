import {CourseDTO, Subject} from "./subjectDTO";


interface RequestI<SolicitudesType> {
    nombre: string,
    dni: number,
    resumenCursadas: unknown[]
    formulario: {
        id: number,
        dniAlumno: number,
        estado: string,
        solicitudes: SolicitudesType
    }
}

export interface SolicitudDTO {
    id: number,
    estado: string,
    comision: CourseDTO
}

export type RequestDTO = RequestI<SolicitudDTO[]>

export type RequestType = RequestI<Subject[]>
