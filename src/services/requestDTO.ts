import {SubjectsType} from "../model/subject";


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

export type RequestDTO = RequestI<{
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
}[]>

export type RequestType = RequestI<SubjectsType>
