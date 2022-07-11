import CsvInput from "./CsvInput";
import {Box, Button, Layer, Text} from "grommet";
import Papa, {ParseResult} from "papaparse";
import {useMemo, useState} from "react";
import {ErrorTypeI, RowErrorTypeI, ValidateInfoType} from "../../utils/csv/Validator";
import ImportErrorsTable from "./ImportErrorsTable";

export type RowType = { [column: string]: string | number | undefined, fila?: number };

type ImportFormProps = {
    label: string,
    validateFn: (rows: RowType[], rowColums: string[]) => ValidateInfoType,
    onImport: (rows: RowType[], onFinishImport: (importErrors: RowErrorTypeI[]) => void) => void,
    loading: boolean
}


const ImportForm = ({label, validateFn, onImport, loading}: ImportFormProps) => {
    const [parsing, setParsing] = useState(false);
    const [data, setData] = useState<RowType[]>([]);
    const [rowErrors, setRowErrors] = useState<RowErrorTypeI[]>([]);
    const [generalErrors, setGeneralErrors] = useState<ErrorTypeI[]>([]);
    const [importFinished, setImportFinished] = useState(false);
    const [showErrorsModal, setShowErrorsModal] = useState(false);

    const onCloseErrorsModal = () => setShowErrorsModal(false);

    const onFinishImport = (importErrors: RowErrorTypeI[]) => {
        setRowErrors(prevState => prevState.concat(importErrors));
        setImportFinished(true);
    }

    const exportErrorRows = () => {
        const csv = Papa.unparse(rowErrors.map(e => data[e.rowNumber]));
        const csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
        const csvURL = window.URL.createObjectURL(csvData);

        const testLink = document.createElement('a');
        testLink.href = csvURL;
        testLink.setAttribute("erroneos", `erroneos.csv`);
        testLink.click();
    }

    const resetForm = () => {
        setImportFinished(false);
        setData([]);
        setRowErrors([]);
        setGeneralErrors([]);
    }

    const onSubmit = (file: File) => {
        resetForm();
        setParsing(true);
        Papa.parse(file, {
            complete: (results: ParseResult<RowType>) => {
                const {hasValidColumns, validRows, parsingErrors} = validateFn(results.data, results.meta.fields || []);
                setData(results.data);
                if (hasValidColumns) {
                    setRowErrors(parsingErrors);
                    onImport(validRows, onFinishImport);
                } else {
                    setGeneralErrors([{
                        type: "PARSEO",
                        messages: [`Archivo equivocado, columnas no coinciden con las de ${label}`]
                    }]);
                    setImportFinished(true);
                }
                setParsing(false);
            },
            error: (err) => {
                setGeneralErrors([{type: "PARSEO", messages: [err.message]}]);
                setImportFinished(true);
                setParsing(false);
            },
            header: true
        })
    }

    const successfulRows = useMemo(() => {
        return rowErrors.length !== 0? data.length - rowErrors.length: 0
    },[rowErrors, data])

    return <Box>
        <CsvInput
            label={label}
            loading={loading || parsing}
            onSubmit={onSubmit}/>
        {importFinished &&
            <Box direction="row-responsive" gap="small">
                <Text color="neutral-3">
                    {`Importación Terminada: ${successfulRows} exitosas de ${data.length} filas totales`}
                </Text>
                {(rowErrors.length !== 0 || generalErrors.length !== 0) &&
                    <Button plain hoverIndicator
                            label="Ver Errores"
                            onClick={() => setShowErrorsModal(true)}/>}
                {rowErrors.length !== 0 &&
                    <Button plain hoverIndicator
                            label="Descargar filas erroneas como csv"
                            onClick={exportErrorRows}/>}
                <Button plain hoverIndicator label="Finalizar"
                        onClick={resetForm}/>
            </Box>}
        {showErrorsModal && <Layer position="center" onClickOutside={onCloseErrorsModal} onEsc={onCloseErrorsModal}>
            <ImportErrorsTable content={generalErrors.concat(rowErrors)}/>
        </Layer>}
    </Box>
};

export default ImportForm;
