import {DataTable, Text} from "grommet";
import {CourseState, RequestCourseDTO} from "../../services/dtos/requestDTO";
import {RequestStatusText} from "../student/StatusText";
import {formatSubjectCourse} from "../../services/dtos/subjectDTO";
import CourseActionButtons from "../courses/CourseActionButtons";

type RequestTableProps = {
    content: RequestCourseDTO[];
    onChangeCourseState: (state: CourseState, id: number) => void;
}

const RequestTable = ({content, onChangeCourseState}: RequestTableProps) => {


    return <DataTable
        replace
        pad="xsmall"
        primaryKey="id"
        step={10}
        paginate
        data={content}
        columns={[
            {property: "comision.materia", header: "Materia", size: "small"},
            {property: "comision.id", header: "Comisión", size: "small", render: ({estado, comision}) =>
                    <Text weight={estado === "APROBADO" ? "bold" : "normal"}>
                        {formatSubjectCourse(comision.numero, comision.modalidad, comision.horarios)}
                    </Text>},
            {property: "comision.sobrecuposTotales", header: "Sobrecupo Disp.", size: 'xsmall', align: 'end'},
            {property: "comision.sobrecuposDisponibles", header: "Sobrecupo Total", size: 'xsmall', align: 'end'},
            {property: "estado", header: "Estado", size: 'xsmall', render: (row) =>
                    <RequestStatusText state={row.estado}/>},
            {property: "", header: "Acciones", size: 'small', render: (row) => {
                    return <CourseActionButtons
                        onChangeState={(state) => onChangeCourseState(state, row.id)}
                        courseState={row.estado}
                    />}}
        ]}
    />

};

export default RequestTable;
