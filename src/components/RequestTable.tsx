import {DataTable, Text} from "grommet";
import {RequestCourseDTO} from "../services/dtos/requestDTO";
import React, {useState} from "react";
import {RequestStatusText} from "./studentDetails/StatusText";
import {formatSubjectCourse} from "../services/dtos/subjectDTO";

type RequestTableProps = {
    content: RequestCourseDTO[];
    onChangeCourseState: () => void;
}

const RequestTable = ({content, onChangeCourseState}: RequestTableProps) => {
    const [select, setSelect] = useState<(string | number)[]>([]);

    return <DataTable
        pad="xxsmall"
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
            {property: "comision.id", header: "Comisión", size: "medium", render: ({estado, comision}) =>
                    <Text weight={estado === "APROBADO" ? "bold" : "normal"}>
                        {formatSubjectCourse(comision.numero, comision.modalidad, comision.horarios)}
                    </Text>},
            {property: "comision.sobrecuposTotales", header: "Sobrecupo Disp.", size: 'xsmall', align: 'end'},
            {property: "comision.sobrecuposDisponibles", header: "Sobrecupo Total", size: 'xsmall', align: 'end'},
            {property: "estado", header: "Estado", align: 'center', size: 'xsmall', render: (row) =>
                    <RequestStatusText state={row.estado}/>}
        ]}
    />

};

export default RequestTable;