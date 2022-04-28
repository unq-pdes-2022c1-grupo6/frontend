import {useNavigate} from "react-router-dom";
import {Anchor, Box, Button, Form, FormField, Paragraph} from "grommet";
import {LoginForm, usePostLogin} from "../services/authService";
import PasswordField from "../components/PasswordField";
import {minLength} from "../utils/validators";


const Login = () => {
    const navigate = useNavigate();
    const mutation = usePostLogin();

    return <Box fill align="center" justify="center">
        <Box width="medium">
            <Form<LoginForm>
                messages={{required: "Requerido*"}}
                onSubmit={({value}) => mutation.mutate(value)}
            >
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
                />
                <Box gap="medium" margin={{top: "medium"}} align="center">
                    <Button type="submit" label="Ingresar" primary/>
                    <Paragraph alignSelf="center" >
                        ¿No tenés Cuenta? <Anchor label="Registrate" onClick={() => navigate("/registro")}/>
                    </Paragraph>
                </Box>
            </Form>
        </Box>
    </Box>
}

export default Login;

