import {
    Page, PageContent, Box,
    Form, FormField, Select,
    Text, Accordion, AccordionPanel,
    CheckBoxGroup, Button
} from 'grommet'

const SubjectsRequest = () => {

    return <Page kind="narrow">
        <PageContent>
            <Box align="stretch" justify="center" direction="column" gap="medium">
                <Text color="accent-1" weight="bold" size="medium">
                    Carreras
                </Text>
                <Form>
                    <FormField>
                        <Select
                            options={["TPI - Tecnicatura universitaria en programación informática", "LI - Licenciatura en informática"]}
                            value="TPI - Tecnicatura universitaria en programación informática"/>
                    </FormField>
                </Form>
                <Form>
                    <Text color="accent-1" weight="bold" size="medium">
                        Materias
                    </Text>
                    <Box align="stretch" justify="center" gap="medium">
                        <Accordion>
                            <AccordionPanel
                                label="Algoritmos (01307) - 0/3 seleccionadas"
                            >
                                <FormField>
                                    <CheckBoxGroup
                                        options={["(Presencial) Martes 18:30 a 21:29 - Jueves 18:30 a 21:29", "(Presencial) Martes 17:30 a 19:29 - Jueves 18:30 a 21:29"]}/>
                                </FormField>
                            </AccordionPanel>
                        </Accordion>
                        <Accordion>
                            <AccordionPanel label="Algoritmos (01307) - 0/3 seleccionadas">
                                <FormField>
                                    <CheckBoxGroup
                                        options={["(Presencial) Martes 18:30 a 21:29 - Jueves 18:30 a 21:29", "(Presencial) Martes 17:30 a 19:29 - Jueves 18:30 a 21:29"]}/>
                                </FormField>
                            </AccordionPanel>
                        </Accordion>
                        <Accordion>
                            <AccordionPanel label="Algoritmos (01307) - 0/3 seleccionadas">
                                <FormField>
                                    <CheckBoxGroup
                                        options={["(Presencial) Martes 18:30 a 21:29 - Jueves 18:30 a 21:29", "(Presencial) Martes 17:30 a 19:29 - Jueves 18:30 a 21:29"]}/>
                                </FormField>
                            </AccordionPanel>
                        </Accordion>
                    </Box>
                    <Box align="center" justify="center" direction="row" gap="medium" pad="medium">
                        <Button label="Solicitar" type="submit" primary/>
                    </Box>
                </Form>
            </Box>
        </PageContent>
    </Page>;

};

export default SubjectsRequest;