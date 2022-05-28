import {RequestType} from "../../services/requestDTO";
import SubjectsRequestForm from "./SubjectsRequestForm";
import {convertToSelectedCourses} from "../../model/subject";

const RequestDetails = ({request}: { request: RequestType }) => {


    return <SubjectsRequestForm
        selectedCourses={convertToSelectedCourses(request.formulario.solicitudes)}
        subjectsOptions={request.formulario.solicitudes}
        heading="Solicitud"
        studentInfo={`Nombre: ${request.nombre} DNI: ${request.dni}`}
    />
}

export default RequestDetails;
