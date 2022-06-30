import {Box, DataTable, Spinner} from "grommet";
import {useState} from "react";
import {useCourseRequestersQuery} from "../../services/studentService";
import {RequestersRadioGroup} from "../request/FilterRadioGroup";
import {RequestStatusText} from "../StatusText";



const CourseRequestersTable = ({subject, course}: { subject: string, course: number }) => {
    const [filter, setFilter] = useState("Todos");
    const courseRequestersQuery = useCourseRequestersQuery(subject, course, filter);

    return <Box gap="small">
        <Box direction="row" gap="large">
        <RequestersRadioGroup
            value={filter}
            onChange={(value) => setFilter(value)}
            onCancel={() => setFilter("Todos")}/>
        {courseRequestersQuery.isLoading && <Spinner size="medium"/>}
        </Box>
        <DataTable
            replace
            step={15}
            sortable
            paginate
            data={courseRequestersQuery.data}
            columns={[
                {property: "dni", header: "DNI", primary: true},
                {property: "nombreApellido", header: "Nombre Apellido"},
                {property: "coeficiente", header: "Coeficiente", align: "end"},
                {property: "cantidadDeAprobadas", header: "Solicitudes Aprobadas", align: "end"},
                {property: "estado", header: "Estado", align: "center",
                    render: ({estado}) => <RequestStatusText state={estado}/>},
            ]}/>
    </Box>

};

export default CourseRequestersTable;
