import {useState} from "react";
import {Box, Button, Form, FormField} from "grommet";
import {useMutation} from "react-query";
import axiosMockInstance from "../utils/mockAxios";

interface FormState {
    username?: string,
    password?: string
}

const Login = () => {
    const mutation = useMutation((newLogin: FormState) => {
        return axiosMockInstance.post('/login', newLogin)
    },{
        onSuccess: ({data}) => {
            console.log("login exitoso")
            console.log(data)
        }
    });
    const [form, setForm] = useState<FormState>({
        username: "",
        password: ""
    });

    return <Box fill align="center" justify="center">
        <Box width="medium">
            <Form<FormState>
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

