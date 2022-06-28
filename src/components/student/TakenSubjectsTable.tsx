import React from 'react';
import {DataTable, Text} from "grommet";
import {StatusText} from "./StatusText";
import {TakenSubjectDTO} from "../../services/dtos/studentDTO";


const TakenSubjectsTable = ({content = []}: { content?: TakenSubjectDTO[] }) => {

    return <DataTable data={content} pad="xxsmall" step={10} paginate
        columns={[
            {
               property: 'codigoMateria',
               header: "Materia",
               primary: true,
               render: ({nombreMateria, codigoMateria}) =>
                   <Text weight="bold"> {`${nombreMateria} (${codigoMateria})`} </Text>,
               size: 'small'
            },
            {
                property: 'estado',
                header: "Estado",
                render: ({estado}) => <StatusText state={estado}/>,
                align: 'center',
                size: 'xsmall'
            },
            {
                property: 'fechaDeCarga',
                header: "Ultima vez Cursada",
                render: ({fechaDeCarga}) => new Date(fechaDeCarga).toLocaleDateString(),
                align: 'end',
                size: 'xsmall'
            },
            {
                property: 'cantidadDeVecesCursada',
                header: "Cant. de veces Cursada",
                align: 'end',
                size: 'xsmall'
            },
        ]}
    />
};

export default TakenSubjectsTable;
