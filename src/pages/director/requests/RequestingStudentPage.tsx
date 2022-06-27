import {useParams} from "react-router-dom";
import {useStudentQuery} from "../../../services/studentService";
import {Page, PageContent} from "grommet";
import StudentInfo from "../../../components/studentDetails/StudentInfo";

const RequestingStudentPage = () => {
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

    return <Page kind="wide">
        <PageContent>
            <StudentInfo {...getStudentInfo()}/>
        </PageContent>
        <PageContent>


        </PageContent>
    </Page>

};

export default RequestingStudentPage;
