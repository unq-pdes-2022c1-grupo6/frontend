import {useState} from "react";
import {Box, Button, RadioButton} from "grommet";
import {Checkmark, Close} from "grommet-icons";
import {ActionsType} from "./SubjectActionButtons";
import {CourseState} from "../../model/course";

const CourseActionRadio = ({state}: ActionsType) => {
    const [selected, setSelected] = useState("");

    return state !== CourseState.APROBADO ? <Box align="center" justify="center" direction="row" gap="small">
        <RadioButton
            name="radio"
            value="selected"
            checked={selected === 'selected'}
            onChange={({target}) => setSelected(target.value)}
        />
        {selected === 'selected' &&
            <Button icon={<Close/>} plain hoverIndicator tip="Cancelar" onClick={() => setSelected("")}/>}
        {selected === 'selected' &&
            <Button icon={<Checkmark/>} plain hoverIndicator tip="Aprobar" onClick={() => console.log("Aceptada!")}/>}
    </Box> : null
};

export default CourseActionRadio;