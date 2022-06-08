import React, {useState} from 'react';
import {Page, PageContent} from "grommet";
import RequestsSearchBar from "../components/subjectsRequests/RequestsSearchBar";
import {requests} from "../utils/fake-data";
import {CareerRadioGroup, StatusRequestRadioGroup} from "../components/subjectsRequests/FilterRadioGroup";
import SubjectsRequestsTable from "../components/subjectsRequests/SubjectsRequestsTable";
import {Search, SearchField} from "../model/search";


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