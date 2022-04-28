import {useState} from "react";
import {Link} from "react-router-dom";
import {Anchor, Box, Button, Form, FormField, Paragraph} from "grommet";
import {LoginForm, usePostLogin} from "../services/authService";



const Login = () => {
    const mutation = usePostLogin();
    const [form, setForm] = useState<LoginForm>({
        username: "",
        password: ""
    });

    return <Box fill align="center" justify="center">
        <Box width="medium">
            <Form<LoginForm>
                value={form}
                messages={{required: "Requerido*"}}
                onChange={(nextForm, _) => {
                    setForm(nextForm)
                }}
                onSubmit={({value}) => mutation.mutate(value)}
            >
                <FormField
                    label="Nombre de usuario"
                    name="username"
                    required
                />
                <FormField
                    label="Contraseña"
                    name="password"
                    type="password"
                    required
                />
                <Box gap="medium" margin={{top: "medium"}} align="center">
                    <Button type="submit" label="Ingresar" primary/>
                    <Paragraph alignSelf="center" >
                        ¿No tienes Cuenta? <Link to="/registro"> <Anchor label="Registrate"/> </Link>
                    </Paragraph>
                </Box>
            </Form>
        </Box>
    </Box>
}

export default Login;

