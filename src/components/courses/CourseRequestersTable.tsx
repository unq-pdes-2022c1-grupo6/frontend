import {Anchor, Box, DataTable, Spinner, Text} from "grommet";
import {useState} from "react";
import {useCourseRequestersQuery} from "../../services/studentService";
import {RequestersRadioGroup} from "../request/FilterRadioGroup";
import {CourseStatusText} from "../StatusText";
import CourseActionButtons from "./CourseActionButtons";
import {CourseState} from "../../services/dtos/requestDTO";
import {countApprovedRequesters} from "../../services/dtos/studentDTO";
import {DIRECTOR_ROUTE, REQUESTING_STUDENTS} from "../../utils/routes";
import {useNavigate} from "react-router-dom";

type CourseRequestersTableProps = {
    subject: string,
    course: number,
    totalQuota: number,
    onChangeCourse: (courseId: number, id: number, courseNumber: number, state: CourseState, dniAlumno: number) => void
}


const CourseRequestersTable = ({subject, course, onChangeCourse, totalQuota}: CourseRequestersTableProps) => {
    const [filter, setFilter] = useState("Todos");
    const courseRequestersQuery = useCourseRequestersQuery(subject, course, filter);
    const navigate = useNavigate();

    return <Box gap="small">
        <Box direction="row" gap="large">
            <RequestersRadioGroup
                value={filter}
                name={`requesters-radio-${course}`}
                onChange={(value) => setFilter(value)}
                onCancel={() => setFilter("Todos")}/>
            <Text>
                {`${totalQuota - countApprovedRequesters(courseRequestersQuery.data)}/ ${totalQuota} Sobrecupo/s Totales`}
            </Text>
            {courseRequestersQuery.isLoading && <Spinner size="medium"/>}
        </Box>
        <DataTable
                replace
                step={15}
                sortable
                paginate
                data={courseRequestersQuery.data}
                columns={[
                    {property: "dni", header: "DNI", size: "xsmall", primary: true, render: ({dni}) => {
                        return <Anchor onClick={() => navigate("/" + DIRECTOR_ROUTE + "/" + REQUESTING_STUDENTS + "/" + dni)}
                                       label={dni}
                        />}},
                    {property: "nombreApellido", size: "small", header: "Nombre Apellido"},
                    {property: "cantidadDeAprobadas", header: "Solicitudes Aprobadas", align: "end"},
                    {property: "estado", header: "Estado", align: "center",
                        render: ({estado}) => <CourseStatusText state={estado}/>},
                    {property: "", header: "Acciones", size: "medium", render: (datum) => {
                            return <CourseActionButtons
                                onChangeState={(state) => {
                                    onChangeCourse(datum.idSolicitud, datum.idFormulario, datum.numeroComision, state, datum.dni)
                                    }}
                                courseState={datum.estado}
                            />
                        }
                    }
                ]}/>
    </Box>

};

export default CourseRequestersTable;
