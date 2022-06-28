import {RequestCourseDTO} from "../services/dtos/requestDTO";
import RequestTable from "./RequestTable";
import {useCloseRequest, useUpdateCourseState} from "../services/requestService";
import {useEffect, useState} from "react";
import {Box, Button, Heading, Spinner} from "grommet";

// PATCH api/alumnos/{dni}/formulario agrega una --- solicitud de comision nueva
// PATCH api/alumnos/{dni}/solicitudes/{id} ---- define estado de comision solicitada
// PATCH api/formulario/{id}/cerrar ---- cierra formulario
// GET /api/cuatrimestres/oferta  ---- comisiones con busqueda por nombre

type RequestPageProps = {
    id?: number,
    dniAlumno?: number,
    solicitudes?: RequestCourseDTO[],
    estado?: "CERRADO" | "ABIERTO"
}

const RequestPage = ({id, dniAlumno, solicitudes = [], estado}: RequestPageProps) => {
    const [data, setData] = useState<RequestCourseDTO[]>([]);
    const [state, setState] = useState<"CERRADO" | "ABIERTO" | undefined>();
    const replaceDataItem = (newCourse: RequestCourseDTO) => {
        setData((prevState) => {
            return prevState.map(s => s.id === newCourse.id ? newCourse : s)
        })
    };
    const close = (newData: RequestCourseDTO[], newState: "CERRADO" | "ABIERTO") => {
        setData(newData);
        setState(newState);
    }
    const updateCourseState = useUpdateCourseState(dniAlumno, replaceDataItem);
    const closeRequest = useCloseRequest(dniAlumno, close);
    const loading = updateCourseState.isLoading || closeRequest.isLoading;

    useEffect(() => {
        setData(solicitudes);
        setState(estado);
    }, [solicitudes, estado])

    return <Box fill>
        <Box direction="row" align="center" gap="medium">
            {state && <Heading level="3" size="medium" margin="none">{`Estado:${state}`}</Heading>}
            {state === "ABIERTO" && <Button disabled={loading} label="Cerrar" onClick={() => {
                dniAlumno && id && closeRequest.mutate({dniAlumno, id})
            }}/>}
            {loading && <Spinner size="medium"/>}
        </Box>
        <RequestTable
            content={data}
            onChangeCourseState={(state, courseId) => {
                if (id && dniAlumno) {
                    updateCourseState.mutate({id, dniAlumno, state, courseId})
                }
            }}/>
    </Box>


};

export default RequestPage;
