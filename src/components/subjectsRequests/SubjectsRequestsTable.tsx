import {DataTable} from "grommet";

interface StudentRow {
    dni: number,
    legajo: number,
    nyap: string,
    carrera: string,
    comisionesSol: number,
    materiasSol: number
}

const SubjectsRequestsTable = ({requests}: {requests: StudentRow[]}) => {

    return <DataTable
        data={requests}
        columns={[
            {property: "dni", header: "DNI", size: 'xsmall', primary: true},
            {property: "legajo", header: "Legajo", size: 'xsmall'},
            {property: "nyap", header: "Nombre y Apellido", size: 'small'},
            {property: "carrera", header: "Carrera", size: 'small'},
            {property: "comisionesSol", header: "Comisiones Solic.", size: 'small', align: "end"},
            {property: "materiasSol", header: "Materias Solic.", size: 'xsmall', align: "end"}
        ]}
    />
};

export default SubjectsRequestsTable;