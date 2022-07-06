import CsvInput from "./CsvInput";
import {Box, Button, Text} from "grommet";
import Papa, {ParseResult} from "papaparse";
import {useState} from "react";
import {ErrorTypeI} from "../../utils/csv/Validator";

export type RowType = { [column: string]: string };

type ImportFormProps = {
    label: string,
    validateFn: (row: RowType, rowNumber: number) => ErrorTypeI[],
    onImport: (rows: RowType[], onFinishImport: (importErrors: ErrorTypeI[]) => void) => void,
    loading: boolean
}

const ImportForm = ({label, validateFn, onImport, loading}: ImportFormProps) => {
    const [parsing, setParsing] = useState(false);
    const [importFinished, setImportFinished] = useState(false);
    const [errors, setErrors] = useState<ErrorTypeI[]>([]);

    const onFinishImport = (importErrors: ErrorTypeI[]) => {
        importErrors !== [] && setErrors(importErrors);
        setImportFinished(true);
    }

    const validateRows = (rows: RowType[]) => {
        return rows.reduce(
            ({validRows, parsingErrors}: {validRows: RowType[], parsingErrors: ErrorTypeI[]},
             row, index) => {
                const rowErrors = validateFn(row, index);
                rowErrors? parsingErrors.concat(rowErrors): validRows.concat(row);
                return {validRows, parsingErrors};
            }, {validRows: [], parsingErrors: []});
    }

    const onSubmit = (file: File) => {
        setParsing(true);
        Papa.parse(file, {
            complete: (results: ParseResult<RowType>) => {
                const {validRows, parsingErrors} = validateRows(results.data);
                parsingErrors && setErrors(parsingErrors);
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
                    {`Importación Terminada: filas exitosas / filas erroneas de filas totales`}
                </Text>
                {errors && <Button label="Ver Errores"/>}
                {errors && <Button label="Descargar Filas Erroneas como CSV"/>}
            </Box>}
    </Box>
};

export default ImportForm;
