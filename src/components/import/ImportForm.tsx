import CsvInput from "./CsvInput";
import {Box, Button, Layer, Text} from "grommet";
import Papa, {ParseResult} from "papaparse";
import {useState} from "react";
import {ErrorTypeI, ValidateInfoType} from "../../utils/csv/Validator";
import ImportErrorsTable from "./ImportErrorsTable";

export type RowType = { [column: string]: string | number | undefined,  fila?: number};

type ImportFormProps = {
    label: string,
    validateFn: (rows: RowType[]) => ValidateInfoType,
    onImport: (rows: RowType[], onFinishImport: (importErrors: ErrorTypeI[]) => void) => void,
    loading: boolean
}

const ImportForm = ({label, validateFn, onImport, loading}: ImportFormProps) => {
    const [parsing, setParsing] = useState(false);
    const [data, setData] = useState<RowType[]>([]);
    const [errors, setErrors] = useState<ErrorTypeI[]>([]);
    const [importFinished, setImportFinished] = useState(false);
    const [showErrorsModal, setShowErrorsModal] = useState(false);

    const onCloseErrorsModal = () => setShowErrorsModal(false);

    const onFinishImport = (importErrors: ErrorTypeI[]) => {
        setErrors(prevState => prevState.concat(importErrors));
        setImportFinished(true);
    }

    const exportErrorRows = () => {
        const csv = Papa.unparse(errors.flatMap(e => e.rowNumber? [data[e.rowNumber]]: []));
        const csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
        const csvURL = window.URL.createObjectURL(csvData);

        const testLink = document.createElement('a');
        testLink.href = csvURL;
        testLink.setAttribute(label, `${label}.csv`);
        testLink.click();
    }

    const resetForm = () => {
        setImportFinished(false);
        setData([]);
        setErrors([]);
    }

    const onSubmit = (file: File) => {
        setParsing(true);
        Papa.parse(file, {
            complete: (results: ParseResult<RowType>) => {
                const {validRows, parsingErrors} = validateFn(results.data);
                setData(results.data);
                setErrors(parsingErrors);
                onImport(validRows, onFinishImport);
                setParsing(false);
            },
            error: (err) => {
                onFinishImport([{type: "PARSEO", messages: [err.message]}]);
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
            <Box direction="row-responsive" gap="small">
                <Text color="neutral-3">
                    {`Importación Terminada: ${data.length - errors.length} exitosas /
                     ${errors.length} erroneas de ${data.length} filas totales`}
                </Text>
                    {errors.length !== 0 && <Button plain hoverIndicator
                                       label="Ver Errores"
                                       onClick={() => setShowErrorsModal(true)}/>}
                    {errors.length !== 0 && <Button plain hoverIndicator
                                       label="Descargar filas erroneas como csv"
                                       onClick={exportErrorRows}/>}
                <Button plain hoverIndicator label="Finalizar"
                        onClick={resetForm}/>
            </Box>}
        {showErrorsModal && <Layer position="center" onClickOutside={onCloseErrorsModal} onEsc={onCloseErrorsModal}>
            <ImportErrorsTable content={errors}/>
        </Layer>}
    </Box>
};

export default ImportForm;
