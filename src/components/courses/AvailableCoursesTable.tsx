import {EnrolledCourse} from "../../services/dtos/requestDTO";
import {DataTable} from "grommet";
import {formatSubjectCourse} from "../../services/dtos/subjectDTO";
import React from "react";

type AvailableCoursesTableProps = {
    content: EnrolledCourse[],
    onClickRow: (id: number) => void
}


const AvailableCoursesTable = ({content, onClickRow}: AvailableCoursesTableProps) => {

    return <DataTable
        replace
        size="small"
        primaryKey="id"
        sortable
        step={10}
        paginate
        data={content}
        onClickRow={(event) => onClickRow(event.datum.id)}
        columns={[
            {property: "materia", header: "Materia", size: "small"},
            {property: "numero", header: "Comisión", size: "small", render: ({numero, horarios}) => {
                    return formatSubjectCourse(numero, undefined, horarios)
                }},
            {property: "cuposDisponibles", header: "Sobrecupo Disp.", size: 'xsmall', align: 'end'},
            {property: "sobreCuposTotales", header: "Sobrecupo Total", size: 'xsmall', align: 'end'},
        ]}
    />

};

export default AvailableCoursesTable;
