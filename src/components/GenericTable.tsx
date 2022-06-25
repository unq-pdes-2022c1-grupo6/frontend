import {Table, TableBody, TableCell, TableHeader, TableRow, Text} from "grommet";
import {ReactNode} from "react";

type GenericTableProps<T> = {
    data: T[],
    columns: {
        label: string,
        format: (datum: T) => ReactNode
    }[]
}

const GenericTable = <T,> ({data, columns}: GenericTableProps<T>) => {
    return <Table>
        <TableHeader>
            <TableRow>
                {columns.map((col, index) => (
                    <TableCell key={index} scope="col">
                        <Text>{col.label}</Text>
                    </TableCell>
                ))}
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((c, index) => (
                <TableRow key={index}>
                    {columns.map((col) => (
                        <TableCell key={col.label} scope="row">
                            {col.format(c)}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    </Table>

};

export default GenericTable;
