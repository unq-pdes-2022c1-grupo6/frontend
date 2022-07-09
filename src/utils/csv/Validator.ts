import {RowType} from "../../components/import/ImportForm";
import flatMap from "lodash/flatMap";
import difference from "lodash/difference";


export interface ErrorTypeI {
    rowNumber?: number,
    type: "PARSEO" | "IMPORTACIÓN",
    messages: string[]
}

export interface RowErrorTypeI extends ErrorTypeI {
    rowNumber: number,
}

export interface ValidateInfoType {
    hasValidColumns: boolean,
    validRows: RowType[],
    parsingErrors: RowErrorTypeI[]
}

type isValidType = (value: string) => boolean;
type getMessageType = (value: string) => string;

export interface ValidatorsI {
    [column: string]: {
        isValid: isValidType,
        getMessage: getMessageType
    }
}

export class ValidatorsBuilder {
    result: ValidatorsI

    constructor() {
        this.result = {}
    }

    createEmptyRowMessage(column: string): getMessageType {
        return () => `${column} no puede ser vacio/a`;
    }

    addVal(column: string,
           isValid: isValidType = (value) => value !== "",
           getMessage: getMessageType = this.createEmptyRowMessage(column)) {
        this.result = {...this.result, [column]: {isValid, getMessage}}
        return this
    }

    createInvalidNumberMessage(column: string): getMessageType {
        return (value) => `${column} con valor ${value} no es un numero valido`;
    }

    addNumberVal(column: string) {
        const getMessage = this.createInvalidNumberMessage(column);
        return this.addVal(column, (value) => !isNaN(+value), getMessage)
    }

    createNotIncludedMessage(column: string, includesLs: string[]): getMessageType {
        return (value) =>
            `${column} con valor ${value || "vacio"} debe ser uno de los siguientes valores: ${includesLs}`
    }

    addIncludesVal(column: string, includesLs: string[]) {
        const getMessage = this.createNotIncludedMessage(column, includesLs);
        return this.addVal(column, (value) => includesLs.includes(value), getMessage)
    }

    getResult() {
        return this.result
    }

}


export const validateRow = (validator: ValidatorsI, row: RowType, rowNumber: number): RowErrorTypeI => {
    const errorMessages = flatMap(row, (value, key) => {
        const columnValidator = validator[key];
        return columnValidator && !columnValidator.isValid(value as string) ?
            [columnValidator.getMessage(value as string)] : []
    })
    return {rowNumber, type: "PARSEO", messages: errorMessages}
}


export const validateRows = (validator: ValidatorsI, validColumns: string[]) =>
    (rows: RowType[], rowColums: string[]) => {
        const hasValidColumns = difference(validColumns, rowColums).length === 0;
        let validationInfo:  {validRows: RowType[], parsingErrors: RowErrorTypeI[]} =
            { validRows: [], parsingErrors: []};
        if (hasValidColumns) {
            validationInfo = rows.reduce(
                ({validRows, parsingErrors}: {validRows: RowType[], parsingErrors: RowErrorTypeI[]},
                 row, index) => {
                    const rowErrors = validateRow(validator, row, index);
                    return rowErrors.messages.length === 0 ?
                        {validRows: validRows.concat({fila: index, ...row}), parsingErrors} :
                        {validRows, parsingErrors: parsingErrors.concat(rowErrors)};
                }, {validRows: [], parsingErrors: []});
        }
        return {hasValidColumns, ...validationInfo};
    }

