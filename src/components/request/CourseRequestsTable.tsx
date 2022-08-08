import {useMemo, useState} from "react";
import {useCourseRequestersQuery} from "../../services/studentService";
import {useNavigate} from "react-router-dom";
import {Anchor, Box, ColumnConfig, DataTable, Spinner} from "grommet";
import {RequestersRadioGroup} from "./FilterRadioGroup";
import {DIRECTOR_ROUTE, REQUESTING_STUDENTS} from "../../utils/routes";
import {CourseStatusText} from "../StatusText";
import CourseActionButtons from "../courses/CourseActionButtons";
import {useUpdateCourseRequest} from "../../services/requestService";
import {CourseRequesterDTO} from "../../services/dtos/studentDTO";

type CourseRequestsTableProps = {
    subject: string,
    course?: number
}

const CourseRequestsTable = ({subject, course}: CourseRequestsTableProps) => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState("Todos");
    const courseRequestersQuery = useCourseRequestersQuery(subject, filter, course);
    const updateCourseRequest = useUpdateCourseRequest(subject, filter, course);
    const loading = courseRequestersQuery.isLoading || updateCourseRequest.isLoading;


    const columns = useMemo(() => {
        const allColumns: ColumnConfig<CourseRequesterDTO>[]  = [
            {property: "dni", header: "DNI", size: "xsmall", render: ({dni}) => {
                    const studentRoute = "/" + DIRECTOR_ROUTE + "/" + REQUESTING_STUDENTS + "/" + dni;
                    return <Anchor onClick={() => navigate(studentRoute)}
                                   label={dni}/>
                }},
            {property: "nombreApellido", size: "small", header: "Nombre Apellido"},
            {property: "numeroComision", header: "Comisión", align: "end"},
            {property: "cantidadDeAprobadas", header: "Solicitudes Aprobadas", align: "end"},
            {property: "estado", header: "Estado", align: "center",
                render: ({estado}) => <CourseStatusText state={estado}/>},
            {property: "idFormulario", header: "Acciones", sortable: false, size: "medium", render: (datum) => {
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
        ]
        return course? allColumns.filter(c => c.header !== "Comisión"): allColumns
    },[course, navigate, updateCourseRequest])


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
            columns={columns}/>
    </Box>

};

export default CourseRequestsTable;
