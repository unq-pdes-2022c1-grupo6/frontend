import CsvInput from "./CsvInput";
import {Box, Button, Layer, Text} from "grommet";
import Papa, {ParseResult} from "papaparse";
import {useMemo, useState} from "react";
import ImportErrorsTable from "./ImportErrorsTable";
import {ConvertedRowsInfoType, DTORowType, ParsedRowType} from "../../utils/csv/Mapping";
import {MutateOptions} from "react-query";
import {ErrorTypeI, notValidColumns, RowErrorTypeI} from "../../utils/csv/Validator";
import {ConflictDTO} from "../../services/dtos/subjectDTO";


type ImportFormProps = {
    label: string,
    convertToDTOsFn: (rows: ParsedRowType[]) => ConvertedRowsInfoType,
    requiredColumns: string[],
    onImport:  (variables: {rows: DTORowType[]},
                options?: (MutateOptions<ConflictDTO[], unknown, {rows: DTORowType[]}, unknown> | undefined)) => void,
    loading: boolean
}


const ImportForm = ({label, convertToDTOsFn, requiredColumns, onImport, loading}: ImportFormProps) => {
    const [parsing, setParsing] = useState(false);
    const [data, setData] = useState<ParsedRowType[]>([]);
    const [rowErrors, setRowErrors] = useState<RowErrorTypeI[]>([]);
    const [generalErrors, setGeneralErrors] = useState<ErrorTypeI[]>([]);
    const [importFinished, setImportFinished] = useState(false);
    const [showErrorsModal, setShowErrorsModal] = useState(false);

    const onCloseErrorsModal = () => setShowErrorsModal(false);

    const onFinishImport = (rows: DTORowType[]) => {
        onImport({rows}, {
            onSuccess: () => {
                setImportFinished(true);
            }
        });
    }

    const exportErrorRows = () => {
        const csv = Papa.unparse(rowErrors.map(e => data[e.fila]));
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
            complete: (results: ParseResult<ParsedRowType>) => {
                if (notValidColumns.isValid(requiredColumns, results.meta.fields || [])) {
                    const {dtos, errors} = convertToDTOsFn(results.data);
                    setData(results.data);
                    setRowErrors(errors);
                    onFinishImport(dtos);
                } else {
                    setGeneralErrors([{
                        type: "PARSEO",
                        messages: [notValidColumns.getMessage(label)]
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
