import {RequestCourseDTO} from "../services/dtos/requestDTO";
import RequestTable from "./RequestTable";
import {useUpdateCourseState} from "../services/requestService";
import {useEffect, useState} from "react";

// PATCH api/alumnos/{dni}/formulario agrega una --- solicitud de comision nueva
// PATCH api/alumnos/{dni}/solicitudes/{id} ---- define estado de comision solicitada
// PATCH api/formulario/{id}/cerrar ---- cierra formulario
// GET /api/cuatrimestres/oferta  ---- comisiones con busqueda por nombre

type RequestPageProps = {
    requestId?: number,
    dni?: number,
    content?: RequestCourseDTO[],
}

const RequestPage = ({requestId, dni, content = []} : RequestPageProps) => {
    const [data, setData] = useState<RequestCourseDTO[]>([]);
    const replaceDataItem = (newCourse: RequestCourseDTO) => {
        setData((prevState) => {
            return prevState.map(s => s.id === newCourse.id ? newCourse : s)
        })
    };
    const updateCourseState = useUpdateCourseState(dni, replaceDataItem);

    useEffect(() => {
        setData(content)
    },[content])

    return <RequestTable
        content={data}
        onChangeCourseState={(state, id) => {
            if (requestId && dni) {
                updateCourseState.mutate({requestId, dni, state, id})
            }
        }}/>

};

export default RequestPage;
