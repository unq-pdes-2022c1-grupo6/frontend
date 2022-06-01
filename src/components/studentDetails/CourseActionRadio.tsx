import {Box, Button, RadioButton} from "grommet";
import {Checkmark, Close} from "grommet-icons";
import {ActionsType} from "./SubjectActionButtons";
import {CourseState} from "../../model/course";

interface CourseActionRadioI extends ActionsType{
    value: string,
    checked: boolean,
    onChange: (value: string | undefined) => void
}

const CourseActionRadio = ({value, checked, onChange, state}: CourseActionRadioI) => {

    return state !== CourseState.APROBADO ? <Box align="center" justify="center" direction="row" gap="small">
        <RadioButton
            name="radio"
            value={value}
            checked={checked}
            onChange={({target}) => onChange(target.value)}
        />
        {checked &&
            <Button icon={<Close/>} plain hoverIndicator tip="Cancelar" onClick={() => onChange(undefined)}/>}
        {checked &&
            <Button icon={<Checkmark/>} plain hoverIndicator tip="Aprobar" onClick={() => console.log("Aceptada!")}/>}
    </Box> : null
};

export default CourseActionRadio;