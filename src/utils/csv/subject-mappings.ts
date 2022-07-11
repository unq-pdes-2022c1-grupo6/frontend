import {RowType} from "../../components/import/ImportForm";
import {convertRowsToDTO, convertToEnumFn, MappingBuilder} from "./Mapping";
import lowerCase from "lodash/lowerCase";
import {HourDTO} from "../../services/dtos/requestDTO";

export type PlanType = "TPI2010" | "TPI2015" | "LI";
export type CicleMappingType = "cicloTPI" | "cicloLI";

export const coursesColumns = [
    "Código",
    "Actividad",
    "Comisión",
    "Modalidad",
    "Ubicacion",
    "Banda Horaria y Aula"
]

const toCorrelatives = (value: string) => {
    return value !== "" ? lowerCase(value).split(" ") : [];
}

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

const subjectsMapping = (cicleMapping: CicleMappingType) => new MappingBuilder()
    .addEnum("Plan TPI 2010", cicleMapping, ciclesMapping)
    .add("Código Materia", "codigo")
    .addNumber("Créditos", "creditos")
    .add("Materia", "materia")
    .add("Correlatividades", "correlativas", toCorrelatives)
    // li
    .addNumber("Secuencialidad CI - créditos", "ci")
    .addNumber("Secuencialidad NBW (Núcleo Básico) - créditos", "nbw")
    .addNumber("Secuencialidad CB  (W15BO) - créditos", "cb")
    // tpi
    .addNumber("Secuencialidad CO - créditos", "co")
    .addNumber("Secuencialidad CA - créditos", "ca")
    .addNumber("Secuencialidad CC - créditos", "cc")
    .getResult()


export const convertToSubjectsDTO = (rows: RowType[], cicle: CicleMappingType) => {
    const mappedSubjects = convertRowsToDTO(subjectsMapping(cicle))(rows);
    return fillPlanToSubjectsDTO(mappedSubjects, cicle);
}

export const fillPlanToSubjectsDTO = (rows: RowType[], cicle: CicleMappingType) => {
    return rows.reduce((acc: { plan: string, filled: RowType[] }, row) => {
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
    return +value.replace(/\D/g, "")
}


const locationMapping = [
    {mapping: "Bernal", columns: ["Bernal"]},
    {mapping: "Berazategui", columns: ["Berazategui"]},
    {mapping: "General_Belgrano", columns: ["General Belgrano"]}
]

const toCourseNumber = (value: string) => {
    if (value !== "8003N") {
        const course = value.split("-").at(-2)
        return removeLettersAndConvertToNumber(course || "")
    } else {
        return 80003
    }
}

const modelMappings = [
    {mapping: "PRESENCIAL", columns: ["Presencial"]},
    {mapping: "VIRTUAL_SINCRONICA", columns: ["Vitual Sincrónica", "Virtual Sincrónica"]},
    {mapping: "VIRTUAL_ASINCRONICA", columns: ["Virtual Asincrónica"]},
    {mapping: "SEMIPRESENCIAL", columns: ["Semipresencial"]},
];

const toMode = (value: string) => {
    const valueToMap = value.match(/\((.*)\)/)?.pop() || "";
    return convertToEnumFn(modelMappings)(valueToMap);
}

const toHours = (value: string): HourDTO[] => {
    let hours: HourDTO[] = [];
    if (value !== "") {
        const splitted = value.split("/");
        hours = splitted.map(s => {
            const [dia, inicio, a, fin, ...rest] = s.split(" ");
            return {dia, inicio, fin};
        })
    }
    return hours;
}

export const coursesMapping = new MappingBuilder()
    .add("Código", "codigo", removeLettersAndConvertToNumber)
    .add("Actividad", "actividad")
    .addEnum("Ubicacion", "locacion", locationMapping)
    .add("Comisión", "comision", toCourseNumber)
    .add("Comisión", "modalidad", toMode)
    .add("Banda Horaria y Aula", "horarios", toHours)
    .addNumber("Sobrecupos Totales", "sobrecuposTotales")
    .getResult()
