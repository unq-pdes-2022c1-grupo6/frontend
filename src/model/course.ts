import {Course, SelectedCourses} from "../services/subjectDTO";
import reduce from "lodash/reduce";

export const convertSelectedCourses = (selectedCourses: SelectedCourses) => {
    return reduce(selectedCourses, (acc: number[], sc,) => ([...(sc.map(c => parseInt(c))), ...acc]), []);
}
export const getTotalSelectedCourses = (selectedCourses: SelectedCourses, subject: string) => {
    return selectedCourses && selectedCourses[subject] ? selectedCourses[subject].length : 0
}
export const mapToId = (courses: Course[]) => courses.map(({id, description}) => {
    return ({id: id.toString(), description});
})
export const totalSubjects = (selectedCourses: SelectedCourses) => {
    return reduce(selectedCourses, (acc, sc,) => sc.length === 0 ? acc : 1 + acc, 0);
}

export enum CourseState {
    PENDIENTE = "PENDIENTE",
    APROBADO = "APROBADO",
    RECHAZADO = "RECHAZADO",
}
