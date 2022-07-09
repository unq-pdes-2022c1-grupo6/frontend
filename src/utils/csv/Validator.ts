import {RowType} from "../../components/import/ImportForm";
import flatMap from "lodash/flatMap";


export interface ErrorTypeI {
    rowNumber?: number,
    type: "PARSEO" | "IMPORTACIÓN",
    messages: string[]
}

export interface ValidateInfoType {
    validRows: RowType[],
    parsingErrors: ErrorTypeI[]
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


export const validateRow = (validator: ValidatorsI, row: RowType, rowNumber: number): ErrorTypeI => {
    const errorMessages = flatMap(row, (value, key) => {
        const columnValidator = validator[key];
        return columnValidator && !columnValidator.isValid(value as string) ?
            [columnValidator.getMessage(value as string)] : []
    })
    return {rowNumber, type: "PARSEO", messages: errorMessages}
}


export const validateRows = (validator: ValidatorsI) => (rows: RowType[]) => {
    return rows.reduce(
        ({validRows, parsingErrors}: ValidateInfoType,
         row, index) => {
            const rowErrors = validateRow(validator, row, index);
            return rowErrors.messages.length === 0 ?
                {validRows: validRows.concat({fila: index, ...row}), parsingErrors} :
                {validRows, parsingErrors: parsingErrors.concat(rowErrors)};
        }, {validRows: [], parsingErrors: []});
}

