import {RowType} from "../../components/import/ImportForm";
import every from "lodash/every";

export interface ValidatorI {
    [column: string]: (value: string) => boolean
}

export class ValidatorBuilder {
    result: ValidatorI

    constructor() {
        this.result = {}
    }

    addVal(column: string, isValid: (value: string) => boolean = (value) => value !== "") {
        this.result = {...this.result, [column]: isValid}
        return this
    }

    addNumberVal(column: string) {
        return this.addVal(column, (value) => !isNaN(+value))
    }

    addIncludesVal(column: string, includesLs: string[]) {
        return this.addVal(column, (value) => includesLs.includes(value))
    }

    getResult() {
        return this.result
    }

}


export const validateRow = (validator: ValidatorI) => (row: RowType) => {
    return every(row, (value, key) => {
        const isValidFn = validator[key];
        return !isValidFn || isValidFn(value)
    })
}
