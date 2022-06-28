import {Box, Button, Text} from "grommet";
import {CourseState} from "../../services/dtos/requestDTO";
import React from "react";

type CourseActionButtonsProps = {
    courseState: CourseState,
    onChangeState: (state: CourseState) => void,
}

const CourseActionButtons = ({courseState, onChangeState}: CourseActionButtonsProps) => {
    const courseActions = [
        {color: "status-ok", label: "Aceptar", state: CourseState.APROBADO},
        {color: "status-critical", label: "Rechazar", state: CourseState.RECHAZADO},
        {color: "text-strong", label: "Pender", state: CourseState.PENDIENTE},
    ]

    return <Box direction="row-responsive" gap="xsmall">
        {courseActions.map(({color, label, state}, index) => {
            return <Button key={index} size="small" hoverIndicator plain
                        onClick={() => onChangeState(state)}
                        disabled={state === courseState}>
                <Text color={color}>{label}</Text>
                </Button>
        })}
    </Box>

};

export default CourseActionButtons;

