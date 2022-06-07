import React from 'react';
import {RadioButtonGroup} from "grommet";

type StatusRequestRadioGroupProps = {
    value: string | undefined,
    onChange: (value: string) => void,
    onCancel: () => void
}

const FilterRadioGroup = (options: string[]) =>
    ({value, onChange: onChange0, onCancel}: StatusRequestRadioGroupProps) => {

        const onChange = (val: string) => {
            val === options[0] ? onCancel() : onChange0(val)
        }

        const getValue = () => value ? value : options[0]

        return <RadioButtonGroup
            name="radio"
            value={getValue()}
            options={options}
            onChange={(event) => onChange(event.target.value)}
            direction="row"
        />
    };

export const StatusRequestRadioGroup = FilterRadioGroup(["Todos", "Pendientes", "Asignados"]);
export const CareerRadioGroup = FilterRadioGroup(["Todos", "TPI", "LI", "Simultaneo"]);