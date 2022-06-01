import React, {useState} from 'react';
import {DataTable, Text} from "grommet";
import SubjectStatusText from "./SubjectStatusText";
import SubjectActionButtons from "./SubjectActionButtons";
import CourseActionRadio from "./CourseActionRadio";

export interface Course {
    id: string,
    materia: string,
    comision?: string,
    sd: number,
    st: number,
    estado: string,
}

type SubjectsRequestTableProps = {
    onUpdateRequest: () => void,
    data: { subject: Course, courses: Course[] }[],
    subjects: string[]
}

const getRows = (data: { subject: Course, courses: Course[] }[], expanded: string[] = []) => {
    return data.flatMap(({subject, courses}) => {
        return expanded.includes(subject.id) ?
            [subject, ...courses] :
            [subject];
    });
}

const SubjectsRequestTable = ({data, subjects, onUpdateRequest}
                                  : SubjectsRequestTableProps) => {
        const [expand, setExpand] = useState<string[]>(['(TPI) Algoritmos']);
        const [data0, setData0] = useState(() => getRows(data, ['(TPI) Algoritmos']));

        return <DataTable
            size="medium"
            pad="xxsmall"
            replace
            primaryKey="id"
            data={data0}
            onUpdate={(opts) => {
                setExpand(opts.expanded || []);
                setData0(getRows(data, opts.expanded));
            }}
            groupBy={{
                property: "materia",
                expand,
                onExpand: setExpand,
                expandable: subjects,
                select: {},
                onSelect: () => {}}}
            columns={[
                {property: "materia", header: "Materia", size: "small", render: (row) =>
                        <Text  weight={row.id === row.materia? "bold" : "normal"}>
                            {row.materia}
                        </Text>},
                {property: "comision", header: "Comisión", size: "small"},
                {property: "sd", header: "Cupo Disp.", size: 'xsmall', align: 'end'},
                {property: "st", header: "Cupo Total", size: 'xsmall', align: 'end'},
                {
                    property: "estado", header: "Estado", align: 'center', size: 'xsmall', render: (row: Course) =>
                        row.id === row.materia ? <SubjectStatusText state={row.estado}/> : null
                },
                {
                    property: "acciones", header: "Acciones", size: 'small', align: 'center', render: (row: Course) => {
                        return row.id === row.materia ?
                            <SubjectActionButtons onUpdateRequest={onUpdateRequest} state={row.estado}/> :
                            <CourseActionRadio onUpdateRequest={onUpdateRequest} state={row.estado}/>
                    }
                }
            ]}
        />
    }
;

export default SubjectsRequestTable;