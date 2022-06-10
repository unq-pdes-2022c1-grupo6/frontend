import {useSearchParams} from "react-router-dom";
import SubjectsRequests from "../components/subjectsRequests/SubjectsRequests";
import {requestedSubjects, requestingStudents} from "../utils/fake-data";

const SubjectsRequestsPage = () => {
    let [searchParams] = useSearchParams();

    return searchParams.get("agrupar-por") === "alumnos"?
        <SubjectsRequests
            searchPlaceholder="Buscar por DNI, Legajo o Nombre.."
            data={requestingStudents}
            columns={[
                {property: "dni", header: "DNI", size: 'xsmall', primary: true, sortable: false},
                {property: "legajo", header: "Legajo", size: 'xsmall', sortable: false},
                {property: "nyap", header: "Nombre y Apellido", size: 'small', sortable: true},
                {property: "carrera", header: "Carrera", size: 'small', sortable: false},
                {property: "comisionesSol", header: "Comisiones Solic.", size: 'small', align: "end", sortable: true},
                {property: "materiasSol", header: "Materias Solic.", size: 'xsmall', align: "end", sortable: true}
            ]}
        />:
        <SubjectsRequests
            searchPlaceholder="Buscar por Nombre o Codigo.."
            data={requestedSubjects}
            columns={[
                {property: "materia", header: "Materia", size: 'xsmall', primary: true, sortable: true},
                {property: "codigo", header: "Codigo", size: 'xsmall', sortable: false},
                {property: "carrera", header: "Carrera", size: 'small', sortable: false},
                {property: "comisiones", header: "Comisiones", size: 'small', align: "end", sortable: true},
                {property: "cupoDisp", header: "Cupo Disp.", size: 'xsmall', align: "end", sortable: true},
                {property: "cupoTotal", header: "Cupo Total", size: 'xsmall', align: "end", sortable: true},
                {property: "demanda", header: "Demanda", size: 'xsmall', align: "end", sortable: true}
            ]}/>
};

export default SubjectsRequestsPage;
