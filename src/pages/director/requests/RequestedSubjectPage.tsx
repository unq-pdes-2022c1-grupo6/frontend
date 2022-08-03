import {useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import last from "lodash/last";
import {useSubjectCoursesQuery} from "../../../services/courseService";
import {DIRECTOR_ROUTE, REQUIRED_SUBJECTS} from "../../../utils/routes";
import {Page, PageContent, Tab, Tabs, Box, Text, Heading} from "grommet";
import {formatSubjectCourse} from "../../../services/dtos/subjectDTO";
import {EnrolledCourse, formatLocation} from "../../../services/dtos/requestDTO";
import CourseRequestsTable from "../../../components/request/CourseRequestsTable";
import capitalize from "lodash/capitalize";
import startCase from "lodash/startCase";
import {useRejectCourseRequesters} from "../../../services/requestService";
import SelectionComp from "../../../components/SelectionComp";


const RequestedSubjectPage = () => {
    const params = useParams();
    const code = params.materia && last(params.materia.split("-"));
    const subjectCoursesQuery = useSubjectCoursesQuery(code);
    const rejectCourseRequesters = useRejectCourseRequesters();
    const [activeTab, setActiveTab] = useState(0);

    if (!code) {
        return <Navigate to={"/" + DIRECTOR_ROUTE + "/" + REQUIRED_SUBJECTS}/>
    }

    const getTabTitle = (c: EnrolledCourse) => {
        return `Comisión ${c.numero} ${formatLocation(c.locacion)}-
         ${c.cuposDisponibles}/${c.sobreCuposTotales} de Sobrecupos Total/es`
    }

    const getOptions = () => {
        let options: string[] = [];
        if (subjectCoursesQuery.data) {
            options = subjectCoursesQuery.data.map(c => c.numero.toString());
            if (options.length !== 1) options.push("Todas");
        }
        return options;
    }

    return <Page kind="wide" pad="medium" align="center" gap="medium">
        <PageContent direction="row-responsive" align="center" gap="medium">
            <Heading level="3" size="medium" margin="none">
                {capitalize(startCase(params.materia))}
            </Heading>
            <Box width="large">
                <SelectionComp
                    placeholder="Elegir Comisión"
                    options={getOptions()}
                    buttonLabel="Rechazar solicitudes pendientes"
                    onSubmit={(course) => rejectCourseRequesters.mutate({code, course})}
                    disabled={rejectCourseRequesters.isLoading}/>
            </Box>
        </PageContent>
        <PageContent>
            {subjectCoursesQuery.data.length !== 0 &&
                <Tabs alignControls="start"
                  justify="start"
                  activeIndex={activeTab}
                  onActive={setActiveTab}>
                    {subjectCoursesQuery.data.map((c, index) => {
                        return <Tab title={getTabTitle(c)} key={index}>
                            <Box gap="small" pad="medium">
                                <Text>{formatSubjectCourse(c.numero, undefined, c.horarios)}</Text>
                                <CourseRequestsTable subject={code} course={c.numero}/>
                            </Box>
                        </Tab>
                    })}
                </Tabs>}
        </PageContent>
    </Page>

};

export default RequestedSubjectPage;
