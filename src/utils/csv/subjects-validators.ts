import {validateRows, ValidatorsBuilder} from "./Validator";


export const subjectValidator = new ValidatorsBuilder().getResult();

export const validateSubjectRow = validateRows(subjectValidator);