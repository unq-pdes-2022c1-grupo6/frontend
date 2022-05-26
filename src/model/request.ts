import {RequestDTO, RequestType} from "../services/requestDTO";
import {Subject} from "../services/subjectDTO";
import groupBy from "lodash/groupBy";
import reduce from "lodash/reduce";
import {convertToCourses, tpi} from "./subject";


export const convertToRequest = (requestDTO: RequestDTO): RequestType => {
    const groupedByMateria = groupBy(requestDTO.formulario.solicitudes, "comision.materia");
    const solicitudes = reduce(groupedByMateria, (acc: Subject[] , comisiones, nombre) => {
        const coursesDTO = comisiones.map(({comision, estado}) => ({...comision, estado}));
        return [{nombre, carrera:tpi, comisiones: convertToCourses(coursesDTO)}, ...acc];
    },[]);
    return {...requestDTO, formulario: {...requestDTO.formulario, solicitudes}}
}

