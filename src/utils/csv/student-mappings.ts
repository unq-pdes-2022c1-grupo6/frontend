import {convertRowsToDTO, MappingBuilder} from "./Mapping";
import {betweenTwo} from "./Validator";
import {locationMapping} from "./subjects-mappings";


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

const statusMapping = [
    {mapping: "Pendiente", columns: ["Pendiente", "Rechazado"]},
    {mapping: "Aceptado", columns: ["Aceptado"]}
]

const toCorreo = (value: unknown) => value === "Romero"? process.env.REACT_APP_EMAIL: undefined;

const studentMapping = new MappingBuilder()
    .addNumber("Documento", "dni")
    .addString("Nombre", "nombre")
    .add("Apellido", "correo", toCorreo)
    .addString("Apellido", "apellido")
    .addString("Propuesta", "propuesta", betweenTwo("P", "W"))
    .addNumber("Plan", "plan")
    .addEnum("Estado Inscr.", "estado", statusMapping)
    .addString("Calidad", "calidad", betweenTwo("Activo", "Pasivo"))
    .addString("Regular", "regular", betweenTwo("S","N"))
    .addEnum("Locación", "locacion", locationMapping)
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
