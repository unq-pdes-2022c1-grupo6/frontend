import {Box, ColumnConfig, DataTable, Pagination} from "grommet";
import {PaginationI, SortI} from "../../model/search";
import {RequestingStudentRow} from "../../model/student";
import {RequestedSubjectRow} from "../../model/subject";

type SubjectsRequestsTableProps = {
    tableProps: {
        data: (RequestingStudentRow| RequestedSubjectRow)[],
        columns: ColumnConfig<(RequestingStudentRow| RequestedSubjectRow)>[]
    },
    sortProps: {
        sort: SortI,
        onSort: (key: string, order: "asc" | "desc") => void
    },
    paginationProps: {
        pagination: PaginationI,
        onPagination: (page: number) => void
    }
}

const SubjectsRequestsTable = ({tableProps, sortProps, paginationProps}: SubjectsRequestsTableProps) => {

    return <Box>
        <DataTable
            {...tableProps}
            sort={{
                direction: sortProps.sort.order,
                property: sortProps.sort.key,
                external: true
            }}
            onSort={sort => sortProps.onSort(sort.property, sort.direction)}
        />
        <Box align="end">
            <Pagination {...paginationProps.pagination}
                        onChange={args => paginationProps.onPagination(args.page)}/>
        </Box>
    </Box>
};

export default SubjectsRequestsTable;
