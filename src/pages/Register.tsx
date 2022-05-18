import {Box, Form, FormField} from "grommet";
import {RegisterForm, usePostRegister} from "../services/authService";
import PasswordField from "../components/PasswordField";
import {minLength} from "../utils/validators";
import SubmitButton from "../components/SubmitButton";


const Register = () => {
    const mutation = usePostRegister();

    return <Box align="center" justify="center" margin={{top: "large"}}>
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
                <SubmitButton label="Registrar"/>
            </Form>
        </Box>
    </Box>
};

export default Register;