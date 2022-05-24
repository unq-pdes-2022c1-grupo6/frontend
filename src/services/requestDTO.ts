import {Subject} from "./subjectDTO";


interface RequestI<SolicitudesType> {
    nombre: string,
    dni: number,
    resumenCursadas: unknown[]
    formulario: {
        id: number,
        dniAlumno: number,
        estado: string,
        cuatrimestre: {
            id: number
            anio: number,
            semestre: string,
            inicioInscripciones: string,
            finInscripciones: string,
        }
        solicitudes: SolicitudesType
    }
}

export interface SolicitudDTO {
    id: number,
    estado: string,
    comisionDTO: {
        id: number,
        numero: number,
        materia: string,
        cuposTotales: number,
        sobreCuposTotales: number,
        cuposDisponibles: number
    }
}

export type RequestDTO = RequestI<SolicitudDTO[]>

export type RequestType = RequestI<Subject[]>
