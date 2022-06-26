import {DateInput, Page, PageContent, Paragraph, Form, FormField, Box, Button} from "grommet";
import {PageHeader} from "grommet/components";
import {formatDate, formatSemester, getCurrentSemester} from "../../model/semester";
import {useState} from "react";
import {TermFormType, useSemesterQuery, useUpdateSemesterQuery} from "../../services/semesterService";
import LoadingButton from "../../components/LoadingButton";


const DirectorHomePage = () => {
    const {year, semester} = getCurrentSemester();
    const [termForm, setTermForm] = useState<TermFormType>({term: []});
    const semesterQuery = useSemesterQuery(year, semester, setTermForm);
    const updateSemester = useUpdateSemesterQuery();

    const getTermLabel = () => {
        return termForm.term[0] && termForm.term[1] ?
            `${formatDate(new Date(termForm.term[0]))} - ${formatDate(new Date(termForm.term[1]))}` :
            "No definido"
    }

    const onReset = () => {
        if (semesterQuery.data) {
            setTermForm({
                term: [
                    semesterQuery.data.inicioInscripciones,
                    semesterQuery.data.finInscripciones
                ]})
        }
    }

    return <Page kind="narrow">
        <PageContent>
            <PageHeader
                responsive
                title="Sistema de sobrecupos"
                subtitle={<Paragraph fill>
                    {`Bienvenido al ${formatSemester(semester)} cuatrimestre de ${year}. Para iniciar un nuevo ciclo de inscripción,
                 asegúrese de importar los datos necesarios y definir un plazo de inscripción.`}
                </Paragraph>}/>
            <Box width="medium">
            <Form<TermFormType>
                    value={termForm}
                    onChange={setTermForm}
                    onReset={onReset}
                    onSubmit={({value}) => updateSemester.mutate(value.term)}>
                    <FormField name="term" label="Plazo de Inscripción" required>
                        <DateInput
                            name="term"
                            buttonProps={{label: getTermLabel()}}
                            dropProps={{align: {left: "right"}}}
                            calendarProps={{size: "medium"}}
                        />
                    </FormField>
                    <Box direction="row" gap="large">
                        <LoadingButton loading={updateSemester.isLoading} type="submit" label="Cambiar" primary/>
                        <Button disabled={updateSemester.isLoading} type="reset" label="Cancelar" />
                    </Box>
                </Form>
            </Box>
        </PageContent>
    </Page>

};

export default DirectorHomePage;
