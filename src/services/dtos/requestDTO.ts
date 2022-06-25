import {RequestFormType} from "../requestService";

export interface RequestDTO {
    id: number,
    dniAlumno: number,
    solicitudes: RequestCourseDTO[],
    "comisionesInscripto": EnrolledCourse[],
    estado: "CERRADO" | "ABIERTO"
}

export interface RequestCourseDTO {
    id: number,
    estado: "PENDIENTE" | "APROBADO" | "RECHAZADO",
    comision: RequestedCourse
}

export interface CourseDTO {
    id: number,
    numero: number,
    materia: string,
    horarios: HourDTO[]
}

export interface HourDTO {
    dia: string,
    inicio: string,
    fin: string
}

export interface RequestedCourse extends CourseDTO {
    modalidad: "PRESENCIAL" | "VIRTUAL" | "SEMIPRESENCIAL",
    sobrecuposTotales: number,
    sobrecuposDisponibles: number,
}

export interface EnrolledCourse extends CourseDTO {
    cuposTotales: number,
    sobreCuposTotales: number,
    cuposDisponibles: number,
}

export interface RequestFormDTO {
    comisiones: number[],
    comisionesInscripto: number[]
}


export const getSelections = (requestDTO: RequestDTO): RequestFormType => {
    const selectionsG = requestDTO.comisionesInscripto.map(c => c.id);
    const selectionsS = requestDTO.solicitudes.map(c => c.comision.id)
    return [new Set(selectionsG), new Set(selectionsS)]
}

export enum CourseState {
    PENDIENTE = "PENDIENTE",
    APROBADO = "APROBADO",
    RECHAZADO = "RECHAZADO",
}
