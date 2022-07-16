import {Box} from "grommet";
import ImportForm from "../../../components/import/ImportForm";
import {convertToRecordsDTO, convertToStudentsDTO} from "../../../utils/csv/student-mappings";
import {useCreateRecords, useCreateStudents} from "../../../services/studentService";
import {recordsColumns, studentColumns} from "../../../utils/csv/student-valid-columns";


const ImportStudentsPage = () => {
    const createStudents = useCreateStudents();
    const createRecords = useCreateRecords();

    return <Box gap="medium" pad="medium">
        <ImportForm
            label="Alumnos"
            convertToDTOsFn={convertToStudentsDTO}
            requiredColumns={studentColumns}
            onImport={createStudents.mutate}
            loading={createStudents.isLoading}
        />
        <ImportForm
            label="Historia Académica"
            convertToDTOsFn={convertToRecordsDTO}
            requiredColumns={recordsColumns}
            onImport={createRecords.mutate}
            loading={createRecords.isLoading}
        />
    </Box>
};

export default ImportStudentsPage;
