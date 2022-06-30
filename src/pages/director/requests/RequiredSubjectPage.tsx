import {Navigate, useParams} from "react-router-dom";
import {Accordion, AccordionPanel, Box, Heading, Page, PageContent, Spinner} from "grommet";
import {DIRECTOR_ROUTE, REQUIRED_SUBJECTS} from "../../../utils/routes";
import {useSubjectCoursesQuery} from "../../../services/courseService";
import startCase from "lodash/startCase";
import {useState} from "react";
import {formatSubjectCourse} from "../../../services/dtos/subjectDTO";
import last from "lodash/last";
import CourseRequestersTable from "../../../components/courses/CourseRequestersTable";

const RequiredSubjectPage = () => {
    const params = useParams();
    const code = params.materia && last(params.materia.split("-"));
    const subjectCoursesQuery = useSubjectCoursesQuery(code);
    const [openedAccordions, setOpenedAccordions] = useState([0]);

    if (!code) {
        return <Navigate to={"/" + DIRECTOR_ROUTE + "/" + REQUIRED_SUBJECTS}/>
    }

    return <Page kind="wide" pad="large" align="center">
        <PageContent direction="row" gap="large">
            <Heading  level="3" size="medium" margin="none">
                {startCase(params.materia)}
            </Heading>
            {subjectCoursesQuery.isLoading && <Spinner size="medium"/>}
        </PageContent>
        <PageContent gap="medium">
            {(subjectCoursesQuery.data || []).map(c => {
                return <Accordion
                    activeIndex={openedAccordions}
                    onActive={(newActiveIndex) => setOpenedAccordions(newActiveIndex)}
                    multiple
                    gap="medium">
                    <AccordionPanel label={`${formatSubjectCourse(c.numero, undefined, c.horarios)}
                     ${c.cuposDisponibles}/${c.sobreCuposTotales}`}>
                        <Box pad="medium">
                            <CourseRequestersTable
                                subject={code}
                                course={c.id}/>
                        </Box>
                    </AccordionPanel>
                </Accordion>
            })}
        </PageContent>
    </Page>

};

export default RequiredSubjectPage;
