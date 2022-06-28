import {DataTable, Text} from "grommet";
import {CourseState, RequestCourseDTO} from "../services/dtos/requestDTO";
import React, {useState} from "react";
import {RequestStatusText} from "./studentDetails/StatusText";
import {formatSubjectCourse} from "../services/dtos/subjectDTO";
import CourseActionButtons from "./CourseActionButtons";

type RequestTableProps = {
    content: RequestCourseDTO[];
    onChangeCourseState: (state: CourseState, id: number) => void;
}

const RequestTable = ({content, onChangeCourseState}: RequestTableProps) => {
    const [select, setSelect] = useState<(string | number)[]>([]);


    return <DataTable
        replace
        pad="xsmall"
        primaryKey="comision.id"
        data={content}
        select={select}
        onSelect={(select, datum) => {
            console.log("selecccionar", select);
            console.log("dato", datum);
            setSelect(select);
        }}
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
                        onChangeState={(state) => onChangeCourseState(state, row.comision.id)}
                        courseState={row.estado}
                    />}}
        ]}
    />

};

export default RequestTable;
