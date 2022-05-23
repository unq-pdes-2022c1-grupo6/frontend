import {Careers, SubjectsType} from "./subject";
import {RequestDTO} from "../services/requestDTO";


export const convertRequestDTO = (availableSubjects: Careers, requestDTO: RequestDTO) => {
    const solicitudes = requestDTO.formulario.solicitudes.reduce(
        (acc: SubjectsType,
         {estado, comisionDTO: {id, materia}}) => {
            const course = availableSubjects.getCourse(materia, id);
            if (course) {
                acc[materia] = [...(acc[materia] || []), {...course, state: estado}]
            }
            return acc
        },{})
    const {formulario, ...rest} = requestDTO;
    return {formulario: {...formulario, solicitudes}, ...rest}
}