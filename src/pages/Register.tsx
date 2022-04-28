import {Box, Button, Form, FormField, Stack} from "grommet";
import {Hide, View} from "grommet-icons";
import {useState} from "react";


const Registro = () => {
    const [reveal, setReveal] = useState(false);

    return <Box fill align="center" justify="center">
        <Box width="medium">
            <Form messages={{required: "Requerido*"}} onSubmit={({value}) => console.log(value)}>
                <FormField
                    label="DNI"
                    name="dni"
                    validate={{regexp: /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/, message: "DNI Invalido"}}
                    required
                />
                <FormField
                    label="Nombre de usuario"
                    name="username"
                    required
                />
                <Stack anchor="right">
                    <FormField
                        label="Contraseña"
                        name="password"
                        required type={reveal ? 'text' : 'password'}
                    />
                    <Button
                        icon={reveal ? <View size="medium"/> : <Hide size="medium"/>}
                        onClick={() => setReveal(!reveal)}
                    />
                </Stack>
                <Box align="center" margin={{top: "medium"}}>
                    <Button type="submit" label="Registrar" primary/>
                </Box>
            </Form>
        </Box>
    </Box>
};

export default Registro;