import {DataTable} from "grommet";
import {SearchedStudentDTO} from "../../services/dtos/studentDTO";
import {OtherStatusText, QualityStatusText, RegularStatusText, RequestStatusText} from "../StatusText";

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
        {property: "alumno.dni", header: "DNI", primary: true},
        {property: "alumno.locacion", header: "Ubicación"},
        {property: "alumno.regular", header: "Regular", align: "center",
            render: ({alumno}) => <RegularStatusText state={alumno.regular}/>},
        {property: "alumno.calidad", header: "Calidad", align: "center",
            render: ({alumno}) => <QualityStatusText state={alumno.calidad}/>},
        {property: "alumno.estado", header: "Estado", align: "center",
            render: ({alumno}) => <OtherStatusText state={alumno.estado}/>},
        {property: "estadoFormulario", header: "Estado Solicitud", align: "center",
            render: ({estadoFormulario}) => <RequestStatusText state={estadoFormulario}/>},
        {property: "cantSolicitudesPendientes", header: "Comisiones Pendientes", align: "end"},
        {property: "cantSolicitudesAprobadas", header: "Comisiones Aprobadas", align: "end"},
        {property: "cantComisionesInscripto", header: "Comisiones Inscripto", align: "end"},
    ]}
    />

};

export default RequestingStudentsTable;
