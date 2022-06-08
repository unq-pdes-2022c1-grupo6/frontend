import React, {useState} from 'react';
import {Page, PageContent} from "grommet";
import isEqual from "lodash/isEqual";
import get from "lodash/get";
import set from "lodash/set";
import RequestsSearchBar from "../components/subjectsRequests/RequestsSearchBar";
import {requests} from "../utils/fake-data";
import {CareerRadioGroup, StatusRequestRadioGroup} from "../components/subjectsRequests/FilterRadioGroup";
import SubjectsRequestsTable from "../components/subjectsRequests/SubjectsRequestsTable";

type SearchField = string | number | SortI;

export interface PaginationI {
    numberItems: number,
    step: number,
    page: number
}

export interface SortI {
    key: string,
    order: "asc" | "desc"
}

interface SearchI {
    filter: {
        general?: string,
        status?: string,
        career?: string
    };
    pagination: PaginationI,
    sort: SortI
}

class Search implements SearchI {
    filter: {
        general?: string,
        status?: string,
        career?: string
    };
    pagination: PaginationI;
    sort: SortI

    constructor(search?: SearchI) {
        if (search) {
            this.filter = search.filter;
            this.pagination = search.pagination;
            this.sort = search.sort
        } else {
            this.filter = {};
            this.sort = {
                key:"nyap",
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


const StudentsSubjectsRequest = () => {
    const [search, setSearch] = useState(new Search());

    const onSearch = (key: string, value?: SearchField) => {
        if (search.isValueChanged(key, value)) {
            setSearch(prevSearch => prevSearch.setSearch(key, value))
        }
    }

    return <Page kind="wide" pad="large" gap="large" align="center">
        <PageContent direction="row-responsive" gap="large">
            <RequestsSearchBar
                searchTerm={search.filter.general}
                onSearch={(searchTerm: string) => onSearch("filter.general", searchTerm)}
                onCancel={() => onSearch("filter.general")}/>
            <StatusRequestRadioGroup
                value={search.filter.status}
                onChange={(status: string) => onSearch("filter.status", status)}
                onCancel={() => onSearch("filter.status")}/>
            <CareerRadioGroup
                value={search.filter.career}
                onChange={(career: string) => onSearch("filter.career", career)}
                onCancel={() => onSearch("filter.career")}/>
        </PageContent>
        <PageContent>
            <SubjectsRequestsTable
                requests={requests}
                sortProps={{
                    sort: search.sort,
                    onSort: (key: string, order: "asc" | "desc") => onSearch("sort", {key, order}),
                }}
                paginationProps={{
                    pagination: search.pagination,
                    onPagination: (page: number) => onSearch("pagination.page", page)
                }}
            />
        </PageContent>
    </Page>
};

export default StudentsSubjectsRequest;