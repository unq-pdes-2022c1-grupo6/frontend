import { Hide, View } from 'grommet-icons';
import {Button, FormField, FormFieldProps, Stack} from 'grommet';
import {useState} from "react";

const PasswordField = (props: FormFieldProps) => {
    const [reveal, setReveal] = useState(false);

    return (
        <Stack anchor="right">
            <FormField
                required type={reveal ? 'text' : 'password'}
                {...props}
            />
            <Button
                icon={reveal ? <View size="medium"/> : <Hide size="medium"/>}
                onClick={() => setReveal(!reveal)}
            />
        </Stack>
    );
};

export default PasswordField;