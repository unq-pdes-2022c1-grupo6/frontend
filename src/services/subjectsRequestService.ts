import capitalize from "lodash/capitalize";
import {availableSubjectsDTO, DNI} from "../utils/fake-data";
import axiosInstance from "../utils/mock-axios";
import {useQuery} from "react-query";
import {GET_AVAILABLE_SUBJECTS_URL} from "../utils/constants";

interface HorarioDTO {
    "dia": string,
    "inicio": string,
    "fin": string
}

interface CourseDTO {
    id: number,
    comision: number,
    modalidad: string,
    horarios: HorarioDTO[]
}

interface SubjectDTO {
    codigo: string,
    nombre: string,
    comisiones: CourseDTO[]
}

export interface AvailableSubjects {
    [subject: string]: { id: string, description: string }[]
}

export interface RequestForm {
    [subject: string]: string[]
}

const tpi = "TPI - Tecnicatura universitaria en programación informática";
//const li = "LI - Licenciatura en informática";

const formatHorario = (horarios: HorarioDTO[]) => horarios.reduce(
    (acc, {dia, inicio, fin}) =>
        `${acc}- ${capitalize(dia)} ${inicio} a ${fin} `
    , "").substring(2);

const formatCourses = (comisiones: CourseDTO[]) => comisiones.map(
    ({id, comision, modalidad, horarios}) =>
        ({id: id.toString(), description: `${comision} - (${capitalize(modalidad)}) ${formatHorario(horarios)}`}));

const formatAvailableSubjectsDTO = (srfDTO: SubjectDTO[]) => {
    const formattedSubjects = srfDTO.reduce<AvailableSubjects>(
        (acc, {codigo, nombre, comisiones}) => {
            acc[`${nombre} (${codigo})`] = formatCourses(comisiones);
            return acc
        }, {});
    return {[tpi]: formattedSubjects}
};


const getAvailableSubjects = (dni: number): Promise<SubjectDTO[]> => {
    return axiosInstance.get(GET_AVAILABLE_SUBJECTS_URL + dni, {
        params: {
            anio: 2022,
            semestre: "S1"
        }
    }).then((response) => response.data);
};

export const useGetAvailableSubjects = () => {
    return useQuery(['availableSubjects', DNI],
        () => getAvailableSubjects(DNI), {
            select: (data) => formatAvailableSubjectsDTO(data),
        }
    );
};

export const availableSubjects = formatAvailableSubjectsDTO(availableSubjectsDTO);