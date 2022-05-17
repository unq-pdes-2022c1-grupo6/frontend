import {Box, Text} from "grommet";

const FormErrorMessage = ({message}: { message: string | undefined }) => {

    return <>
        {message && (<Box pad="small">
            <Text color="status-error">{message}</Text>
        </Box>)}
    </>;
}

export default FormErrorMessage;