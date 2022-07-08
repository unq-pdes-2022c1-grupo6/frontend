import {Box, DataTable, Paragraph, Text} from "grommet";
import {ErrorTypeI} from "../../utils/csv/Validator";
import {ImportStatusText} from "../StatusText";


const ImportErrorsTable = ({content}: {content: ErrorTypeI[]}) => {

    return <Box pad="small" height="medium" width="large" overflow="auto">
        <DataTable
            replace
            sortable
            step={10}
            paginate
            data={content}
            columns={[
                {property: "rowNumber", header: <Text>{`Fila (${content.length} Totales)`}</Text>,
                    size: "xsmall", render: ({rowNumber}) => <Text weight="bold">{rowNumber}</Text>},
                {property: "type", header: "Tipo de Error", size: "xsmall",
                    render: ({type}) => <ImportStatusText state={type}/>},
                {property: "messages", align:"start", sortable: false, header: "Mensajes de Error",
                render: ({messages}) => <Paragraph maxLines={4}>{`${messages}`}</Paragraph>},
            ]}
        />
    </Box>

};

export default ImportErrorsTable;
