import {Box, Button, ButtonType, Spinner, Text} from "grommet";

interface LoadingButtonProps extends ButtonType {
    loading: boolean,
    loadingLabel?: string
}

const LoadingButton = ({loading, label, loadingLabel = "Cargando", ...props}: LoadingButtonProps) => {

    return <Button
        {...props}
        disabled={loading}
        label={loading ?
            <Box align="center" direction="row" gap="small" pad="none">
                <Spinner color="white" size="small"/>
                <Text>{`${loadingLabel}...`}</Text>
            </Box>
            : label}
    />
};

export default LoadingButton;
