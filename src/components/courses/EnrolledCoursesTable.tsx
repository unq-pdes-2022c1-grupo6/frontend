import {EnrolledCourse} from "../../services/dtos/requestDTO";
import {Text} from "grommet";
import {formatSubjectCourse} from "../../services/dtos/subjectDTO";
import GenericTable from "../GenericTable";

const EnrolledCoursesTable = ({data = []}: {data?: EnrolledCourse[]}) => {

    return <GenericTable<EnrolledCourse>
        data={data}
        columns={[
            {label: 'Materia', format: (c) => <Text weight="bold">{c.materia}</Text>},
            {label: 'Comisión', format: (c) =>
                    <Text>{formatSubjectCourse(c.numero, undefined, c.horarios)}</Text>}
        ]}/>

};

export default EnrolledCoursesTable;
