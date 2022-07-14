import {Box} from "grommet";
import ImportForm from "../../../components/import/ImportForm";
import {convertToStudentsDTO, studentColumns} from "../../../utils/csv/student-mappings";
import {useCreateStudents} from "../../../services/studentService";


const ImportStudentsPage = () => {
    const createStudents = useCreateStudents();

    return <Box gap="medium" pad="medium">
        <ImportForm
            label="Alumnos"
            convertToDTOsFn={convertToStudentsDTO}
            requiredColumns={studentColumns}
            onImport={createStudents.mutate}
            loading={createStudents.isLoading}
        />
    </Box>
};

export default ImportStudentsPage;
