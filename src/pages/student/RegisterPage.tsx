import {Account, useRegisterStudent} from "../../services/authService";
import {Box, Form, FormField} from "grommet";
import {minLength, validateDNI} from "../../utils/validators";
import PasswordField from "../../components/PasswordField";
import {useState} from "react";
import LoadingButton from "../../components/LoadingButton";

const RegisterPage = () => {
    const [studentAccount, setStudentAccount] = useState({
        user: "",
        password: ""
    })
    const registerStudent = useRegisterStudent(studentAccount.user);

    return <Box align="center" justify="center" margin={{top: "large"}}>
        <Box width="medium">
            <Form<Account>
                messages={{required: "Requerido*"}}
                value={studentAccount}
                onChange={(nextValue) => setStudentAccount(nextValue)}
                onSubmit={({value}) => registerStudent.mutate(value)}
            >
                <FormField
                    label="DNI"
                    name="user"
                    validate={validateDNI}
                    required
                />
                <PasswordField
                    label="Nueva Contraseña"
                    validate={[minLength(6)]}
                    name="password"
                    required
                />
                <Box gap="medium" margin={{top: "medium"}} align="center">
                    <LoadingButton loading={registerStudent.isLoading} type="submit" label="Registrar" primary/>
                </Box>
            </Form>
        </Box>
    </Box>

};

export default RegisterPage;
