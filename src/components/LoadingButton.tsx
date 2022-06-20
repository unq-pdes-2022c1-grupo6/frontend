import {Box, Button, ButtonProps, Spinner, Text} from "grommet";

interface LoadingButtonProps extends ButtonProps {
    loading: boolean
}

const LoadingButton = ({loading, label, ...props}: LoadingButtonProps) => {

    return <Button
        {...props}
        label={loading ?
            <Box align="center" direction="row" gap="small" pad="small">
                <Spinner/>
                <Text>Cargando...</Text>
            </Box>
            :label}
    />
};

export default LoadingButton;