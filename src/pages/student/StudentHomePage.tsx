import {useCurrentSemesterQuery} from "../../services/semesterService";
import {Text, Box, Page, PageContent, Spinner, Button} from "grommet";
import {PageHeader} from "grommet/components";
import LoadingButton from "../../components/LoadingButton";
import {isRequestNotFound, useDeleteRequest, useRequestQuery} from "../../services/requestService";
import {CREATE_REQUEST_ROUTE, EDIT_REQUEST_ROUTE, REQUEST_ROUTE} from "../../utils/routes";
import {useNavigate} from "react-router-dom";

const StudentHomePage = () => {
    const currentSemesterQuery = useCurrentSemesterQuery();
    const requestQuery = useRequestQuery();
    const deleteRequest = useDeleteRequest();
    const navigate = useNavigate();

    if (currentSemesterQuery.isLoading) {
        return <Box align="center" direction="row" gap="small" pad="small">
            <Spinner/>
            <Text>Cargando...</Text>
        </Box>
    }

    const getTitle = () => {
        let title = "Bienvenido"; const semester = currentSemesterQuery.data;
        if (semester) {
            title = `Bienvenido al ${semester.getSemester()} cuatrimestre de ${semester.year}`
        }
        return title
    }

    const getSubtitle = () => {
        let subtitle = "En este momento el sistema no se encuentra disponible, vuelva más tarde";
        const semester = currentSemesterQuery.data;
        if (semester?.isBeforePeriod()) {
            subtitle = `En los próximos días arranca la inscripción a materias por sobrecupos, el periodo es entre ${semester?.getStart()} hasta el ${semester?.getEnd()}`
        }
        if (semester?.isBetweenPeriod()) {
            subtitle = `Ya arrancó la inscripción a materias por sobrecupos, tenes tiempo hasta el ${semester?.getEnd()} para completarlo`
        }
        if (semester?.isAfterPeriod()) {
            subtitle = `El periodo de inscripción término, si tienes una solicitud hecha, los resultados estarán a la brevedad`
        }
        return subtitle;
    }

    const getActions = () => {
        let actions; const betweenPeriod = currentSemesterQuery.data?.isBetweenPeriod();
        if (requestQuery.isLoading) {
            actions = <LoadingButton loading={requestQuery.isLoading} primary/>
        }
        else {
            actions = <Box direction="row" gap="small" align="center">
                {betweenPeriod && isRequestNotFound(requestQuery.error) &&
                    <Button label="Crear Solicitud" primary
                            onClick={() => navigate("/" + CREATE_REQUEST_ROUTE)}/>}
                {requestQuery.data &&
                    <Button label="Ver Solicitud" primary
                            onClick={() => navigate("/" + REQUEST_ROUTE)} />}
                {requestQuery.data && betweenPeriod &&
                    <Button label="Editar Solicitud"
                            onClick={() => navigate("/" + EDIT_REQUEST_ROUTE)} />}
                {requestQuery.data && betweenPeriod &&
                    <LoadingButton label="Borrar Solicitud" loading={deleteRequest.isLoading}
                                   onClick={() => deleteRequest.mutate()} />}
            </Box>
        }
        return actions;
    }

    return <Page kind="narrow">
        <PageContent>
            <PageHeader
                title={getTitle()}
                subtitle={getSubtitle()}
                actions={getActions()}
                responsive
            />
        </PageContent>
    </Page>

};

export default StudentHomePage;
