import {Box, Text} from "grommet";

const FormErrorMessage = ({message}: { message: string | undefined }) => {

    return <>
        {message && (<Box margin={{top: "medium"}}>
            <Text color="status-error">{message}</Text>
        </Box>)}
    </>;
}

export default FormErrorMessage;