import {DataTable, Heading, Page, PageContent} from "grommet";
import {formatSubjectCourse} from "../../../services/dtos/subjectDTO";
import {CourseStatusText} from "../../../components/StatusText";
import {CourseState} from "../../../services/dtos/requestDTO";
import sortBy from "lodash/sortBy";
import {useRequest} from "../../../components/layouts/PrivateStudentLayout";
import {Navigate} from "react-router-dom";
import {HOME_ROUTE} from "../../../utils/routes";
import EnrolledCoursesTable from "../../../components/courses/EnrolledCoursesTable";
import isEqual from "lodash/isEqual";


const RequestPage = () => {
    const [request] = useRequest();

    if (!request || isEqual(request, {})) {
        return <Navigate to={"/" + HOME_ROUTE}/>
    }

    const requestedCourses = sortBy(request.solicitudes, ["comision.materia", "comision.numero"]);

    const enrolledCourses = sortBy(request.comisionesInscripto, ["materia", "numero"]);

    return <Page kind="narrow" margin={{vertical: "medium"}}>
        <PageContent gap="medium" justify="center">
            <Heading level={3} size="medium">
                {`Solicitud Estado: ${request.estado}`}
            </Heading>
            <DataTable
                sortable
                data={requestedCourses}
                columns={[
                    {header: 'Materia',  property: "comision.materia"},
                    {header: 'Comisión', property: "comision.numero",
                        render: (c) => formatSubjectCourse(c.comision.numero, c.comision.modalidad, c.comision.horarios)},
                    {header: 'Estado', property:"estado", render: (c) => {
                        return <CourseStatusText state={request.estado === "ABIERTO"? CourseState.PENDIENTE: c.estado}/>
                    }},
                ]}
            />
            <Heading level={4} size="medium" margin={{top: "medium", bottom: "xxsmall"}}>
                Comisiones Inscriptas por el Guaraní
            </Heading>
            <EnrolledCoursesTable data={enrolledCourses}/>
        </PageContent>
    </Page>

};

export default RequestPage;
