import {Box, Button, Select} from "grommet";
import {useEffect, useState} from "react";

type SelectionCompProps = {
    placeholder: string,
    options?: string[],
    buttonLabel: string,
    onSubmit: (option: string) => void,
    disabled: boolean
}

const SelectionComp = ({placeholder, options = [], buttonLabel, onSubmit, disabled}: SelectionCompProps) => {
    const [option, setOption] = useState("");

    useEffect(() => {
        setOption(options[0])
    },[options])

    return <Box direction="row-responsive" align="center" gap="medium">
        <Select
            placeholder={placeholder}
            value={option}
            options={options}
            onChange={({ option }) => setOption(option)}
            clear={{label: "Limpiar Selección"}}
        />
        <Button onClick={() => onSubmit(option)}
                label={buttonLabel}
                disabled={!option || disabled}/>
    </Box>
};

export default SelectionComp;
