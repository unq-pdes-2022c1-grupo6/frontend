import {useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {Accordion, AccordionPanel, Box, Button, Heading, Page, PageContent, Select, Spinner} from "grommet";
import {DIRECTOR_ROUTE, REQUIRED_SUBJECTS} from "../../../utils/routes";
import {useSubjectCoursesQuery} from "../../../services/courseService";
import {formatSubjectCourse} from "../../../services/dtos/subjectDTO";
import CourseRequestersTable from "../../../components/courses/CourseRequestersTable";
import {useRejectAllCourseRequesters,useUpdateCourseState2} from "../../../services/requestService";
import startCase from "lodash/startCase";
import last from "lodash/last";
import capitalize from "lodash/capitalize";



const RequiredSubjectPage = () => {
    const params = useParams();
    const code = params.materia && last(params.materia.split("-"));
    const subjectCoursesQuery = useSubjectCoursesQuery(code);
    const [openedAccordions, setOpenedAccordions] = useState([0]);
    const [courseNumber, setCourseNumber] = useState<string | undefined>();
    const updateCourseState = useUpdateCourseState2();
    const rejectAllCourseRequesters = useRejectAllCourseRequesters();
    const loading = subjectCoursesQuery.isLoading || updateCourseState.isLoading ||
        rejectAllCourseRequesters.isLoading;


    if (!code) {
        return <Navigate to={"/" + DIRECTOR_ROUTE + "/" + REQUIRED_SUBJECTS}/>
    }


    const getOptions = () => {
        let options: string[] = [];
        if (subjectCoursesQuery.data) {
            options = subjectCoursesQuery.data.map(c => c.numero.toString());
            options = ["Todas", ...options]
        }
        return options;
    }

    return <Page kind="wide" pad="large" align="center" gap="medium">
        <PageContent direction="row" gap="medium">
            <Heading level="3" size="medium" margin="none">
                {capitalize(startCase(params.materia))}
            </Heading>
            <Box width="small">
                <Select
                    placeholder="Elegir Comisión"
                    value={courseNumber}
                    options={getOptions()}
                    onChange={({ option }) => setCourseNumber(option)}
                    clear={{label: "Limpiar Selección"}}
                />
            </Box>
            <Button
                disabled={rejectAllCourseRequesters.isLoading || !courseNumber}
                label="Rechazar solicitudes"
                onClick={() => courseNumber &&
                    rejectAllCourseRequesters.mutate({code, course: courseNumber})}/>
            {subjectCoursesQuery.isLoading && <Spinner size="medium"/>}
        </PageContent>
        <PageContent gap="medium">
            {!loading &&
                <Accordion
                    activeIndex={openedAccordions}
                    onActive={(newActiveIndex) => setOpenedAccordions(newActiveIndex)}
                    multiple
                    gap="small">
                    {(subjectCoursesQuery.data || []).map((c, index) => {
                        return <AccordionPanel label={`${formatSubjectCourse(c.numero, undefined, c.horarios)}`}
                                               key={index}>
                            <Box pad="xsmall">
                                <CourseRequestersTable
                                    subject={code}
                                    course={c.numero}
                                    totalQuota={c.sobreCuposTotales}
                                    onChangeCourse={(courseId, id, state, dniAlumno) => {
                                        updateCourseState.mutate({courseId, id, state, dniAlumno})
                                    }}
                                />
                            </Box>
                        </AccordionPanel>
                    })}
                </Accordion>}
        </PageContent>
    </Page>

};

export default RequiredSubjectPage;
