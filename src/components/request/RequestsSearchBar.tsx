import {useEffect, useState} from "react";
import {Box, Button, Stack, TextInput} from "grommet";
import {Close, Search} from "grommet-icons";

type RequestsSearchBarPropTypes = {
    placeholder: string,
    searchTerm: string | undefined,
    onSearch: (searchTerm: string) => void;
    onCancel: () => void
}

const RequestsSearchBar = ({placeholder, searchTerm = "", onSearch: onSearch0, onCancel: onCancel0}:
                               RequestsSearchBarPropTypes) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(searchTerm)
    }, [searchTerm])

    const onCancel = () => {
        if (searchTerm !== "") {
            setValue("");
            onCancel0();
        }
    }

    const onSearch = () => {
        if (searchTerm !== value) onSearch0(value);
    }

    return <Box width="medium">
        <Stack anchor="right">
            <TextInput
                placeholder={placeholder}
                value={value}
                onChange={(event) => setValue(event.target.value)}/>
            <Box align="center" justify="center" direction="row" background={{color: "brand"}}>
                <Button
                    onClick={onSearch}
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
