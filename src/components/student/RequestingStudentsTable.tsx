import {DataTable} from "grommet";
import {SearchedStudentDTO} from "../../services/dtos/studentDTO";
import {RequestStatusText} from "../StatusText";

type RequestingStudentsTableProps = {
    content: SearchedStudentDTO[],
    onClickRow: (dni: number) => void
}

const RequestingStudentsTable = ({content, onClickRow}: RequestingStudentsTableProps) => {

    return <DataTable
    replace
    pad="xsmall"
    step={10}
    sortable
    paginate
    data={content}
    onClickRow={(event)  => onClickRow(event.datum.alumno.dni)}
    columns={[
        {property: "alumno.legajo", header: "Legajo", primary: true},
        {property: "alumno.dni", header: "DNI"},
        {property: "alumno.apellido", header: "Apellido Nombre", render: ({alumno}) =>
                alumno.apellido + " " + alumno.nombre},
        {property: "alumno.coeficiente", header: "Coeficiente", align: "end"},
        {property: "estadoFormulario", header: "Estado Solicitud", align: "center",
            render: ({estadoFormulario}) => <RequestStatusText state={estadoFormulario}/>},
        {property: "cantComisionesInscripto", header: "Comisiones Solicitadas", render: (datum) =>
                `${datum.cantComisionesInscripto} (${datum.cantSolicitudesPendientes} Pendientes
                 y ${datum.cantSolicitudesAprobadas} Aprobadas)`}
    ]}
    />

};

export default RequestingStudentsTable;