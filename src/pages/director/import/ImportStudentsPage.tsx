import {Box} from "grommet";
import {useCreateStudents} from "../../../services/studentService";
import ImportForm from "../../../components/import/ImportForm";
import {validateStudentRow} from "../../../utils/csv/student-validators";
import {convertToStudentsDTO} from "../../../utils/csv/student-mappings";


const ImportStudentsPage = () => {
    const createStudents = useCreateStudents();

    return <Box gap="medium" pad="medium">
        <ImportForm
            label="Alumnos"
            loading={createStudents.isLoading}
            validateFn={validateStudentRow}
            onImport={(validRows, onFinishImport) => {
                console.log(convertToStudentsDTO(validRows));
                onFinishImport([])
            }}/>
    </Box>
};

export default ImportStudentsPage;
