import {Box, DataTable, Pagination} from "grommet";
import {PaginationI, SortI} from "../../pages/StudentsSubjectsRequest";

interface StudentRow {
    dni: number,
    legajo: number,
    nyap: string,
    carrera: string,
    comisionesSol: number,
    materiasSol: number
}

type SubjectsRequestsTableProps = {
    requests: StudentRow[],
    sortProps: {
        sort: SortI,
        onSort: (key: string, order: "asc" | "desc") => void
    },
    paginationProps: {
        pagination: PaginationI,
        onPagination: (page: number) => void
    }
}

const SubjectsRequestsTable = ({requests, sortProps, paginationProps}: SubjectsRequestsTableProps) => {

    return <Box>
        <DataTable
            data={requests}
            sort={{
                direction: sortProps.sort.order,
                property: sortProps.sort.key,
                external: true
            }}
            onSort={sort => sortProps.onSort(sort.property, sort.direction)}
            columns={[
                {property: "dni", header: "DNI", size: 'xsmall', primary: true, sortable: false},
                {property: "legajo", header: "Legajo", size: 'xsmall', sortable: false},
                {property: "nyap", header: "Nombre y Apellido", size: 'small', sortable: true},
                {property: "carrera", header: "Carrera", size: 'small', sortable: false},
                {property: "comisionesSol", header: "Comisiones Solic.", size: 'small', align: "end", sortable: true},
                {property: "materiasSol", header: "Materias Solic.", size: 'xsmall', align: "end", sortable: true}
            ]}
        />
        <Box align="end">
            <Pagination {...paginationProps.pagination}
                        onChange={args => paginationProps.onPagination(args.page)}/>
        </Box>
    </Box>
};

export default SubjectsRequestsTable;