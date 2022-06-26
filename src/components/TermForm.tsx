import {Box, Button, DateInput, Form, FormField} from "grommet";
import LoadingButton from "./LoadingButton";
import {useEffect, useState} from "react";
import {formatDate} from "../model/semester";

type TermFormProps = {
    term: string[],
    onSubmit: (term: string[]) => void,
    loading: boolean
}

type TermFormType = { term: string[] };

const TermForm = ({term, onSubmit, loading}: TermFormProps) => {
    const [termForm, setTermForm] = useState<TermFormType>({term: []});

    useEffect(() => {
        setTermForm({term});
    },[term])

    const getTermLabel = () => {
        return termForm.term[0] && termForm.term[1] ?
            `${formatDate(new Date(termForm.term[0]))} - ${formatDate(new Date(termForm.term[1]))}` :
            "No definido"
    }

    const onReset = () => setTermForm({term: term})

    return <Form<TermFormType>
        value={termForm}
        onChange={setTermForm}
        onReset={onReset}
        onSubmit={({value}) => onSubmit(value.term)}>
        <FormField name="term" label="Plazo de Inscripción" required>
            <DateInput
                name="term"
                buttonProps={{label: getTermLabel()}}
                dropProps={{align: {left: "right"}}}
                calendarProps={{locale: "es-AR", size: "medium"}}
            />
        </FormField>
        <Box direction="row" gap="large">
            <LoadingButton loading={loading} type="submit" label="Cambiar" primary/>
            <Button disabled={loading} type="reset" label="Cancelar"/>
        </Box>
    </Form>

};

export default TermForm;
