import {useParams} from "react-router-dom";
import {useStudentQuery} from "../../../services/studentService";
import {Page, PageContent, Tabs, Tab, Box} from "grommet";
import StudentInfo from "../../../components/student/StudentInfo";
import {useState} from "react";
import TakenSubjectsTable from "../../../components/student/TakenSubjectsTable";
import RequestPage from "../../../components/request/RequestPage";
import EnrolledCoursesTable from "../../../components/courses/EnrolledCoursesTable";
import RequestRecordsTable from "../../../components/request/RequestRecordsTable";


const RequestingStudentPage = () => {
    const [tab, setTab] = useState(0);
    const params = useParams();
    const parsedDni = params.dni? parseInt(params.dni): undefined;
    const studentQuery = useStudentQuery(parsedDni);

    const getStudentInfoProps = () => {
        let studentInfo = {};
        if (studentQuery.data) {
            const {dni, nombre, carrera} = studentQuery.data;
            studentInfo = {dni, nombre, carrera}
        }
        return studentInfo;
    }


    return <Page kind="wide" margin={{top: "medium"}} gap="medium">
        <PageContent>
            <StudentInfo {...getStudentInfoProps()}/>
        </PageContent>
        <PageContent>
            <Tabs activeIndex={tab} onActive={setTab} justify="start">
                <Tab title="Solicitud">
                    <Box margin={{top: "medium"}}>
                        <RequestPage dni={parsedDni}/>
                    </Box>
                </Tab>
                <Tab title="Comisiones Inscriptas en Guaraní">
                    <Box width="large" margin={{top: "medium"}}>
                        <EnrolledCoursesTable data={studentQuery.data?.formulario.comisionesInscripto}/>
                    </Box>
                </Tab>
                <Tab title="Solicitudes Historicas">
                    <Box width="large" margin={{top: "medium"}}>
                        <RequestRecordsTable content={studentQuery.data?.solicitudesAntiguas}/>
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
