import {validateRows, ValidatorsBuilder} from "./Validator";
import {toDNI, toLocalDate} from "./student-mappings";

const isValidDNI = (value: string) => !isNaN(toDNI(value))
const isValidDate = (value: string) => !isNaN(new Date(toLocalDate(value)).getTime());

const studentValidator = new ValidatorsBuilder()
    .addVal("Apellido")
    .addVal("Nombre")
    .addNumberVal("Documento")
    .addIncludesVal("Propuesta", ["W", "P"])
    .addIncludesVal("Plan", ["2010","2012", "2015", "2019"])
    .addIncludesVal("Estado Inscr.", ["Aceptado", "Pendiente", "Rechazado"])
    .addIncludesVal("Calidad", ["Activo", "Pasivo"])
    .addIncludesVal("Regular", ["S", "N"])
    .getResult()

export const studentColumns = [
    "Apellido",
    "Nombre",
    "Documento",
    "Propuesta",
    "Plan",
    "Estado Inscr.",
    "Calidad",
    "Regular",
    "Locación"
];

export const validateStudentRow = validateRows(studentValidator, studentColumns);

const recordValidator = new ValidatorsBuilder()
    .addVal("DNI", isValidDNI)
    .addNumberVal("Materia")
    .addVal("Fecha", isValidDate)
    .addIncludesVal("Resultado", ["A",  "E",  "N", "P", "U", "R", "V", "Vacia"])
    .getResult()


const recordsColumns = [
    "DNI",
    "Materia",
    "Fecha",
    "Resultado"
]

export const validateRecordsRows = validateRows(recordValidator, recordsColumns);