import {HourDTO} from "./requestDTO";
import capitalize from "lodash/capitalize";

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

export const formatSubjectCourse = (comision: number, modalidad: string, horarios: HourDTO[]) => {
    return `${comision} - (${capitalize(modalidad)}) ${formatHour(horarios)}`
}

const formatHour = (hour: HourDTO[]) => {
    return hour.reduce((acc, {dia, inicio, fin}) =>
            `${acc}- ${capitalize(dia)} ${inicio} a ${fin} `, "").substring(2);
}
