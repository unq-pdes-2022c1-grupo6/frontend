import {convertRowsToDTO, MappingBuilder} from "./Mapping";


export const toLocalDate = (value: string) => {
    const [day, month, year] = value.split("/");
    return `${year}-${month}-${day}`
}

export const toDNI = (value: string) => +(value.replace("DNI ", ""));


const studentMapping = new MappingBuilder()
    .add("Apellido", "apellido")
    .add("Nombre", "nombre")
    .addNumber("Documento", "dni")
    .add("Propuesta", "propuesta")
    .add("Plan", "plan")
    .add("Estado Inscr.", "estado")
    .add("Calidad", "calidad")
    .add("Regular", "regular", (value) => value === "S")
    .getResult()

export const convertToStudentsDTO = convertRowsToDTO(studentMapping);


const recordsMapping = new MappingBuilder()
    .addNumber("Legajo", "legajo")
    .add("DNI", "dni", toDNI)
    .add("Materia", "codigo")
    .add("Fecha", "fechaDeCarga", toLocalDate)
    .add("Resultado", "resultado")
    .getResult()

export const convertToRecordsDTO = convertRowsToDTO(recordsMapping);

