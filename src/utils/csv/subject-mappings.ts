import {RowType} from "../../components/import/ImportForm";
import {convertRowsToDTO, MappingBuilder} from "./Mapping";
import lowerCase from "lodash/lowerCase";

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
    return value !== ""? lowerCase(value).split(" "): [];
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

export const subjectsMapping = (cicleMapping: CicleMappingType) => new MappingBuilder()
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


export const convertToSubjectsDTO = (rows: RowType[], cicle: CicleMappingType) =>  {
    const mappedSubjects = convertRowsToDTO(subjectsMapping(cicle))(rows);
    return fillPlanToSubjectsDTO(mappedSubjects, cicle);
}

export const fillPlanToSubjectsDTO = (rows: RowType[], cicle: CicleMappingType) => {
    return rows.reduce((acc: {plan: string, filled: RowType[]}, row) => {
        const newPlanRow = row[cicle] !== "" ? row[cicle] as string: acc.plan;
        const isSubjectRow = row["codigo"] !== "";
        return {
            plan: newPlanRow,
            filled: isSubjectRow?
                acc.filled.concat({...row, [cicle]: newPlanRow}):
                acc.filled}
    }, {plan: "", filled: []}).filled
}
