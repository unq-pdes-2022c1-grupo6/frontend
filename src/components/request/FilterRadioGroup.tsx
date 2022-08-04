import React from 'react';
import {RadioButtonGroup} from "grommet";

type StatusRequestRadioGroupProps = {
    value: string | undefined,
    onChange: (value: string) => void,
    onCancel: () => void,
    name?: string
}

const FilterRadioGroup = (options: string[]) =>
    // eslint-disable-next-line
    ({value, onChange: onChange0, onCancel, name}: StatusRequestRadioGroupProps) => {

        const getValue = () => value ? value : options[0]

        const onChange = (val: string) => {
            if (val !== getValue()) {
                val === options[0] ? onCancel() : onChange0(val)
            }
        }

        const getOptions = () => {
            return options.map(o => ({label: o, value: o, id: (name || "radio") + o}))
        }

        return <RadioButtonGroup
            name={name || "radio"}
            value={getValue()}
            options={getOptions()}
            onChange={(event) => onChange(event.target.value)}
            direction="row-responsive"
        />
    };


export const StatusRadioGroup = FilterRadioGroup(["Todas", "Todas Pendientes", "Alguna Pendiente", "Solo Aprobadas y Rechazadas"]);

export const RequestersRadioGroup = FilterRadioGroup(["Todos", "Pendientes", "Aprobados o Rechazados"]);