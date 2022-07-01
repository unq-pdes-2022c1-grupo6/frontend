import {Page, PageContent, Paragraph, Box} from "grommet";
import {PageHeader} from "grommet/components";
import {getCurrentSemester, formatSemester} from "../../model/semester";
import {useCloseAllRequest, useSemesterQuery, useUpdateSemesterQuery} from "../../services/semesterService";
import TermForm from "../../components/TermForm";
import {useState} from "react";
import LoadingButton from "../../components/LoadingButton";
import WithConfirmationButton from "../../components/WithConfirmationButton";


const DirectorHomePage = () => {
    const {year, semester} = getCurrentSemester();
    const [term, setTerm] = useState<string[]>([]);
    const semesterQuery = useSemesterQuery(year, semester, setTerm);
    const updateSemester = useUpdateSemesterQuery(year, semester);
    const closeAllRequest = useCloseAllRequest();


    return <Page kind="narrow">
        <PageContent>
            <PageHeader
                responsive
                title="Sistema de sobrecupos"
                subtitle={<Paragraph fill>
                    {`Bienvenido al ${formatSemester(semester)} cuatrimestre de ${year}. Para iniciar un nuevo ciclo de inscripción,
                    asegúrese de importar los datos necesarios y definir un plazo de inscripción.`}<br/>
                    Para terminarlo, clickee el botón Cerrar todas las solicitudes, que cambiará el estado de todas las solicitudes a CERRADO.
                </Paragraph>}/>
        </PageContent>
        <PageContent direction="row-responsive" justify="between" align="center">
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
            {closeAllRequest.isLoading?
                <LoadingButton loading={closeAllRequest.isLoading}/>:
                <WithConfirmationButton
                    dropButtonProps={{
                        label: "Cerrar todas las solicitudes",
                        dropProps: {align: {top: "bottom"}},
                        dropContent: <></>
                    }}
                    onConfirm={closeAllRequest.mutate}/>}
        </PageContent>
    </Page>

}

export default DirectorHomePage;
