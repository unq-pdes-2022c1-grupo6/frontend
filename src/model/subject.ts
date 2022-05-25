import capitalize from "lodash/capitalize";
import reduce from "lodash/reduce";
import {Course, CourseDTO, HorarioDTO, SelectedCourses, Subject, SubjectDTO} from "../services/subjectDTO";

export const tpi = "TPI - Tecnicatura universitaria en programación informática";
//const li = "LI - Licenciatura en informática";


export const convertSubjectsDTO = (subjects: SubjectDTO[]): Subject[] => {
    return subjects.map(({comisiones, ...rest}) => {
        return {carrera: tpi, comisiones: convertToCourses(comisiones), ...rest};
    })
}

const convertToCourses = (comisiones: CourseDTO[]) => comisiones.map(
    ({id, modalidad, horarios}) =>
        ({id, description: `(${capitalize(modalidad)}) ${convertHorario(horarios)}`}));

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

export const convertSelectedCourses = (selectedCourses: SelectedCourses) => {
    return reduce(selectedCourses, (acc: number[], sc, _) => ([...(sc.map(c => parseInt(c))), ...acc]), []);
}

export const getFirstCareer = (subjects: Subject[]) => subjects[0].carrera

export const getCareers = (subjects: Subject[]) =>
    subjects.reduce((acc: string[], {carrera}) => {
        return acc.includes(carrera!) ? acc : [...acc, carrera!]
    }, [])

export const getSubjectsByCareer = (subjects: Subject[], career: string | undefined) => {
    return subjects.filter(({carrera}) => carrera === career);
}

export const mapToId = (courses: Course[]) => courses.map(({id, description}) => {
    return ({id: id.toString(), description});
})

export const getTotalSelectedCourses = (selectedCourses: SelectedCourses, subject: string) => {
    return selectedCourses && selectedCourses[subject] ? selectedCourses[subject].length : 0
}

export const getTotalCourses = (subject: Subject) => subject.comisiones.length

export const totalSubjects = (selectedCourses: SelectedCourses) => {
    return reduce(selectedCourses, (acc, sc, _) => sc.length === 0 ? acc : 1 + acc, 0);
}