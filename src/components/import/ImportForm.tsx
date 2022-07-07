import CsvInput from "./CsvInput";
import {Box, Button, Layer, Text} from "grommet";
import Papa, {ParseResult} from "papaparse";
import {useState} from "react";
import {ErrorTypeI, ValidateInfoType} from "../../utils/csv/Validator";
import ImportErrorsTable from "../../pages/director/import/ImportErrorsTable";

export type RowType = { [column: string]: string };

type ImportFormProps = {
    label: string,
    validateFn: (rows: RowType[]) => ValidateInfoType,
    onImport: (rows: RowType[], onFinishImport: (importErrors: ErrorTypeI[]) => void) => void,
    loading: boolean
}

const ImportForm = ({label, validateFn, onImport, loading}: ImportFormProps) => {
    const [parsing, setParsing] = useState(false);
    const [importFinished, setImportFinished] = useState(false);
    const [errors, setErrors] = useState<ErrorTypeI[]>([]);
    const [dataSize, setDataSize] = useState(0);
    const [showErrorsModal, setShowErrorsModal] = useState(false);

    const onCloseErrorsModal = () => setShowErrorsModal(false);

    const onFinishImport = (importErrors: ErrorTypeI[]) => {
        setErrors(importErrors);
        setImportFinished(true);
    }

    const onSubmit = (file: File) => {
        setParsing(true);
        Papa.parse(file, {
            complete: (results: ParseResult<RowType>) => {
                const {validRows, parsingErrors} = validateFn(results.data);
                setErrors(parsingErrors);
                setDataSize(results.data.length);
                onImport(validRows, onFinishImport);
                setParsing(false);
            },
            header: true
        })
    }

    return <Box>
        <CsvInput
            label={label}
            loading={loading || parsing}
            onSubmit={onSubmit}/>
        {importFinished &&
            <Box pad={{horizontal: 'small'}} direction="row">
                <Text color="neutral-3">
                    {`Importación Terminada: ${dataSize - errors.length} filas exitosas /
                     ${errors.length} filas erroneas de ${dataSize} totales`}
                </Text>
                {errors && <Button label="Ver Errores" onClick={() => setShowErrorsModal(true)}/>}
                {errors && <Button label="Descargar Filas Erroneas como CSV"/>}
            </Box>}
        {showErrorsModal && <Layer position="center" onClickOutside={onCloseErrorsModal} onEsc={onCloseErrorsModal}>
            <ImportErrorsTable content={errors}/>
        </Layer>}
    </Box>
};

export default ImportForm;
