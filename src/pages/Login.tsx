import {useState} from "react";
import {Box, Button, Form, FormField} from "grommet";
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
                <Box direction="row" justify="between" margin={{top: "medium"}}>
                    <Button type="submit" label="Ingresar" primary/>
                </Box>
            </Form>
        </Box>
    </Box>
}

export default Login;

