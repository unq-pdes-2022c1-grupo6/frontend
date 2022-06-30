import {useSemesterSubjectsQuery} from "../../../services/subjectsService";
import {Box, DataTable, Page, PageContent, Spinner} from "grommet";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import RequestsSearchBar from "../../../components/request/RequestsSearchBar";

const RequiredSubjectsListPage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const semesterSubjectsQuery = useSemesterSubjectsQuery(search);


    return <Page kind="narrow" pad="large" align="center">
        <PageContent align="start" gap="medium">
            <Box direction="row" gap="medium">
                <RequestsSearchBar
                    placeholder="Buscar por nombre de Materia..."
                    searchTerm={search}
                    onSearch={(value) => setSearch(value)}
                    onCancel={() => setSearch("")}
                />
                {semesterSubjectsQuery.isLoading && <Spinner size="medium"/>}
            </Box>
            <DataTable
                replace
                step={15}
                sortable
                paginate
                data={semesterSubjectsQuery.data}
                onClickRow={(event) => navigate(`${event.datum.codigo}`)}
                columns={[
                    {property: "nombre", header: "Materia", primary: true},
                    {property: "codigo", header: "Codigo"},
                    {property: "cantidadSolicitudes", header: "Cant. Solicitudes", align: "end"},
                    {property: "cantidadSolicitudesPendientes", header: "Cant. Solicitudes Pendientes", align: "end"},
                ]}
            />
        </PageContent>
    </Page>

};

export default RequiredSubjectsListPage;
