import React, {useState} from 'react';
import {Box, Button, Heading, TextArea} from "grommet";

type TextAreaFormType = {
    label: string,
    value: string | undefined;
    onSubmit: () => void
}

const TextAreaForm = ({label, value = "", onSubmit}: TextAreaFormType) => {
    const [textArea, setTextArea] = useState(value);

    return <Box width="large">
        <Box align="center" direction="row-responsive" gap="small">
            <Heading level="3">{label}</Heading>
            <Button size="small" label="Cambiar" primary onClick={() => onSubmit()} />
            <Button size="small" label="Cancelar" onClick={() => setTextArea(value)} />
        </Box>
        <TextArea
            size="medium"
            rows={6}
            value={textArea}
            onChange={(event) => setTextArea(event.target.value)} />
    </Box>

};

export default TextAreaForm;