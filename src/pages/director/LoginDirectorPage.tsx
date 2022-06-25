import {Box, Form, FormField, Heading} from "grommet";
import {Account, useLoginDirector} from "../../services/authService";
import {minLength, validateEmail} from "../../utils/validators";
import PasswordField from "../../components/PasswordField";
import LoadingButton from "../../components/LoadingButton";
import {useState} from "react";

const LoginDirectorPage = () => {
    const [directorAccount, setDirectorAccount] = useState<Account>({
        user: "", password: ""
    });
    const login = useLoginDirector(directorAccount.user);


    return <Box align="center" justify="center" margin={{top: "large"}}>
        <Box width="medium">
            <Heading textAlign="center" level={3} size="medium">
                Inicio de sesión de directivos para el manejo de sobrecupos
            </Heading>
            <Form<Account>
                messages={{required: "Requerido*"}}
                value={directorAccount}
                onChange={(nextValue) => setDirectorAccount(nextValue)}
                onSubmit={({value}) => login.mutate(value)}
            >
                <FormField
                    label="Correo electronico"
                    name="user"
                    validate={validateEmail}
                    required
                />
                <PasswordField
                    label="Contraseña"
                    validate={[minLength(4)]}
                    name="password"
                    required
                />
                <Box gap="medium" margin="medium" align="center">
                    <LoadingButton loading={login.isLoading} type="submit" label="Ingresar" primary/>
                </Box>
            </Form>
        </Box>
    </Box>

};

export default LoginDirectorPage;
