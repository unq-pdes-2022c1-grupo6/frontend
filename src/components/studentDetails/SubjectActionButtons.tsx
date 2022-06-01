import {Box, Button, Text} from 'grommet';
import {CourseState} from "../../model/course";

export type ActionsType = {
    onUpdateRequest: () => void,
    state: string | undefined
}

const SubjectActionButtons = ({onUpdateRequest, state}: ActionsType) => {
    return <Box align="center" justify="center" direction="row" gap="small">
        {state && <Button plain hoverIndicator onClick={() => onUpdateRequest}>
            <Text color="brand">
                Deshacer
            </Text>
        </Button>}
        {(state !== CourseState.RECHAZADO) && <Button plain hoverIndicator onClick={() => onUpdateRequest}>
            <Text color="brand">
                Rechazar
            </Text>
        </Button>}
    </Box>
};

export default SubjectActionButtons;