import {RowType} from "../../components/import/ImportForm";
import reduce from "lodash/reduce";

export interface MappingI {
    [column: string]: {
        mapping: string,
        convertFn: (value: string) => string | boolean | number;
    }
}

export class MappingBuilder {
    result: MappingI

    constructor() {
        this.result = {}
    }

    add(column: string, mapping: string,
        convertFn: (value: string) => string | boolean | number = (value) => value) {
        this.result = {...this.result, [column]: {mapping, convertFn}}
        return this
    }

    addNumber(column: string, mapping: string) {
        return this.add(column, mapping, (value) => +value)
    }

    getResult() {
        return this.result
    }

}


export const convertRowsToDTO = (mapping0: MappingI) => (rows: RowType[]) => {
    return rows.map(row => reduce(row, (accObj, value, key) => {
        const {mapping, convertFn} = mapping0[key];
        return mapping && convertFn ? {...accObj, [mapping]: convertFn(value)} : accObj
    }, {}))
}
