import {Anchor, Box, Form, FormField, Paragraph} from "grommet";
import {minLength, validateDNI} from "../../utils/validators";
import PasswordField from "../../components/PasswordField";
import {CONFIRM_ROUTE, REGISTER_ROUTE} from "../../utils/routes";
import {useNavigate} from "react-router-dom";
import {StudentAccount, useLoginStudent} from "../../services/authService";
import {useState} from "react";
import LoadingButton from "../../components/LoadingButton";

const LoginStudentPage = () => {
    const [studentAccount, setStudentAccount] = useState({
        dni: "",
        contrasenia: ""
    })
    const navigate = useNavigate();
    const login = useLoginStudent(studentAccount.dni);

    return <Box align="center" justify="center" margin={{top: "large"}}>
        <Box width="medium">
            <Form<StudentAccount>
                messages={{required: "Requerido*"}}
                value={studentAccount}
                onChange={(nextValue) => setStudentAccount(nextValue)}
                onSubmit={({value}) => login.mutate(value)}
            >
                <FormField
                    label="DNI"
                    name="dni"
                    validate={validateDNI}
                    required
                />
                <PasswordField
                    label="Contraseña"
                    validate={[minLength(6)]}
                    name="contrasenia"
                    required
                />
                <Box gap="medium" margin="medium" align="center">
                    <LoadingButton loading={login.isLoading} type="submit" label="Ingresar" primary/>
                    <Paragraph margin="none" alignSelf="center">
                        ¿No tenés Cuenta? <Anchor label="Registrate" onClick={() => navigate(REGISTER_ROUTE)}/>
                    </Paragraph>
                    <Paragraph margin="none" alignSelf="center">
                        ¿Te falta confirmar tu Cuenta? <Anchor label="Entra acá" onClick={() => navigate(CONFIRM_ROUTE)}/>
                    </Paragraph>
                </Box>
            </Form>
        </Box>
    </Box>
};

export default LoginStudentPage;