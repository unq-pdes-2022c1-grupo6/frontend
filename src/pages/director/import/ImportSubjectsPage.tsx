import {Box, Heading} from "grommet";
import {useCreateLISubjects, useCreateTPI2010Subjects, useCreateTPI2015Subjects}
    from "../../../services/subjectsService";
import ImportForm from "../../../components/import/ImportForm";
import {convertToLISubjectsDTO, convertToTPISubjectsDTO} from "../../../utils/csv/subjects-mappings";
import {plan2010Columns, plan2015Columns, planliColumns} from "../../../utils/csv/subjects-valid-columns";


const ImportSubjectsPage = () => {
    const createTPI2010Subjects = useCreateTPI2010Subjects();
    const createTPI2015Subjects = useCreateTPI2015Subjects();
    const createLISubjects = useCreateLISubjects();


    return <Box gap="medium" pad="medium">
        <Heading level="4" margin="none">Planes</Heading>
        <ImportForm
            label="TPI 2010"
            convertToDTOsFn={convertToTPISubjectsDTO}
            requiredColumns={plan2010Columns}
            onImport={createTPI2010Subjects.mutate}
            loading={createTPI2010Subjects.isLoading}
        />
        <ImportForm
            label="TPI 2015"
            convertToDTOsFn={convertToTPISubjectsDTO}
            requiredColumns={plan2015Columns}
            onImport={createTPI2015Subjects.mutate}
            loading={createTPI2015Subjects.isLoading}
        />
        <ImportForm
            label="LI"
            convertToDTOsFn={convertToLISubjectsDTO}
            requiredColumns={planliColumns}
            onImport={createLISubjects.mutate}
            loading={createLISubjects.isLoading}
        />
    </Box>

};

export default ImportSubjectsPage;
