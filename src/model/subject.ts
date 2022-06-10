import capitalize from "lodash/capitalize";
import {CourseDTO, HorarioDTO, SelectedCourses, Subject, SubjectDTO} from "../services/subjectDTO";

export const tpi = "TPI - Tecnicatura universitaria en programación informática";
//const li = "LI - Licenciatura en informática";

export interface RequestedSubjectRow {
    materia: string,
    codigo: number,
    carrera: string,
    comisiones: number,
    cupoDisp: number,
    cupoTotal: number,
    demanda: number
}

export const convertSubjectsDTO = (subjects: SubjectDTO[]): Subject[] => {
    return subjects.map(({comisiones, ...rest}) => {
        return {carrera: tpi, comisiones: convertToCourses(comisiones), ...rest};
    })
}

export const convertToCourses = (comisiones: CourseDTO[]) => comisiones.map(
    ({id, estado, modalidad, horarios}) =>
        ({id, estado, description: `(${capitalize(modalidad)}) ${convertHorario(horarios)}`}));

const convertHorario = (horarios: HorarioDTO[]) => horarios.reduce(
    (acc, {dia, inicio, fin}) =>
        `${acc}- ${capitalize(dia)} ${inicio} a ${fin} `
    , "").substring(2);

export const convertToSelectedCourses = (solicitudes: Subject[]) => {
    return solicitudes.reduce((acc: SelectedCourses, subject) => {
        acc[subject.nombre] = subject.comisiones.map(c => c.id.toString());
        return acc
    }, {});
}

export const getFirstCareer = (subjects: Subject[]) => subjects[0].carrera;

export const getCareers = (subjects: Subject[]) =>
    subjects.reduce((acc: string[], {carrera}) => {
        return carrera && !acc.includes(carrera) ? [...acc, carrera] : acc;
    }, [])

export const getSubjectsByCareer = (subjects: Subject[], career: string | undefined) => {
    return subjects.filter(({carrera}) => carrera === career);
}

export const getTotalCourses = (subject: Subject) => subject.comisiones.length
