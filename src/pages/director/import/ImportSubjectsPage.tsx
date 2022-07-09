import {Box, Heading} from "grommet";
import {useCreateLISubjects, useCreateTPI2010Subjects, useCreateTPI2015Subjects}
    from "../../../services/subjectsService";
import ImportForm from "../../../components/import/ImportForm";
import {validateSubjectRow} from "../../../utils/csv/subjects-validators";
import {convertToSubjectsDTO} from "../../../utils/csv/subject-mappings";


const ImportSubjectsPage = () => {
    const createLISubjects = useCreateLISubjects();
    const createTPI2010Subjects = useCreateTPI2010Subjects();
    const createTPI2015Subjects = useCreateTPI2015Subjects();

    return <Box gap="medium" pad="medium">
        <Heading level="4" margin="none">Planes</Heading>
        <ImportForm
            label="TPI 2010"
            validateFn={validateSubjectRow}
            onImport={(rows, onFinishImport) => {
                console.log(convertToSubjectsDTO(rows, "cicloTPI"))
                onFinishImport([])
            }}
            loading={createTPI2010Subjects.isLoading}
        />
        <ImportForm
            label="TPI 2015"
            validateFn={validateSubjectRow}
            onImport={(rows, onFinishImport) => {
                console.log(convertToSubjectsDTO(rows, "cicloTPI"))
                onFinishImport([])
            }}
            loading={createTPI2015Subjects.isLoading}
        />
        <ImportForm
            label="LI"
            validateFn={validateSubjectRow}
            onImport={(rows, onFinishImport) => {
                console.log(convertToSubjectsDTO(rows, "cicloLI"))
                onFinishImport([])
            }}
            loading={createLISubjects.isLoading}
        />
    </Box>

};

export default ImportSubjectsPage;
