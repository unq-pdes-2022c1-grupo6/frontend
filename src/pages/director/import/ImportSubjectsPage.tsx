import {Box, Heading} from "grommet";
import {useCreateLISubjects, useCreateTPI2010Subjects, useCreateTPI2015Subjects}
    from "../../../services/subjectsService";
import ImportForm from "../../../components/import/ImportForm";
import {validateLISubjectRow, validateTPI2010SubjectRow, validateTPI2015SubjectRow}
    from "../../../utils/csv/subjects-validators";


const ImportSubjectsPage = () => {
    const createLISubjects = useCreateLISubjects();
    const createTPI2010Subjects = useCreateTPI2010Subjects();
    const createTPI2015Subjects = useCreateTPI2015Subjects();

    return <Box gap="medium" pad="medium">
        <Heading level="4" margin="none">Planes</Heading>
        <ImportForm
            label="TPI 2010"
            validateFn={validateTPI2010SubjectRow}
            onImport={(rows, onFinishImport) => createTPI2010Subjects.mutate({rows},{
                onSuccess: () => onFinishImport([])
            })}
            loading={createTPI2010Subjects.isLoading}
        />
        <ImportForm
            label="TPI 2015"
            validateFn={validateTPI2015SubjectRow}
            onImport={(rows, onFinishImport) => createTPI2015Subjects.mutate({rows},{
                onSuccess: () => onFinishImport([])
            })}
            loading={createTPI2015Subjects.isLoading}
        />
        <ImportForm
            label="LI"
            validateFn={validateLISubjectRow}
            onImport={(rows, onFinishImport) => createLISubjects.mutate({rows},{
                onSuccess: () => onFinishImport([])
            })}
            loading={createLISubjects.isLoading}
        />
    </Box>

};

export default ImportSubjectsPage;
