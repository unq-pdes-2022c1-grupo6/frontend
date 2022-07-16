import {convertRowsToDTO, convertToEnumFn, MappingBuilder} from "./Mapping";
import {betweenTwo, notEmpty, notNumber} from "./Validator";
import {locationMapping} from "./subjects-mappings";


export const toLocalDate = (value: string) => {
    const [day, month, year] = value.split("/");
    return `${year}-${month}-${day}`
}

export const toDNI = (value: string) => {
    return +(value.replace("DNI ", ""));
};

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

const resultsMapping = [
    {mapping: "APROBADO", columns: ["A", "P"]},
    {mapping: "PA", columns: ["E", "V"]},
    {mapping: "DESAPROBADO", columns: ["N", "R"]},
    {mapping: "AUSENTE", columns: ["U", "Vacia", ""]},
]

const toCode = (value: unknown) => {
    const newValue =  +(value as string);
    return !isNaN(newValue)? String(newValue): ""
}

const toResult = (value: unknown) => {
    return value !== ""? convertToEnumFn(resultsMapping)(value as string): "AUSENTE"
}

const recordsMapping = new MappingBuilder()
    .add("DNI", "dni", toDNI, notNumber)
    .add("Materia", "codigo", toCode, notEmpty)
    .add("Fecha", "fecha", toLocalDate)
    .add("Resultado", "resultado", toResult)
    .getResult()

export const convertToRecordsDTO = convertRowsToDTO(recordsMapping);
