import RequestTable from "./RequestTable";
import {useCloseRequest, useUpdateCourseState} from "../../services/requestService";
import {useState} from "react";
import {Box, Button, Heading, Layer, Spinner} from "grommet";
import AddCourseForm from "../courses/AddCourseForm";
import WithConfirmationButton from "../WithConfirmationButton";
import {useStudentQuery} from "../../services/studentService";
import {getExcludingCourses} from "../../services/dtos/studentDTO";


const RequestPage = ({dni}: { dni?: number }) => {
    const [showModal, setShowModal] = useState(false);
    const studentQuery = useStudentQuery(dni);
    const getRequest = () => studentQuery.data? studentQuery.data.formulario: undefined;
    const updateCourseState = useUpdateCourseState(dni, studentQuery.data);
    const closeRequest = useCloseRequest(dni);
    const loading = updateCourseState.isLoading || closeRequest.isLoading;

    const onCloseModal = () => setShowModal(false);


    return <Box fill gap="small">
        <Box direction="row" align="center" gap="medium">
            <Heading level="3" size="medium" margin="none">
                {`Estado: ${getRequest()?.estado? getRequest()?.estado: "---"}`}
            </Heading>
            {getRequest()?.estado === "ABIERTO" &&
                <WithConfirmationButton
                    dropButtonProps={{
                        disabled: loading,
                        label: "Cerrar",
                        dropContent: <></>
                    }}
                    onConfirm ={() => {
                        const request = getRequest();
                        if (dni && request?.id) {
                            const data = {dni, id: request.id};
                            closeRequest.mutate(data);
                        }
                    }}
                />}
            <Button label="Agregar Comisión" onClick={() => {setShowModal(true)}}/>
            {loading && <Spinner size="medium"/>}
        </Box>
        <RequestTable
            content={getRequest()?.solicitudes}
            onChangeCourseState={(state, courseId) => {
                const request = getRequest();
                if (request?.id && dni) {
                    updateCourseState.mutate({id: request?.id, dni, state, courseId})
                }
            }}/>
        {showModal && <Layer position="center" onClickOutside={onCloseModal} onEsc={onCloseModal}>
            <AddCourseForm excluding={studentQuery.data? getExcludingCourses(studentQuery.data) : []}
                           dni={dni} onCloseModal={onCloseModal}/>
        </Layer>}
    </Box>


};

export default RequestPage;
