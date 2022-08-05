import {Box, Form, FormField, TextInput} from "grommet";
import {useState} from "react";
import LoadingButton from "../LoadingButton";

type CourseQuotaInputProps = {
    minQuota: number
    onSubmit: (newQuota: number) => void,
    loading: boolean
}


const CourseQuotaInput = ({minQuota, onSubmit, loading}: CourseQuotaInputProps) => {
    const [quotaForm, setQuotaForm] = useState<{ quota: number }>();

    return <Form<{ quota: number }>
        messages={{required: "Requerido*"}}
        value={quotaForm}
        onChange={setQuotaForm}
        onSubmit={({value}) => onSubmit(value.quota)}
    >
        <Box direction="row-responsive" gap="medium" align="center">
        <FormField
            name="quota"
            validate={(newQuota) => newQuota && newQuota < minQuota?
                "Sobrecupo total menor que los disponibles":
                undefined}
            required>
            <TextInput name="quota" placeholder="Sobrecupo Total" type="number" min={minQuota}/>
        </FormField>
        <LoadingButton loading={loading} size="small" label="Editar" type="submit" primary/>
        </Box>
    </Form>

};

export default CourseQuotaInput;
