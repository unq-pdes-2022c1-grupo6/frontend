import {Box, Button, Form, FormField} from "grommet";
import {RegisterForm, usePostRegister} from "../services/authService";
import PasswordField from "../components/PasswordField";
import {minLength} from "../utils/validators";


const Register = () => {
    const mutation = usePostRegister();

    return <Box fill align="center" justify="center">
        <Box width="medium">
            <Form<RegisterForm>
                messages={{required: "Requerido*"}}
                onSubmit={({value}) => mutation.mutate(value)}>
                <FormField
                    label="DNI"
                    name="dni"
                    validate={{regexp: /^\d{1,3}\.?\d{3}\.?\d{3}$/, message: "DNI Invalido"}}
                    required
                />
                <FormField
                    label="Nombre de usuario"
                    name="username"
                    validate={[minLength(6)]}
                    required
                />
                <PasswordField
                    label="Contraseña"
                    validate={[minLength(6)]}
                    name="password"
                    required
                />
                <Box align="center" margin={{top: "medium"}}>
                    <Button type="submit" label="Registrar" primary/>
                </Box>
            </Form>
        </Box>
    </Box>
};

export default Register;