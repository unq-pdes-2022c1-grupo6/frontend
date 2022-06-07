import {useState} from "react";
import {Box, Button, Stack, TextInput} from "grommet";
import {Close, Search} from "grommet-icons";

type RequestsSearchBarPropTypes = {
    searchTerm: string | undefined,
    onSearch: (searchTerm: string) => void;
    onCancel: () => void
}

const RequestsSearchBar = ({searchTerm = "", onSearch, onCancel}: RequestsSearchBarPropTypes) => {
    const [value, setValue] = useState(searchTerm);

    return <Box width="medium" >
        <Stack anchor="right">
            <TextInput
                placeholder="Buscar por Legajo, DNI o Nombre..."
                value={value}
                onChange={(event) => setValue(event.target.value)}/>
            <Box align="center" justify="center" direction="row" background={{color: "brand"}}>
                <Button
                    onClick={() => onSearch(value)}
                    icon={<Search/>}
                    hoverIndicator
                    tip="Buscar"/>
                <Button
                    onClick={onCancel}
                    icon={<Close/>}
                    hoverIndicator
                    tip="Cancelar"/>
            </Box>
        </Stack>
    </Box>
};

export default RequestsSearchBar;