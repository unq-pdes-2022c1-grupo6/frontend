import capitalize from "lodash/capitalize";
import keys from "lodash/keys";
import reduce from "lodash/reduce";
import {CourseDTO, HorarioDTO, SubjectDTO} from "../services/subjectDTO";
import {RequestForm} from "../services/subjectsRequestService";


const tpi = "TPI - Tecnicatura universitaria en programación informática";
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

    getSubjectsByCareer(career: string) {
        return this.careers[career]
    }
}

export type SubjectsType = { [subject: string]: { id: string, description: string }[] | string[] }

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

}

const convertToSubjects = (srfDTO: SubjectDTO[]) => {
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
