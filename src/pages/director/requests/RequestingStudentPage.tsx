import {useParams} from "react-router-dom";
import {useStudentQuery} from "../../../services/studentService";
import {Page, PageContent, Tabs, Tab, Box} from "grommet";
import StudentInfo from "../../../components/studentDetails/StudentInfo";
import {useState} from "react";
import TakenSubjectsTable from "../../../components/studentDetails/TakenSubjectsTable";


const RequestingStudentPage = () => {
    const [tab, setTab] = useState(0);
    const params = useParams();
    const studentQuery = useStudentQuery(params.dni);

    const getStudentInfo = () => {
        let studentInfo = {};
        if (studentQuery.data) {
            const {formulario, resumenCursadas, ...rest} = studentQuery.data;
            studentInfo = rest
        }
        return studentInfo;
    }

    return <Page kind="wide" margin={{top: "medium"}} gap="large">
        <PageContent>
            <StudentInfo {...getStudentInfo()}/>
        </PageContent>
        <PageContent>
            <Tabs activeIndex={tab} onActive={setTab} justify="start">
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
