import {Box, Button, DropButton, DropButtonExtendedProps} from "grommet";
import {useState} from "react";

type WithConfirmationButtonProps = {
    dropButtonProps: DropButtonExtendedProps,
    onConfirm: () => void
}

const WithConfirmationButton = ({dropButtonProps, onConfirm}: WithConfirmationButtonProps) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    return <DropButton
        open={showConfirmation}
        onOpen={() => setShowConfirmation(true)}
        onClose={() => setShowConfirmation(false)}
        {...dropButtonProps}
        dropContent={
            <Box pad="medium" direction="row" justify="between">
                <Button label="Aceptar" plain hoverIndicator
                        onClick={onConfirm}/>
                <Button label="Cancelar" plain hoverIndicator
                        onClick={() => setShowConfirmation(false)}/>
            </Box>}
    />

};

export default WithConfirmationButton;
