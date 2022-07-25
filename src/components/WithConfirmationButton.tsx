import {Box, Button, DropButton, DropButtonExtendedProps, Spinner, Text} from "grommet";
import {useState} from "react";

type WithConfirmationButtonProps = {
    loading?: boolean
    dropButtonProps: DropButtonExtendedProps,
    onConfirm: () => void
}

const WithConfirmationButton = ({loading = false, dropButtonProps, onConfirm}: WithConfirmationButtonProps) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    return <DropButton
        {...dropButtonProps}
        open={showConfirmation}
        onOpen={() => setShowConfirmation(true)}
        onClose={() => setShowConfirmation(false)}
        disabled={loading}
        label={loading ?
            <Box align="center" direction="row" gap="small" pad="none">
                <Spinner color="white" size="small"/>
                <Text>{`Cargando...`}</Text>
            </Box>
            : dropButtonProps.label}
        dropContent={
            <Box pad="medium" direction="row" justify="between" gap="medium">
                <Button label="Aceptar" plain hoverIndicator
                        onClick={() => {
                            onConfirm();
                            setShowConfirmation(false)
                        }}/>
                <Button label="Cancelar" plain hoverIndicator
                        onClick={() => setShowConfirmation(false)}/>
            </Box>}
    />

};

export default WithConfirmationButton;
