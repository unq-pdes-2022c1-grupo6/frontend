import React, {useEffect, useState} from 'react';
import {DataTable} from "grommet";
import SubjectStatusText from "./SubjectStatusText";
import SubjectActionButtons from "./SubjectActionButtons";
import CourseActionRadio from "./CourseActionRadio";

interface Course {
    id: string,
    materia: string,
    comision?: string,
    sd: number,
    st: number,
    estado?: string,
}

type SubjectsRequestTableProps = {
    request: Course[][],
    onUpdateRequest: () => void
}

const convertToRequestTable = (request: Course[][]) => {
    return request.reduce((acc: { data: Course[], expandable: string[] }, cr) => {
        const course = cr.reduce((acc: Course, c) => {
            const estado = c.estado === "Aprobado" || (c.estado === "Rechazado" && acc.estado !== "Aprobado") ?
                c.estado : acc.estado;
            const comision = c.estado === "Aprobado" ? c.comision : undefined;
            return {estado, comision, id: c.materia, materia: c.materia, st: acc.st + c.st, sd: acc.sd + c.sd};
        }, {id: "", materia: "", st: 0, sd: 0});
        return {data: [course, ...cr, ...acc.data], expandable: [course.materia, ...acc.expandable]}
    }, {data: [], expandable: []})
}

const SubjectsRequestTable = ({request, onUpdateRequest}: SubjectsRequestTableProps) => {
    const [data, setData] = useState<Course[]>([]);
    const [expandable, setExpandable] = useState<string[]>([]);

    useEffect(() => {
        const {data, expandable} = convertToRequestTable(request);
        setData(data);
        setExpandable(expandable);
    })

    return <DataTable
        primaryKey="id"
        data={data}
        groupBy={{
            expandable,
            expand: [],
            onExpand: () => {},
            select: {},
            onSelect: () => {},
            property: 'materia',
        }}
        columns={[
            {property: "materia", header: "Materia", primary: true},
            {property: "comision", header: "Comisión"},
            {property: "sd", header: "Cupo Disp."},
            {property: "st", header: "Cupo Total"},
            {
                property: "estado", header: "Estado", render: (row: Course) =>
                    row.id === row.materia ? <SubjectStatusText state={row.estado}/> : undefined
            },
            {
                property: "acciones", header: "Acciones", render: (row: Course) => {
                    return row.id === row.materia ?
                        <SubjectActionButtons onUpdateRequest={onUpdateRequest} state={row.estado}/> :
                        <CourseActionRadio onUpdateRequest={onUpdateRequest} state={row.estado}/>
                }
            }
        ]}
    />
};

export default SubjectsRequestTable;