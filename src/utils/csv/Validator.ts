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
    isValid: (value) => typeof value === "number",
    getMessage: (column, value) => `${column} con valor ${value || "vacio"} no es un numero valido`
}

export const notEmpty: ValidatorI = {
    isValid: (value) => value !== "",
    getMessage: (column) => `${column} no tiene un valor valido`,
}

export const notEnum: ValidatorI = {
    isValid: (value) => value !== "",
    getMessage: (column, value) =>
        `${column} con valor ${value || "vacio"} no es valido`
}


export const notValidColumns: ValidatorI = {
    isValid: (value, otherValue) => {
        const validColumns = value as string[];
        const actualColumns = otherValue as string[];

        return difference(validColumns, actualColumns).length === 0
    },
    getMessage: (label) => `Archivo equivocado, columnas no coinciden con las de ${label}`
}


export const betweenTwo = (one: string, two: string) : ValidatorI => ({
    isValid: (value) => value === one || value === two,
    getMessage: (column, value) => `${column} con valor ${value || "vacio"} no es ${one} o ${two}`
})
