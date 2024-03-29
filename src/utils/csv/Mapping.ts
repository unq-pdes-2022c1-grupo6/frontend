import {alwaysValid, notEmpty, notEnum, notNumber, RowErrorTypeI, ValidatorI} from "./Validator";
import lowerCase from "lodash/lowerCase";

export interface MappingI {
    column: string,
    mapping: string,
    convertFn: (value: string) => unknown,
    validator: ValidatorI
}

export interface EnumMapping {
    mapping: string,
    columns: string[]
}

export const convertToEnumFn = (enumMappings: EnumMapping[]) => (value: string) => {
    let enumm = "";
    if (value !== "") {
        const trimmed = value.trim();
        const enumMapping = enumMappings.find(em => em.columns.some(c => lowerCase(trimmed).includes(lowerCase(c))));
        enumm = enumMapping? enumMapping.mapping: ""
    }
    return enumm
}

export class MappingBuilder {
    result: MappingI[]

    constructor() {
        this.result = []
    }

    add(column: string, mapping: string,
        convertFn: (value: string) => unknown = (value) => value,
        validator: ValidatorI = alwaysValid) {
        this.result = this.result.concat({column, mapping, convertFn, validator})
        return this
    }

    addString(column: string, mapping: string,
              validator: ValidatorI = notEmpty) {
        return this.add(column, mapping, (value) => value, validator)
    }

    addNumber(column: string, mapping: string,
              validator: ValidatorI = notNumber) {
        return this.add(column, mapping, (value) => value === "" ? 0 : +value, validator)
    }

    addEnum(column: string, mapping: string, enumMappings: EnumMapping[],
            validator: ValidatorI = notEnum) {
        return this.add(column, mapping, convertToEnumFn(enumMappings), validator)
    }

    getResult() {
        return this.result
    }

}

const convertRowToDTO = (mappings: MappingI[], row: ParsedRowType, rowNumber: number) => {
    return mappings.reduce((acc: { dto: DTORowType, errors: string[] },
                     {column, mapping, convertFn, validator}) => {
        const value = convertFn(row[column] || "");
        const isValid = validator.isValid(value);

        if (!isValid) acc.errors.push(validator.getMessage(column, value));
        if (acc.errors.length === 0) acc.dto[mapping] = value;

        return acc

    }, {dto: {fila: rowNumber+2}, errors: []})
}

export type ParsedRowType = {[column: string]: string};
export type DTORowType = {[column: string]: unknown, fila: number};
export type ConvertedRowsInfoType = {dtos: DTORowType[], errors: RowErrorTypeI[]};

export const convertRowsToDTO = (mappings: MappingI[]) => (rows: ParsedRowType[]) => {
    return rows.reduce((acc: ConvertedRowsInfoType, row, index) => {
        const {dto, errors} = convertRowToDTO(mappings, row, index);
        errors.length === 0?
            acc.dtos.push(dto):
            acc.errors.push({fila: dto.fila, type: "PARSEO", messages: errors})

        return acc
    }, {dtos: [], errors: []})
}

