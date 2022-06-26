import {Page, PageContent, Paragraph, Box} from "grommet";
import {PageHeader} from "grommet/components";
import {getCurrentSemester, formatSemester} from "../../model/semester";
import {useSemesterQuery, useUpdateSemesterQuery} from "../../services/semesterService";
import TermForm from "../../components/TermForm";
import {useState} from "react";


const DirectorHomePage = () => {
    const {year, semester} = getCurrentSemester();
    const [term, setTerm] = useState<string[]>([]);
    const semesterQuery = useSemesterQuery(year, semester, setTerm);
    const updateSemester = useUpdateSemesterQuery(year, semester);

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
                <TermForm
                    term={term}
                    onSubmit={(newTerm) => {
                        updateSemester.mutate(newTerm, {onSuccess: () => {
                            setTerm(newTerm);
                            }});
                    }}
                    loading={semesterQuery.isLoading || updateSemester.isLoading}/>
            </Box>
        </PageContent>
    </Page>

}

export default DirectorHomePage;
