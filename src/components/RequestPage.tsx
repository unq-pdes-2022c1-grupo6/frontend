import {CourseState, RequestCourseDTO} from "../services/dtos/requestDTO";
import RequestTable from "./RequestTable";

// PATCH api/alumnos/{dni}/formulario agrega una --- solicitud de comision nueva
// PATCH api/alumnos/{dni}/solicitudes/{id} ---- define estado de comision solicitada
// PATCH api/formulario/{id}/cerrar ---- cierra formulario
// GET /api/cuatrimestres/oferta  ---- comisiones con busqueda por nombre

type RequestPageProps = {
    onChangeCourseState: (state: CourseState, id: number) => void
    content?:  RequestCourseDTO[],
}


const RequestPage = ({onChangeCourseState, content} : RequestPageProps) => {

    return <RequestTable
        content={content || []}
        onChangeCourseState={onChangeCourseState}
    />

};

export default RequestPage;
