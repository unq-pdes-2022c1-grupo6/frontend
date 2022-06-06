import React, {useState} from 'react';
import {Page, PageContent} from "grommet";
import set from "lodash/set";
import unset from "lodash/unset";

interface SearchI {
    filter: {
        general?: string,
        status?: string,
        career?: string
    };
    pagination: {
        total?: number,
        firstIndex?: number,
        lastIndex?: number,
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
        firstIndex?: number,
        lastIndex?: number,
        page?: number
    };
    sort: { key?: string, order?: string }

    constructor(search?: SearchI) {
        if (search) {
            this.filter = search.filter;
            this.pagination = search.pagination;
            this.sort = search.sort
        }
        else {
            this.filter = {};
            this.pagination = {};
            this.sort = {}
        }
    }

    setSearch(key: string, value: string) {
        const newSearch: SearchI = {...this};
        set(newSearch, key, value);
        return new Search(newSearch);
    }

    unsetSearch(key: string) {
        const newSearch: SearchI = {...this};
        unset(newSearch, key);
        return new Search(newSearch);
    }
}


const StudentsSubjectsRequest = () => {
    const [search, setSearch] = useState(new Search());

    const onSearch = (key: string, value: string) =>
        setSearch(prevSearch => prevSearch.setSearch(key, value))

    const onCancel = (key: string) =>
        setSearch(prevSearch => prevSearch.unsetSearch(key))

    return <Page kind="wide" pad="large" gap="medium" align="center">
        <PageContent>
            {/*<RequestsSearchBar
                onSearch={(searchTerm: string) => onSearch("filter.general", searchTerm)}
                onCancel={() => onCancel("general")}/>*/}
        </PageContent>
        <PageContent>
            {/*<StudentsSubjectsRequestsTable
                requests={requests}
                onSearch={onSearch}
                onCancel={onCancel}
            />*/}
        </PageContent>
    </Page>
};

export default StudentsSubjectsRequest;