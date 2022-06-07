import React, {useState} from 'react';
import {Page, PageContent} from "grommet";
import get from "lodash/get";
import set from "lodash/set";
import RequestsSearchBar from "../components/subjectsRequests/RequestsSearchBar";
import {requests} from "../utils/fake-data";
import {CareerRadioGroup, StatusRequestRadioGroup} from "../components/subjectsRequests/FilterRadioGroup";
import SubjectsRequestsTable from "../components/subjectsRequests/SubjectsRequestsTable";




interface SearchI {
    filter: {
        general?: string,
        status?: string,
        career?: string
    };
    pagination: {
        total?: number,
        step?: number,
        page?: number
    };
    sort: { key?: string, order?: string }
}

class Search implements SearchI {
    filter: {
        general?: string,
        status?: string,
        career?: string
    };
    pagination: {
        total?: number,
        page?: number,
        step?: number,
    };
    sort: { key?: string, order?: string }

    constructor(search?: SearchI) {
        if (search) {
            this.filter = search.filter;
            this.pagination = search.pagination;
            this.sort = search.sort
        } else {
            this.filter = {};
            this.pagination = {};
            this.sort = {}
        }
    }

    isValueChanged(key: string, value?: string | number) {
        return get(this, key) === value
    }

    setSearch(key: string, value?: string | number) {
        const newSearch: SearchI = {...this};
        set(newSearch, key, value);
        return new Search(newSearch);
    }
}


const StudentsSubjectsRequest = () => {
    const [search, setSearch] = useState(new Search());

    const onSearch = (key: string, value?: string | number) => {
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
            />
        </PageContent>
    </Page>
};

export default StudentsSubjectsRequest;