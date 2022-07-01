import {Heading, Page, PageContent, Text} from "grommet";
import {formatSubjectCourse} from "../../../services/dtos/subjectDTO";
import {CourseStatusText} from "../../../components/StatusText";
import {RequestCourseDTO} from "../../../services/dtos/requestDTO";
import sortBy from "lodash/sortBy";
import GenericTable from "../../../components/GenericTable";
import {useRequest} from "../../../components/layouts/PrivateStudentLayout";
import {Navigate} from "react-router-dom";
import {HOME_ROUTE} from "../../../utils/routes";
import EnrolledCoursesTable from "../../../components/courses/EnrolledCoursesTable";


const RequestPage = () => {
    const [request] = useRequest();

    if (!request) {
        return <Navigate to={"/" + HOME_ROUTE}/>
    }

    const requestedCourses = sortBy(request.solicitudes, ["comision.materia", "comision.numero"]);

    const enrolledCourses = sortBy(request.comisionesInscripto, ["materia", "numero"]);

    return <Page kind="narrow" margin={{vertical: "medium"}}>
        <PageContent gap="medium" justify="center">
            <Heading level={3} size="medium">
                {`Solicitud Estado: ${request.estado}`}
            </Heading>
            <GenericTable<RequestCourseDTO>
                data={requestedCourses}
                columns={[
                    {label: 'Materia', format: (c) => <Text>{c.comision.materia}</Text>},
                    {label: 'Comisión', format: (c) => <Text>
                            {formatSubjectCourse(c.comision.numero, c.comision.modalidad, c.comision.horarios)}
                    </Text>},
                    {label: 'Estado', format: (c) => <CourseStatusText state={c.estado}/>},
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
