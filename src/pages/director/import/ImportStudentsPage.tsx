import {Box} from "grommet";
import {useCreateRecords} from "../../../services/studentService";
import ImportForm from "../../../components/import/ImportForm";
import {validateRecordsRows} from "../../../utils/csv/student-validators";
import {convertToRecordsDTO} from "../../../utils/csv/student-mappings";


const ImportStudentsPage = () => {
    //const createStudents = useCreateStudents();
    const createRecords = useCreateRecords();

    return <Box gap="medium" pad="medium">
        <ImportForm
            label="Historia Académica"
            loading={createRecords.isLoading}
            validateFn={validateRecordsRows}
            onImport={(validRows, onFinishImport) => {
                console.log(convertToRecordsDTO(validRows));
                onFinishImport([])
            }}/>
    </Box>
};

export default ImportStudentsPage;
