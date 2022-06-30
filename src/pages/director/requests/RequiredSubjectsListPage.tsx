import {getCurrentSemester} from "../../../model/semester";
import {useSemesterSubjectsQuery} from "../../../services/subjectsService";
import {DataTable, Page, PageContent} from "grommet";
import {useNavigate} from "react-router-dom";

const RequiredSubjectsListPage = () => {
    const {year, semester} = getCurrentSemester();
    const navigate = useNavigate();
    const semesterSubjectsQuery = useSemesterSubjectsQuery(year, semester);

    return <Page kind="narrow" pad="large" align="center">
        <PageContent>
            <DataTable
                replace
                step={15}
                sortable
                paginate
                data={semesterSubjectsQuery.data}
                onClickRow={(event)  => navigate(`${event.datum.codigo}`)}
                columns={[
                    {property: "nombre", header: "Materia", primary: true},
                    {property: "codigo", header: "Codigo"},
                    {property: "cantidadSolicitudes", header: "Cant. Solicitudes", align: "end"},
                    {property: "cantidadSolicitudesPendientes", header: "Cant. Solicitudes Pendientes" , align: "end"},
                ]}
            />
        </PageContent>
    </Page>

};

export default RequiredSubjectsListPage;
