import capitalize from "lodash/capitalize";
import keys from "lodash/keys";
import find from "lodash/find";
import reduce from "lodash/reduce";
import {CourseDTO, HorarioDTO, SubjectDTO} from "../services/subjectDTO";
import {RequestForm} from "../services/subjectsRequestService";


export const tpi = "TPI - Tecnicatura universitaria en programación informática";
//const li = "LI - Licenciatura en informática";

export type CareersType = { [career: string]: Subjects }

export class Careers {
    careers: CareersType

    constructor(subjectsDTO: SubjectDTO[]) {
        this.careers = {[tpi]: new Subjects(subjectsDTO)}
    }

    getCareers() {
        return keys(this.careers)
    }

    getSubjectsByCareer(career: string = tpi) {
        return this.careers[career]
    }

    getCourse(subject: string, id: number) {
        return this.getSubjectsByCareer().getCourse(subject, id.toString())
    }

}

export type CourseType = { id: string | undefined, description: string, state?: string}

export type SubjectsType = { [subject: string]: CourseType[] }

export class Subjects {
    subjects: SubjectsType

    constructor(subjectsDTO: SubjectDTO[]) {
        this.subjects = convertToSubjects(subjectsDTO);
    }

    getTotalCoursesBySubject(subject: string) {
        return this.subjects[subject] ? this.subjects[subject].length : 0
    }

    totalSubjects(rf: RequestForm) {
        return reduce(rf, (acc, cs, _) => cs.length === 0 ? acc : 1 + acc, 0);
    }

    getCourse(subject:string, id: string) {
        return find(this.subjects, (v,k) => k.includes(subject))?.find(course => course.id === id)
    }

}

export const convertToSubjects = (srfDTO: SubjectDTO[]) => {
    return srfDTO.reduce(
        (acc: SubjectsType, {codigo, nombre, comisiones}) => {
            acc[`${nombre} (${codigo})`] = convertToCourses(comisiones);
            return acc
        }, {})
}

const convertHorario = (horarios: HorarioDTO[]) => horarios.reduce(
    (acc, {dia, inicio, fin}) =>
        `${acc}- ${capitalize(dia)} ${inicio} a ${fin} `
    , "").substring(2);

const convertToCourses = (comisiones: CourseDTO[]) => comisiones.map(
    ({id, comision, modalidad, horarios}) =>
        ({id: id.toString(), description: `${comision} - (${capitalize(modalidad)}) ${convertHorario(horarios)}`}));
