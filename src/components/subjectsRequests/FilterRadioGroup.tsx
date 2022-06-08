import React from 'react';
import {RadioButtonGroup} from "grommet";

type StatusRequestRadioGroupProps = {
    value: string | undefined,
    onChange: (value: string) => void,
    onCancel: () => void
}

const FilterRadioGroup = (name: string, options: string[]) =>
    ({value, onChange: onChange0, onCancel}: StatusRequestRadioGroupProps) => {

        const onChange = (val: string) => {
            val === options[0] ? onCancel() : onChange0(val)
        }

        const getValue = () => value ? value : options[0]

        return <RadioButtonGroup
            name={name}
            value={getValue()}
            options={options}
            onChange={(event) => onChange(event.target.value)}
            direction="row"
        />
    };

export const StatusRequestRadioGroup = FilterRadioGroup("statusRadio", ["Todos", "Pendientes", "Asignados"]);
export const CareerRadioGroup = FilterRadioGroup("careerRadio", ["Todas", "TPI", "LI", "Simultaneo"]);