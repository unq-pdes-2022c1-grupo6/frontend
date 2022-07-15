import {DataTable} from "grommet";
import {RequestRecord} from "../../services/dtos/studentDTO";
import {CourseStatusText} from "../StatusText";


const RequestRecordsTable = ({content}: {content?: RequestRecord[]}) => {

    return <DataTable
        replace
        pad="xsmall"
        step={10}
        sortable
        paginate
        data={content}
        columns={[
            {property: "nombreMateria", header: "Materia", primary: true},
            {property: "estado", header: "Estado", render: ({estado}) => <CourseStatusText state={estado}/>},
            {property: "cuatrimestre.semestre", header: "Semestre Solicitada", align: "end"},
            {property: "cuatrimestre.anio", header: "Año Solicitida", align: "end"},
        ]}
    />

};

export default RequestRecordsTable;
