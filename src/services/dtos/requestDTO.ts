import {RequestFormType} from "../requestService";

export interface RequestDTO {
    id: number,
    dniAlumno: number,
    solicitudes: RequestCourseDTO[],
    comisionesInscripto: EnrolledCourse[],
    estado: "CERRADO" | "ABIERTO",
}

export interface RequestWithCommentsDTO extends RequestDTO {
    comentarios: CommentDTO[]
}

interface CommentDTO {
    autor: string,
    descripcion: string,
    fecha: string
}

export enum CourseState {
    PENDIENTE = "PENDIENTE",
    APROBADO = "APROBADO",
    RECHAZADO = "RECHAZADO",
}

export interface RequestCourseDTO {
    id: number,
    estado: CourseState,
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
    modalidad: string,
    sobrecuposTotales: number,
    sobrecuposDisponibles: number,
}

export interface EnrolledCourse extends CourseDTO {
    locacion: "Bernal" | "Berazategui" | "General_Belgrano",
    cuposTotales: number,
    sobreCuposTotales: number,
    cuposDisponibles: number,
}

export const formatLocation = (location: string) => {
    let formatted = "";
    switch (location) {
        case "Berazategui":
            formatted = "Berazategui ";
            break;
        case "General_Belgrano":
            formatted = "General Belgrano ";
            break;
    }
    return formatted
}

export const getSelections = (requestDTO: RequestDTO): RequestFormType => {
    const selectionsG = requestDTO.comisionesInscripto.map(c => c.id);
    const selectionsS = requestDTO.solicitudes.map(c => c.comision.id)
    return [new Set(selectionsG), new Set(selectionsS)]
}

