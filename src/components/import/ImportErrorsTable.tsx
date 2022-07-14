import {Box, DataTable, Paragraph, Text} from "grommet";
import {ImportStatusText} from "../StatusText";
import {ErrorTypeI} from "../../utils/csv/Validator";


const ImportErrorsTable = ({content}: {content: ErrorTypeI[]}) => {

    return <Box pad="small" height="medium" width="large" overflow="auto">
        <DataTable
            replace
            sortable
            step={10}
            paginate
            data={content}
            columns={[
                {property: "fila", header: <Text>{`Fila (${content.length} Total/es)`}</Text>, align: "end",
                    size: "xsmall", render: ({fila}) => <Text weight="bold">{fila}</Text>},
                {property: "type", header: "Tipo de Error", size: "small",
                    render: ({type}) => <ImportStatusText state={type}/>},
                {property: "messages", align:"start", sortable: false, header: "Mensajes de Error",
                render: ({messages}) => <Paragraph maxLines={4}>{`${messages}`}</Paragraph>},
            ]}
        />
    </Box>

};

export default ImportErrorsTable;
