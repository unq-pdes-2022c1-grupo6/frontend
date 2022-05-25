import {RequestDTO, RequestType} from "../services/requestDTO";
import {Subject} from "../services/subjectDTO";
import groupBy from "lodash/groupBy";
import map from "lodash/map";
import {tpi} from "./subject";


const getSubject = (subjects: Subject[], materia: string) =>
    subjects.find(({nombre}) => nombre === materia);

const getCourse = (subject: Subject, id: number) =>
    subject.comisiones.find(c => c.id === id);

export const convertToRequest = (availableSubjects: Subject[], requestDTO: RequestDTO): RequestType => {
    const solicitudesWithMateria = requestDTO.formulario.solicitudes.map(s => ({...s, materia: "Bases de Datos"}))
    const groupedByMateria = groupBy(solicitudesWithMateria, "materia");
    const solicitudes = map(groupedByMateria, (comisiones, materia) => {
        const subject : Subject = getSubject(availableSubjects, materia)!;
        const courses = comisiones.map((c) => {
            const course = getCourse(subject, c.comisionId)!;
            return {estado: c.estado,  ...course}
        });
        return {...subject, carrera: tpi, comisiones: courses}
    })
    const {formulario, ...rest} = requestDTO;
    return {...rest, formulario: {...formulario, solicitudes}}
}

