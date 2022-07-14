import {convertRowsToDTO, convertToEnumFn, DTORowType, MappingBuilder} from "./Mapping";
import lowerCase from "lodash/lowerCase";
import {alwaysValid, notEmpty, notNumber} from "./Validator";
import {HourDTO} from "../../services/dtos/requestDTO";

export type PlanType = "TPI2010" | "TPI2015" | "LI";
export type CicleMappingType = "cicloTPI" | "cicloLI";


const ciclesMapping = [
    {mapping: "CC", columns: ["Complementarias", "Cursos Complementarios (CC)"]},
    {mapping: "CI", columns: ["Ciclo Introductorio (CI)", "Ciclo Introductorio"]},
    {mapping: "OR", columns: ["Otros requisitos", "NOR-W Otros requerimientos"]},
    {mapping: "NFH", columns: ["NFHW - Taller Formación Humanística"]},
    {mapping: "NBW", columns: ["NBW - Nucleo Basico - Diplo - 180 créditos"]},
    {mapping: "CB", columns: ["Cursos Básicos - 112 créditos"]},
    {mapping: "CA", columns: ["Cursos Avanzados", "Cursos Avanzados (CA)"]},
    {mapping: "SF", columns: ["Seminario Final"]},
    {mapping: "CO", columns: ["Cursos Obligatorios (CO)", "Cursos Orientados"]},
]

const toCorrelatives = (value: string): string[] => {
    return value !== "" ? lowerCase(value).split(" ") : [];
}

const subjectsMapping = (cicleMapping: CicleMappingType) => new MappingBuilder()
    .addEnum("Plan TPI 2010", cicleMapping, ciclesMapping, alwaysValid)
    .add("Código Materia", "codigo")
    .addNumber("Créditos", "creditos", alwaysValid)
    .add("Materia", "materia")
    .add("Correlatividades", "correlativas", toCorrelatives)
    // li
    .addNumber("Secuencialidad CI - créditos", "ci", alwaysValid)
    .addNumber("Secuencialidad NBW (Núcleo Básico) - créditos", "nbw", alwaysValid)
    .addNumber("Secuencialidad CB  (W15BO) - créditos", "cb", alwaysValid)
    // tpi
    .addNumber("Secuencialidad CO - créditos", "co", alwaysValid)
    .addNumber("Secuencialidad CA - créditos", "ca", alwaysValid)
    .addNumber("Secuencialidad CC - créditos", "cc", alwaysValid)
    .getResult()


export const convertToTPISubjectsDTO = convertRowsToDTO(subjectsMapping("cicloTPI"))

export const convertToLISubjectsDTO = convertRowsToDTO(subjectsMapping("cicloLI"))

export const fillPlanToSubjectsDTO = (rows: DTORowType[], cicle: CicleMappingType) => {
    return rows.reduce((acc: { plan: string, filled: DTORowType[] }, row) => {
        const newPlanRow = row[cicle] !== "" ? row[cicle] as string : acc.plan;
        const isSubjectRow = row["codigo"] !== "";
        return {
            plan: newPlanRow,
            filled: isSubjectRow ?
                acc.filled.concat({...row, [cicle]: newPlanRow}) :
                acc.filled
        }
    }, {plan: "", filled: []}).filled
}


const removeLettersAndConvertToNumber = (value: string) => {
    const newValue = value === "8003N"? 80003: +value.replace(/\D/g, "");
    return isNaN(newValue) || newValue === 0? "": newValue
}


const locationMapping = [
    {mapping: "Bernal", columns: ["Bernal"]},
    {mapping: "Berazategui", columns: ["Berazategui"]},
    {mapping: "General_Belgrano", columns: ["General Belgrano"]}
]


const toCourseNumber = (value: string) => {
    const course = value.split("-").at(-2);
    return removeLettersAndConvertToNumber(course || "")
}


const modeMappings = [
    {mapping: "PRESENCIAL", columns: ["Presencial"]},
    {mapping: "VIRTUAL_SINCRONICA", columns: ["Vitual Sincrónica", "Virtual Sincrónica"]},
    {mapping: "VIRTUAL_ASINCRONICA", columns: ["Virtual Asincrónica"]},
    {mapping: "SEMIPRESENCIAL", columns: ["Semipresencial"]},
];


const toMode = (value: string) => {
    const valueToMap = value.match(/\((.*)\)/)?.pop() || "";
    return convertToEnumFn(modeMappings)(valueToMap);
}


const toHours = (value: string): HourDTO[] => {
    let hours: HourDTO[] = [];
    if (value !== "") {
        const splitted = value.split("/");
        hours = splitted.flatMap(s => {
            const [dia, inicio, , fin] = s.split(" ");
            return dia && inicio && fin? [{dia, inicio, fin}]: [];
        })
    }
    return hours;
}

export const coursesMapping = new MappingBuilder()
    .add("Código", "codigo", removeLettersAndConvertToNumber, notNumber)
    .addString("Actividad", "actividad")
    .addEnum("Ubicacion", "locacion", locationMapping)
    .add("Comisión", "comision", toCourseNumber, notNumber)
    .add("Comisión", "modalidad", toMode, notEmpty)
    .add("Banda Horaria y Aula", "horarios", toHours)
    .addNumber("Sobrecupos Totales", "sobrecuposTotales")
    .getResult()

export const convertToCoursesDTO = convertRowsToDTO(coursesMapping);
