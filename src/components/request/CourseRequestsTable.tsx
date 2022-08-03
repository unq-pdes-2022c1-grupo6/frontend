import {useState} from "react";
import {useCourseRequestersQuery} from "../../services/studentService";
import {useNavigate} from "react-router-dom";
import {Anchor, Box, DataTable, Spinner} from "grommet";
import {RequestersRadioGroup} from "./FilterRadioGroup";
import {DIRECTOR_ROUTE, REQUESTING_STUDENTS} from "../../utils/routes";
import {CourseStatusText} from "../StatusText";
import CourseActionButtons from "../courses/CourseActionButtons";
import {useUpdateCourseRequest} from "../../services/requestService";

type CourseRequestsTableProps = {
    subject: string,
    course: number
}

const CourseRequestsTable = ({subject, course}: CourseRequestsTableProps) => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState("Todos");
    const courseRequestersQuery = useCourseRequestersQuery(subject, course, filter);
    const updateCourseRequest = useUpdateCourseRequest(subject, course, filter);
    const loading = courseRequestersQuery.isLoading || updateCourseRequest.isLoading;

    return <Box gap="small">
        <Box direction="row" gap="large">
            <RequestersRadioGroup value={filter}
                                  onChange={setFilter}
                                  onCancel={() => setFilter("Todos")}/>
            {loading && <Spinner size="medium"/>}
        </Box>
        <DataTable
            replace
            step={15}
            sortable
            paginate
            data={courseRequestersQuery.data}
            columns={[
                {property: "dni", header: "DNI", size: "xsmall", primary: true, render: ({dni}) => {
                    const studentRoute = "/" + DIRECTOR_ROUTE + "/" + REQUESTING_STUDENTS + "/" + dni;
                        return <Anchor onClick={() => navigate(studentRoute)}
                                       label={dni}/>
                }},
                {property: "nombreApellido", size: "small", header: "Nombre Apellido"},
                {property: "cantidadDeAprobadas", header: "Solicitudes Aprobadas", align: "end"},
                {property: "estado", header: "Estado", align: "center",
                    render: ({estado}) => <CourseStatusText state={estado}/>},
                {property: "", header: "Acciones", sortable: false, size: "medium", render: (datum) => {
                        return <CourseActionButtons
                            courseState={datum.estado}
                            onChangeState={(state) => {
                                updateCourseRequest.mutate({
                                    dni: datum.dni,
                                    id: datum.idFormulario,
                                    courseId: datum.idSolicitud,
                                    courseNumber: datum.numeroComision,
                                    state: state
                            })}}
                        />
                    }
                }
            ]}/>
    </Box>

};

export default CourseRequestsTable;
