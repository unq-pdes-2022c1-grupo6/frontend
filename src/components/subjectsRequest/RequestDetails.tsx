import {RequestType} from "../../services/requestDTO";
import SubjectsRequestForm from "./SubjectsRequestForm";
import {convertToSelectedCourses} from "../../model/subject";

const RequestDetails = ({request}: { request: RequestType }) => {

    return <SubjectsRequestForm
        selectedCourses={convertToSelectedCourses(request.formulario.solicitudes)}
        subjectsOptions={request.formulario.solicitudes}
    />
}

export default RequestDetails;