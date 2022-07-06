import {Box} from "grommet";
import {useCreateStudents} from "../../../services/studentService";
import ImportForm from "../../../components/import/ImportForm";
import {AxiosError} from "axios";
import {validateStudentRow} from "../../../utils/csv/student-validators";


const ImportStudentsPage = () => {
    const createStudents = useCreateStudents();
    // const createEnrollments = useCreateEnrollments();
    // const createRecords = useCreateRecords();


    return <Box gap="medium">
        <ImportForm
            label="Alumnos"
            loading={createStudents.isLoading}
            validateFn={validateStudentRow}
            onImport={(validRows, onFinishImport) => {
                createStudents.mutate(validRows, {
                    onSuccess: () => onFinishImport([]),
                    onError: (error) => {
                        if (error instanceof AxiosError && error.response?.status === 409) {
                            console.log(error.response.data);
                            onFinishImport(error.response.data);
                        }
                    }
                });
            }}
        />
        {/*<ImportForm
            label="Historial Académico"
            validateFn={(row) => validateRecords(row)}
            onImport={(data, onFinishImport) => createRecords.mutate()}
            loading={createRecords.isLoading}
        />
        <ImportForm
            label="Inscripciones"
            validateFn={(row) => validateEnrollments(row)}
            onImport={(data, onFinishImport) => createEnrollments.mutate()}
            loading={createEnrollments.isLoading}
        />*/}
    </Box>
};

export default ImportStudentsPage;
