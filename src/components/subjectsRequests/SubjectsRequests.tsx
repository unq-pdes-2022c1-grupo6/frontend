import React, {useState} from "react";
import {Search, SearchField} from "../../model/search";
import {ColumnConfig, Page, PageContent} from "grommet";
import RequestsSearchBar from "../request/RequestsSearchBar";
import {CareerRadioGroup, StatusRequestRadioGroup} from "../request/FilterRadioGroup";
import SubjectsRequestsTable from "./SubjectsRequestsTable";

type SubjectsRequestsProps<RowType> = {
    searchPlaceholder: string,
    onClickRow: (datum: RowType) => void,
    data: RowType[],
    columns: ColumnConfig<(RowType)>[]
}

const SubjectsRequests = <RowType,>({searchPlaceholder, data, columns, onClickRow}: SubjectsRequestsProps<RowType>) => {
    const [search, setSearch] = useState(new Search());

    const onSearch = (key: string, value?: SearchField) => {
        if (search.isValueChanged(key, value)) {
            setSearch(prevSearch => prevSearch.setSearch(key, value))
        }
    }

    return <Page kind="wide" pad="large" gap="large" align="center">
        <PageContent direction="row-responsive" gap="large">
            <RequestsSearchBar
                placeholder={searchPlaceholder}
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
                tableProps={{
                    data: data,
                    columns: columns,
                    onClickRow: (event) => onClickRow(event.datum)
                }}
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

export default SubjectsRequests;
