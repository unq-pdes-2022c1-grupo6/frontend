import {convertRowsToDTO, MappingBuilder} from "./Mapping";


export const toLocalDate = (value: string) => {
    const [day, month, year] = value.split("/");
    return `${year}-${month}-${day}`
}

export const toDNI = (value: string) => +(value.replace("DNI ", ""));

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

const studentMapping = new MappingBuilder()
    .add("Apellido", "apellido")
    .add("Nombre", "nombre")
    .addNumber("Documento", "dni")
    .add("Propuesta", "propuesta")
    .add("Plan", "plan")
    .add("Estado Inscr.", "estado")
    .add("Calidad", "calidad")
    .add("Regular", "regular")
    .getResult()


export const convertToStudentsDTO = convertRowsToDTO(studentMapping);

export const recordsColumns = [
    "Legajo",
    "DNI",
    "Carrera",
    "Materia",
    "Nombre",
    "Fecha",
    "Resultado",
    "Nota",
    "Forma Aprobación",
    "Crédito",
    "Acta_Promo",
    "Acta_examen",
    "Plan"
]

const resultsMapping = [
    {mapping: "APROBADO", columns: ["A", "P"]},
    {mapping: "PA", columns: ["E", "V"]},
    {mapping: "DESAPROBADO", columns: ["N", "R"]},
    {mapping: "AUSENTE", columns: ["U", "Vacia"]},
]

const recordsMapping = new MappingBuilder()
    .add("DNI", "dni", toDNI)
    .add("Materia", "codigo")
    .add("Fecha", "fecha", toLocalDate)
    .addEnum("Resultado", "resultado", resultsMapping)
    .getResult()

export const convertToRecordsDTO = convertRowsToDTO(recordsMapping);
