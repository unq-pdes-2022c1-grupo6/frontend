import {Box, Form, FormField, Paragraph} from "grommet";
import {validateDNI, validateNumber} from "../../utils/validators";
import LoadingButton from "../../components/LoadingButton";
import {useState} from "react";
import {ConfirmationInfo, useConfirm} from "../../services/authService";
import {useSearchParams} from "react-router-dom";

const ConfirmPage = () => {
    const[searchParams] = useSearchParams();
    const [confirmForm, setConfirmForm] = useState(() => ({
        dni: searchParams.get("dni") || "",
        codigo: ""
    }))
    const confirm = useConfirm();

    return <Box align="center" justify="center" margin={{top: "large"}}>
        <Box width="medium">
            <Paragraph fill textAlign="center">
                Para terminar el registro, complete el código de confirmación de cuenta enviado a su correo electrónico
            </Paragraph>
            <Form<ConfirmationInfo>
                messages={{required: "Requerido*"}}
                value={confirmForm}
                onChange={(nextValue) => setConfirmForm(nextValue)}
                onSubmit={({value}) => confirm.mutate(value)}
            >
                <FormField
                    label="DNI"
                    name="dni"
                    validate={validateDNI}
                    required
                />
                <FormField
                    label="Codigo"
                    name="codigo"
                    validate={validateNumber}
                    required
                />
                <Box gap="medium" margin={{top: "medium"}} align="center">
                    <LoadingButton loading={confirm.isLoading} type="submit" label="Confirmar" primary/>
                </Box>
            </Form>
        </Box>
    </Box>
};

export default ConfirmPage;
