import {EnrolledCourse} from "../../services/dtos/requestDTO";
import {DataTable} from "grommet";
import {formatSubjectCourse} from "../../services/dtos/subjectDTO";

const EnrolledCoursesTable = ({data}: {data?: EnrolledCourse[]}) => {

    return <DataTable
        sortable
        data={data}
        columns={[
            {header: 'Materia', property: "materia"},
            {header: 'Ubicación', property: "locacion", render: ({locacion}) => locacion.replace("_", " ")},
            {header: 'Comisión', property: "numero",
                render: (c) => formatSubjectCourse(c.numero, undefined, c.horarios)}
        ]}/>

};

export default EnrolledCoursesTable;
