import {validateRow, ValidatorBuilder} from "./Validator";
import {toDNI, toLocalDate} from "./student-mappings";

const isValidDNI = (value: string) => !isNaN(toDNI(value))
const isValidDate = (value: string) => !isNaN(new Date(toLocalDate(value)).getTime());

const studentValidator = new ValidatorBuilder()
    .addVal("Apellido")
    .addVal("Nombre")
    .addNumberVal("Documento")
    .addIncludesVal("Propuesta", ["W", "P"])
    .addIncludesVal("Plan", ["2010", "2015", "2019"])
    .addIncludesVal("Estado Inscr.", ["Aceptado", "Pendiente", "Rechazado"])
    .addIncludesVal("Calidad", ["Activo", "Pasivo"])
    .addIncludesVal("Regular", ["S", "N"])
    .getResult()

export const validateStudentRow = validateRow(studentValidator);

const enrollmentValidator = new ValidatorBuilder()
    .addVal("Nro. Identificación", isValidDNI)
    .addVal("Comisión")
    .getResult()

export const validateEnrollmentRow = validateRow(enrollmentValidator);

const recordValidator = new ValidatorBuilder()
    .addNumberVal("Legajo")
    .addVal("DNI", isValidDNI)
    .addNumberVal("Materia")
    .addVal("Fecha", isValidDate)
    .addIncludesVal("Resultado", ["A",  "E",  "N", "P", "U", "R", "V", "Vacia"])
    .getResult()

export const validateRecordRow = validateRow(recordValidator);
