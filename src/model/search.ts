import isEqual from "lodash/isEqual";
import get from "lodash/get";
import set from "lodash/set";

export type SearchField = string | number | SortI;

export interface PaginationI {
    numberItems: number,
    step: number,
    page: number
}

export interface SortI {
    key: string,
    order: "asc" | "desc"
}

export interface SearchI {
    filter: {
        general?: string,
        status?: string,
        career?: string
    };
    pagination: PaginationI,
    sort: SortI
}

export class Search implements SearchI {
    filter: {
        general?: string,
        status?: string,
        career?: string
    };
    pagination: PaginationI;
    sort: SortI

    constructor(search?: SearchI, sortDirection?: string) {
        if (search) {
            this.filter = search.filter;
            this.pagination = search.pagination;
            this.sort = search.sort
        } else {
            this.filter = {};
            this.sort = {
                key:sortDirection || "nyap",
                order: "desc"
            }
            this.pagination = {
                page: 1,
                numberItems: 30,
                step: 10
            }
        }
    }

    isValueChanged(key: string, value?: SearchField) {
        return ! isEqual(get(this, key), value)
    }

    setSearch(key: string, value?: SearchField) {
        const newSearch: SearchI = {...this};
        set(newSearch, key, value);
        return new Search(newSearch);
    }
}

