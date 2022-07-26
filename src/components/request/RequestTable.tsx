import {ColumnConfig, DataTable, Text} from "grommet";
import {CourseState, RequestCourseDTO} from "../../services/dtos/requestDTO";
import {CourseStatusText} from "../StatusText";
import {formatSubjectCourse} from "../../services/dtos/subjectDTO";
import CourseActionButtons from "../courses/CourseActionButtons";
import {useMemo} from "react";

type RequestTableProps = {
    content?: RequestCourseDTO[];
    onChangeCourseState: (state: CourseState, id: number) => void;
    editable: boolean
}

const RequestTable = ({editable, content = [], onChangeCourseState}: RequestTableProps) => {

    const columns = useMemo(() => {
        const allColumns: ColumnConfig<RequestCourseDTO>[] = [
            {property: "comision.materia", header: "Materia", size: "small"},
            {property: "comision.id", header: "Comisión", size: "small", render: ({estado, comision}) =>
                    <Text weight={estado === "APROBADO" ? "bold" : "normal"}>
                        {formatSubjectCourse(comision.numero, comision.modalidad, comision.horarios)}
                    </Text>},
            {property: "comision.sobrecuposDisponibles", header: "Sobrecupo Disp.", size: 'xsmall', align: 'end'},
            {property: "comision.sobrecuposTotales", header: "Sobrecupo Total", size: 'xsmall', align: 'end'},
            {property: "estado", header: "Estado", size: 'xsmall', render: (row) =>
                    <CourseStatusText state={row.estado}/>},
            {property: "", header: "Acciones", sortable: false, size: 'small', render: (row) => {
                    return <CourseActionButtons
                        onChangeState={(state) => onChangeCourseState(state, row.id)}
                        courseState={row.estado}
                    />}}
        ]
        return editable? allColumns: allColumns.filter(c => c.header !== "Acciones")
    },[editable, onChangeCourseState])

    return <DataTable
        replace
        pad="xsmall"
        primaryKey="id"
        step={10}
        paginate
        sortable
        data={content}
        columns={columns}
    />

};

export default RequestTable;
