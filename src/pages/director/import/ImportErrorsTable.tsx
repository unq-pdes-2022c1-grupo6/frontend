import {Box, DataTable, Text} from "grommet";
import {ErrorTypeI} from "../../../utils/csv/Validator";


const ImportErrorsTable = ({content}: {content: ErrorTypeI[]}) => {

    return <Box pad="medium" height="medium" overflow="auto" gap="medium">
        <DataTable
            replace
            size="small"
            sortable
            step={10}
            paginate
            data={content}
            columns={[
                {property: "rowNumber", header: "Numero de fila", size: "xsmall", align: "end",
                    render: ({rowNumber}) => <Text weight="bold">{rowNumber}</Text>},
                {property: "type", header: "Tipo de Error", size: "xsmall"},
                {property: "message", header: "Mensaje de Error", size: "small"},
            ]}
        />
    </Box>

};

export default ImportErrorsTable;
