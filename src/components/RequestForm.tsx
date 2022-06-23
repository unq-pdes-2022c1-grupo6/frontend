import {useState} from "react";
import {Accordion, AccordionPanel, Box, Button, CheckBoxGroup, CheckBoxProps, Page, PageContent, Text} from "grommet";
import {formatSubjectCourse, SubjectDTO} from "../services/dtos/subjectDTO";
import {RequestFormType} from "../services/requestService";
import LoadingButton from "./LoadingButton";

type RequestFormProps = {
    selections: RequestFormType;
    options?: SubjectDTO[],
    loading: boolean,
    onSubmit: (selections: RequestFormType) => void,
    onCancel: () => void
}


const RequestForm = ({selections, options = [], loading, onSubmit, onCancel}: RequestFormProps) => {
    const first = selections[0].size === 0 && selections[1].size === 0;
    const [selectionsG, setSelectionsG] = useState(selections[0]);
    const [selectionsS, setSelectionsS] = useState(selections[1]);
    const requestForm: RequestFormType = [selectionsG, selectionsS];

    const getSelection = (id: number) => {
        const selecG = selectionsG.has(id) ? ["G"] : undefined
        const selecS = selectionsS.has(id) ? ["S"] : undefined
        return selecG || selecS || []
    }

    const setSelection = (option: string | CheckBoxProps, id: number) => {
        if (typeof option !== "string") {
            const [setAdd, setDelete] = option.label === "G" ? [setSelectionsG, setSelectionsS] : [setSelectionsS, setSelectionsG];
            setAdd(prevState => {
                const newState = new Set(prevState);
                newState.has(id) ? newState.delete(id) : newState.add(id)
                return newState
            });
            setDelete(prevState => {
                const newState = new Set(prevState);
                newState.delete(id);
                return newState
            })
        }
    }

    return <Page kind="narrow" margin={{vertical: "medium"}}>
        <PageContent gap="medium" justify="center">
            <Text> G: Comisiones inscriptas por el Guaraní S: Comisiones solicitando sobrecupo </Text>
            <Box gap="medium">
                <Accordion multiple gap="medium">
                    {options.map((m) => {
                        return <AccordionPanel label={`${m.nombre} (${m.codigo})`} key={m.codigo}>
                            <Box height="xsmall">
                                {m.comisiones.map(c => {
                                    return <Box direction="row" gap="medium" margin={{vertical: "small"}} key={c.id}>
                                        <CheckBoxGroup
                                            name="radio"
                                            direction="row"
                                            options={["G", "S"]}
                                            value={getSelection(c.id)}
                                            onChange={(event) => event && setSelection(event.option, c.id)}/>
                                        <Text>{formatSubjectCourse(c.comision, c.modalidad, c.horarios)}</Text>
                                    </Box>
                                })}
                            </Box>
                        </AccordionPanel>
                    })}
                </Accordion>
                <Box direction="row" justify="center" gap="large">
                    <LoadingButton onClick={() => onSubmit(requestForm)}
                                   loading={loading}
                                   label={first? "Crear": "Editar"}
                                   primary/>
                    <Button disabled={loading} label="Cancelar" onClick={onCancel}/>
                </Box>
            </Box>
        </PageContent>
    </Page>

};

export default RequestForm;
