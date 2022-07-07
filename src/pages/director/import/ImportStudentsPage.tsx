import {Box} from "grommet";
import {useCreateStudents} from "../../../services/studentService";
import ImportForm from "../../../components/import/ImportForm";
import {validateStudentRow} from "../../../utils/csv/student-validators";


const ImportStudentsPage = () => {
    const createStudents = useCreateStudents();
    // const createRecords = useCreateRecords();


    return <Box gap="medium">
        <ImportForm
            label="Alumnos"
            loading={createStudents.isLoading}
            validateFn={validateStudentRow}
            onImport={(validRows, onFinishImport) => {
                onFinishImport([])
            }}/>
        {/*<ImportForm
            label="Historial Académico"
            validateFn={(row) => validateRecords(row)}
            onImport={(data, onFinishImport) => createRecords.mutate()}
            loading={createRecords.isLoading}/>
        />*/}
    </Box>
};

export default ImportStudentsPage;
