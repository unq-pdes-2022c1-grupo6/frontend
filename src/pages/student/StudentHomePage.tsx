import {useCurrentSemesterQuery} from "../../services/semesterService";
import {Text, Box, Page, PageContent, Spinner} from "grommet";
import {PageHeader} from "grommet/components";

const StudentHomePage = () => {
    const currentSemesterQuery = useCurrentSemesterQuery();

    if (currentSemesterQuery.isLoading) {
        return <Box align="center" direction="row" gap="small" pad="small">
            <Spinner />
            <Text>Loading...</Text>
        </Box>
    }

    const getTitle = () => {
        let title = "Bienvenido";
        const semester = currentSemesterQuery.data;
        if (semester) {
            title = `Bienvenido al ${semester.getSemester()} cuatrimestre de ${semester.year}`
        }
        return title
    }

    const getSubtitle = () => {
        let subtitle = "En este momento el sistema no se encuentra disponible, vuelva más tarde";
        const semester = currentSemesterQuery.data;
        if (semester?.isBeforePeriod()) {
            subtitle =`En los próximos días arranca la inscripción a materias por sobrecupos, el periodo es entre ${semester?.getStart()} hasta el ${semester?.getEnd()}`
        }
        if (semester?.isBetweenPeriod()) {
            subtitle =`Ya arrancó la inscripción a materias por sobrecupos, tenes tiempo hasta el ${semester?.getEnd()} para completarlo`
        }
        if (semester?.isAfterPeriod()) {
            subtitle =`El periodo de inscripción término, si tienes una solicitud hecha, los resultados estarán a la brevedad`
        }
        return subtitle;
    }

    return <Page kind="narrow">
        <PageContent>
            <PageHeader
                title={getTitle()}
                subtitle={getSubtitle()}
                responsive
            />
        </PageContent>
    </Page>

};

export default StudentHomePage;
