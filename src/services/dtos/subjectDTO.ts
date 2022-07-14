import {HourDTO} from "./requestDTO";
import capitalize from "lodash/capitalize";

export interface ConflictDTO {
    fila: number,
    mensaje: string
}

export interface SubjectDTO {
    codigo: number,
    nombre: string,
    comisiones: SubjectCourseDTO[]

}

export interface SubjectCourseDTO {
    id: number,
    comision: number,
    modalidad: "PRESENCIAL" | "VIRTUAL" | "SEMIPRESENCIAL",
    horarios: HourDTO[]
}

export interface TakenSubjectDTO {
    nombreMateria: string,
    codigoMateria: string,
    estado: "APROBADO" | "DESAPROBADO" | "PA"
    fechaDeCarga: string,
    cantidadDeVecesCursada: number
}

export interface SemesterSubjectDTO {
    codigo: string,
    nombre: string,
    cantidadSolicitudes: number,
    cantidadSolicitudesPendientes: number
}

export const formatSubjectCourse = (comision: number, modalidad: string | undefined, horarios: HourDTO[]) => {
    const mod = modalidad ? `(${capitalize(modalidad)}) ` : "";
    return `${comision} - ${mod}${formatHour(horarios)}`
}

const formatHour = (hour: HourDTO[]) => {
    return hour.reduce((acc, {dia, inicio, fin}) =>
        `${acc}- ${capitalize(dia)} ${inicio} a ${fin} `, "").substring(2);
}

export const isConflictArray = (value: unknown): value is ConflictDTO[] => Array.isArray(value);