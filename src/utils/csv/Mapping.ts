import {RowType} from "../../components/import/ImportForm";
import reduce from "lodash/reduce";

export interface MappingI {
    [column: string]: {
        mapping: string,
        convertFn: (value: string) => unknown;
    }
}

export interface EnumMapping {
    mapping: string,
    columns: string[]
}

export const convertToEnumFn = (enumMappings: EnumMapping[]) => (value: string) => {
    let enumm = "";
    if (value !== "") {
        const trimmed = value.trim();
        const enumMapping = enumMappings.find(em => em.columns.includes(trimmed));
        enumm = enumMapping? enumMapping.mapping: ""
    }
    return enumm
}

export class MappingBuilder {
    result: MappingI

    constructor() {
        this.result = {}
    }

    add(column: string, mapping: string,
        convertFn: (value: string) => unknown = (value) => value) {
        this.result = {...this.result, [column]: {mapping, convertFn}}
        return this
    }

    addNumber(column: string, mapping: string) {
        return this.add(column, mapping, (value) => value === "" ? 0 : +value)
    }

    addEnum(column: string, mapping: string, enumMappings: EnumMapping[]) {
        return this.add(column, mapping, convertToEnumFn(enumMappings))
    }

    getResult() {
        return this.result
    }

}


export const convertRowsToDTO = (mapping0: MappingI) => (rows: RowType[]): RowType[] => {
    return rows.map(row => reduce(row, (accObj, value, key) => {
        if (mapping0[key]) {
            const {mapping, convertFn} = mapping0[key];
            return {...accObj, [mapping]: convertFn(value as string)}
        }
        return accObj
    }, {fila: row.fila}))
}
