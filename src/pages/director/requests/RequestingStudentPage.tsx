import {useParams} from "react-router-dom";
import {useStudentQuery} from "../../../services/studentService";
import {Page, PageContent, Tabs, Tab, Box} from "grommet";
import StudentInfo from "../../../components/student/StudentInfo";
import {useState} from "react";
import TakenSubjectsTable from "../../../components/student/TakenSubjectsTable";
import RequestPage from "../../../components/request/RequestPage";
import EnrolledCoursesTable from "../../../components/courses/EnrolledCoursesTable";
import {getApprovedSubjects} from "../../../services/dtos/requestDTO";


const RequestingStudentPage = () => {
    const [tab, setTab] = useState(0);
    const params = useParams();
    const parsedDni = params.dni? parseInt(params.dni): undefined;
    const studentQuery = useStudentQuery(parsedDni);

    const getStudentInfo = () => {
        let studentInfo = {};
        if (studentQuery.data) {
            const {formulario, resumenCursadas, ...rest} = studentQuery.data;
            studentInfo = rest
        }
        return studentInfo;
    }

    const getRequestPageProps = () => {
        let props = {};
        if (studentQuery.data) {
            const {resumenCursadas, formulario: {comisionesInscripto, comentarios, ...rest}} = studentQuery.data;
            const excSubj1 = getApprovedSubjects(resumenCursadas);
            const excSubj2 = comisionesInscripto.map(c => c.materia);
            props = {excludingSubjects: [...excSubj1, ...excSubj2], ...rest}
        }
        return props;
    }

    return <Page kind="wide" margin={{top: "medium"}} gap="medium">
        <PageContent>
            <StudentInfo {...getStudentInfo()}/>
        </PageContent>
        <PageContent>
            <Tabs activeIndex={tab} onActive={setTab} justify="start">
                <Tab title="Solicitud">
                    <Box margin={{top: "medium"}}>
                        <RequestPage
                            {...getRequestPageProps()}/>
                    </Box>
                </Tab>
                <Tab title="Comisiones Inscriptas en Guaraní">
                    <Box width="large" margin={{top: "medium"}}>
                        <EnrolledCoursesTable data={studentQuery.data?.formulario.comisionesInscripto}/>
                    </Box>
                </Tab>
                <Tab title="Historia Académica">
                    <Box width="xlarge" margin={{top: "medium"}}>
                        <TakenSubjectsTable content={studentQuery.data?.resumenCursadas}/>
                    </Box>
                </Tab>
            </Tabs>
        </PageContent>
    </Page>

};


export default RequestingStudentPage;
