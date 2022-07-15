import {useState} from "react";
import {
    Accordion,
    AccordionPanel,
    Box,
    Button,
    CheckBoxGroup,
    CheckBoxProps,
    Page,
    PageContent,
    Paragraph,
    Text
} from "grommet";
import {formatSubjectCourse, SubjectDTO} from "../../services/dtos/subjectDTO";
import {RequestFormType} from "../../services/requestService";
import LoadingButton from "../LoadingButton";

type RequestFormProps = {
    selections: RequestFormType;
    options?: SubjectDTO[],
    loading: boolean,
    onSubmit: (selections: RequestFormType) => void,
    onCancel: () => void
}


const RequestForm = ({selections, options = [], loading, onSubmit, onCancel}: RequestFormProps) => {
    const creating = selections[0].size === 0 && selections[1].size === 0;
    const [selectionsG, setSelectionsG] = useState(selections[0]);
    const [selectionsS, setSelectionsS] = useState(selections[1]);
    const requestForm: RequestFormType = [selectionsG, selectionsS];
    const [openedAccordions, setOpenedAccordions] = useState([0]);


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
            <Paragraph fill>
                Elija las comisiones que <b>pueda cursar este cuatrimestre</b>. Puede elegir <b>más de una comisión</b> en una misma
                materia. También, confirme <b>las comisiones inscriptas por el Guaraní</b>. Serán usadas para chequear conflicto
                de horarios y serán verificadas en el sistema de Guaraní.
            </Paragraph>
            <Text color="neutral-1"> G: Comisiones inscriptas por el Guaraní S: Comisiones solicitando sobrecupo </Text>
            <Box gap="medium">
                <Accordion
                    activeIndex={openedAccordions}
                    onActive={(newActiveIndex) => setOpenedAccordions(newActiveIndex)}
                    multiple
                    gap="medium">
                    {options.map((m) => {
                        return <AccordionPanel label={`${m.nombre} (${m.codigo})`} key={m.codigo}>
                            <Box height="small" gap="medium" overflow="auto" pad={{vertical: "small"}}>
                                {m.comisiones.map(c => {
                                    return <Box direction="row" align="center" gap="medium" key={c.id}>
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
                {options &&
                <Box direction="row" justify="center" gap="large">
                    <LoadingButton onClick={() => onSubmit(requestForm)}
                                   loading={loading}
                                   label={creating? "Crear": "Editar"}
                                   primary/>
                    <Button disabled={loading} label="Cancelar" onClick={onCancel}/>
                </Box>}
            </Box>
        </PageContent>
    </Page>

};

export default RequestForm;
