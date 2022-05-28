import React from 'react';
import {Box, Button, ButtonProps} from "grommet";

const SubmitButton = (props: ButtonProps) => {
    return <Box align="center" justify="center" direction="row" pad="medium">
        <Button type="submit" primary {...props}/>
    </Box>
};

export default SubmitButton;