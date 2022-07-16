import {Form, FormField, FileInput, Box, Text} from "grommet";
import {useState} from "react";
import LoadingButton from "../LoadingButton";


type CsvInputProps = {
    label: string,
    helpLabel: string,
    onSubmit: (file: File) => void,
    loading: boolean,
    loadingLabel: string,
}

type FileFormType = { csvinput: File[] }

const CsvInput = ({label, onSubmit, loading, loadingLabel, helpLabel}: CsvInputProps) => {
    const [fileForm, setFileForm] = useState<FileFormType>();

    const onSubmit0 = (value: FileFormType) => {
        if (value.csvinput[0]) {
            onSubmit(value.csvinput[0])
        }
    }

    return <Form<FileFormType>
        value={fileForm}
        onSubmit={({value}) => onSubmit0(value)}
        onChange={(value) => setFileForm(value)}
        messages={{required: "Requerido*"}}>
        <Box direction="row-responsive" align="center" gap="medium">
            <FormField label={label}
                       name="csvinput"
                       required
                       width="large"
                       help={<Text weight="lighter" size="small">{helpLabel}</Text>}>
                <FileInput name="csvinput" accept="text/csv"
                           messages={{
                               browse: "Examinar",
                               dropPrompt: "Arrastra el csv aquí o",
                               dropPromptMultiple: "Arrastra los csvs aquí o",
                               files: "archivos",
                               remove: "remover",
                               removeAll: "remover todos",
                               maxFile: "Maximo de {max} archivos."
                           }}
                />
            </FormField>
            <LoadingButton loading={loading} loadingLabel={loadingLabel} label="Importar" type="submit" primary/>
        </Box>
    </Form>

};


export default CsvInput;
