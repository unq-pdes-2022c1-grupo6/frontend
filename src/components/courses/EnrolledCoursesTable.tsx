import {EnrolledCourse} from "../../services/dtos/requestDTO";
import {Text} from "grommet";
import {formatSubjectCourse} from "../../services/dtos/subjectDTO";
import GenericTable from "../GenericTable";
import startCase from "lodash/startCase";

const EnrolledCoursesTable = ({data = []}: {data?: EnrolledCourse[]}) => {

    return <GenericTable<EnrolledCourse>
        data={data}
        columns={[
            {label: 'Materia', format: (c) => <Text>{c.materia}</Text>},
            {label: 'Ubicación', format: (c) => <Text>{startCase(c.locacion)}</Text>},
            {label: 'Comisión', format: (c) =>
                    <Text>{formatSubjectCourse(c.numero, undefined, c.horarios)}</Text>}
        ]}/>

};

export default EnrolledCoursesTable;
