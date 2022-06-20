import {StudentAccount, useRegisterStudent} from "../../services/authService";
import {Box, Form, FormField} from "grommet";
import {minLength, validateDNI} from "../../utils/validators";
import PasswordField from "../../components/PasswordField";
import {useState} from "react";
import LoadingButton from "../../components/LoadingButton";

const RegisterPage = () => {
    const [studentAccount, setStudentAccount] = useState({
        dni: "",
        contrasenia: ""
    })
    const registerStudent = useRegisterStudent(studentAccount);

    return <Box align="center" justify="center" margin={{top: "large"}}>
        <Box width="medium">
            <Form<StudentAccount>
                messages={{required: "Requerido*"}}
                value={studentAccount}
                onChange={(nextValue) => setStudentAccount(nextValue)}
                onSubmit={({value}) => registerStudent.mutate(value)}
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
                <Box gap="medium" margin={{top: "medium"}} align="center">
                    <LoadingButton loading={registerStudent.isLoading} type="submit" label="Registrar" primary/>
                </Box>
            </Form>
        </Box>
    </Box>

};

export default RegisterPage;