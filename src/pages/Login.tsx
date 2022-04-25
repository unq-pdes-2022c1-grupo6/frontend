import {useState} from "react";
import {Box, Button, Form, FormField} from "grommet";

interface FormState {
    username?: string,
    password?: string
}

const Login = () => {
    const [form, setForm] = useState<FormState>({
        username: "",
        password: ""
    });

    return <Box fill align="center" justify="center">
        <Box width="medium">
            <Form<FormState>
                value={form}
                messages={{required: "Requerido*"}}
                onReset={() => setForm({})}
                onChange={(nextForm, _) => {
                    setForm(nextForm)
                }}
                onSubmit={({value}) => console.log("onSubmit", value)}
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

