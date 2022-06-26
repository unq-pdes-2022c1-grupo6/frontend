import {Page, PageContent, Paragraph, Box} from "grommet";
import {PageHeader} from "grommet/components";
import {getCurrentSemester, formatSemester} from "../../model/semester";
import {useSemesterQuery, useUpdateSemesterQuery} from "../../services/semesterService";
import TermForm from "../../components/TermForm";
import LoadingButton from "../../components/LoadingButton";


const DirectorHomePage = () => {
    const {year, semester} = getCurrentSemester();
    const semesterQuery = useSemesterQuery(year, semester);
    const updateSemester = useUpdateSemesterQuery(year, semester);
    const loading = semesterQuery.isLoading || updateSemester.isLoading;

    const getTerm = () => {
        return semesterQuery.data ?
            [semesterQuery.data.inicioInscripciones,
                semesterQuery.data.finInscripciones] : []
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
                {loading?
                    <LoadingButton loading={loading} primary/>:
                    <TermForm
                        term={getTerm()}
                        onSubmit={updateSemester.mutate}
                        loading={loading}
                    />}
            </Box>
        </PageContent>
    </Page>

}

export default DirectorHomePage;
