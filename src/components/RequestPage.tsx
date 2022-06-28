import {RequestCourseDTO} from "../services/dtos/requestDTO";
import RequestTable from "./RequestTable";

// PATCH api/alumnos/{dni}/formulario agrega una --- solicitud de comision nueva
// PATCH api/alumnos/{dni}/solicitudes/{id} ---- define estado de comision solicitada
// PATCH api/formulario/{id}/cerrar ---- cierra formulario
// GET /api/cuatrimestres/oferta  ---- comisiones con busqueda por nombre


const RequestPage = ({content} : {content?:  RequestCourseDTO[] }) => {

    return <RequestTable
        content={content || []}
        onChangeCourseState={() => {}}
    />

};

export default RequestPage;
