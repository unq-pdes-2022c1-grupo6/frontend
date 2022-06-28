import {RequestCourseDTO} from "../services/dtos/requestDTO";
import RequestTable from "./RequestTable";
import {useCloseRequest, useUpdateCourseState} from "../services/requestService";
import {useEffect, useState} from "react";
import {Box, Button, Heading, Layer, Spinner} from "grommet";
import AddCourseForm from "./AddCourseForm";

// PATCH api/alumnos/{dni}/formulario agrega una --- solicitud de comision nueva
// PATCH api/alumnos/{dni}/solicitudes/{id} ---- define estado de comision solicitada
// PATCH api/formulario/{id}/cerrar ---- cierra formulario
// GET /api/cuatrimestres/oferta  ---- comisiones con busqueda por nombre

type RequestPageProps = {
    id?: number,
    dniAlumno?: number,
    solicitudes?: RequestCourseDTO[],
    estado?: "CERRADO" | "ABIERTO",
    excludingSubjects?: string[]
}

const RequestPage = ({id, dniAlumno, solicitudes = [], estado, excludingSubjects = []}: RequestPageProps) => {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState<RequestCourseDTO[]>([]);
    const [state, setState] = useState<"CERRADO" | "ABIERTO" | undefined>();
    const replaceDataItem = (newCourse: RequestCourseDTO) => {
        setData((prevState) => {
            return prevState.map(s => s.id === newCourse.id ? newCourse : s)
        })
    };
    const setRequest = (newData: RequestCourseDTO[], newState: "CERRADO" | "ABIERTO" = "ABIERTO") => {
        setData(newData);
        setState(newState);
    }
    const updateCourseState = useUpdateCourseState(dniAlumno, replaceDataItem);
    const closeRequest = useCloseRequest(dniAlumno, setRequest);
    const loading = updateCourseState.isLoading || closeRequest.isLoading;

    useEffect(() => {
        setData(solicitudes);
        setState(estado);
    }, [solicitudes, estado])

    const onCloseModal = () => setShowModal(false);

    const getExcluding = (): (string | number)[]  => {
        const requestedCourses = data.map(value => value.comision.id);
        return [...excludingSubjects, ...requestedCourses]
    }

    return <Box fill gap="small">
        <Box direction="row" align="center" gap="medium">
            {state && <Heading level="3" size="medium" margin="none">{`Estado:${state}`}</Heading>}
            {state === "ABIERTO" && <Button disabled={loading} label="Cerrar" onClick={() => {
                dniAlumno && id && closeRequest.mutate({dniAlumno, id})
            }}/>}
            <Button label="Agregar Comisión" onClick={() => {setShowModal(true)}}/>
            {loading && <Spinner size="medium"/>}
        </Box>
        <RequestTable
            content={data}
            onChangeCourseState={(state, courseId) => {
                if (id && dniAlumno) {
                    updateCourseState.mutate({id, dniAlumno, state, courseId})
                }
            }}/>
        {showModal && <Layer position="center" onClickOutside={onCloseModal} onEsc={onCloseModal}>
            <AddCourseForm dni={dniAlumno} excluding={getExcluding()}
                           onAddCourse={(newData) => {
                               setRequest(newData);
                               onCloseModal();
                           }}/>
        </Layer>}
    </Box>


};

export default RequestPage;
