import difference from "lodash/difference";

export interface ErrorTypeI {
    fila?: number,
    type: "PARSEO" | "IMPORTACIÓN",
    messages: string[]
}

export interface RowErrorTypeI extends ErrorTypeI {
    fila: number,
}

export interface ValidatorI {
    isValid: (value: unknown, otherValue?: unknown) => boolean,
    getMessage: (value: string, otherValue?: unknown, includesLs?: string[]) => string
}

export const alwaysValid: ValidatorI = {
    isValid: () => true,
    getMessage: () => ""
}

export const notNumber: ValidatorI = {
    isValid: (value) => value === undefined,
    getMessage: (column, value) => `${column} con valor ${value} no es un numero valido`
}

export const notEmpty: ValidatorI = {
    isValid: (value) => value === "",
    getMessage: (column) => `${column} no puede ser vacio/a`,
}

export const notEnum: ValidatorI = {
    isValid: (value) => value === "",
    getMessage: (column, value, includesLs = []) =>
        `${column} con valor ${value || "vacio"} debe ser uno de los siguientes valores: ${includesLs}`
}


export const notValidColumns: ValidatorI = {
    isValid: (value, otherValue) => {
        const validColumns = value as string[];
        const actualColumns = otherValue as string[];

        return difference(validColumns, actualColumns).length === 0
    },
    getMessage: (label) => `Archivo equivocado, columnas no coinciden con las de ${label}`
}