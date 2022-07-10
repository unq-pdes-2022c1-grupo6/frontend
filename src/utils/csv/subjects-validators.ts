import {validateRows, ValidatorsBuilder} from "./Validator";

export const plan2010Columns = [
    "Plan TPI 2010",
    "Código Materia",
    "Créditos",
    "Materia",
    "Correlatividades",
    "Secuencialidad CO - créditos",
    "Secuencialidad CA - créditos"
]

export const plan2015Columns = [
    "Plan TPI 2010",
    "Código Materia",
    "Créditos",
    "Materia",
    "Correlatividades",
    "Secuencialidad CI - créditos",
    "Secuencialidad CO - créditos",
    "Secuencialidad CA - créditos",
    "Secuencialidad CC - créditos"
]

export const planliColumns = [
    "Plan TPI 2010",
    "Código Materia",
    "Créditos",
    "Materia",
    "Correlatividades",
    "Secuencialidad CI - créditos",
    "Secuencialidad NBW (Núcleo Básico) - créditos",
    "Secuencialidad CB  (W15BO) - créditos"
]


export const subjectValidator = new ValidatorsBuilder().getResult();

export const validateTPI2010SubjectRow = validateRows(subjectValidator, plan2010Columns);

export const validateTPI2015SubjectRow = validateRows(subjectValidator, plan2015Columns);

export const validateLISubjectRow = validateRows(subjectValidator, planliColumns);


