import {useEffect, useState} from "react";
import {
    Page, PageContent, Box,
    Form, FormField, Select,
    Accordion, AccordionPanel,
    CheckBoxGroup, Button
} from 'grommet';
import toPairs from "lodash/toPairs";
import keys from "lodash/keys";
import {courses} from "../utils/fake-data";
import FormFieldTitle from "../components/FormFieldTitle";

interface Course {
    id: string,
    horario: string,
    materia: string,
    carrera: string
}

interface CoursesForm {
    [subject: string]: Course[]
}

// Algoritmos (01307) - 0/3 seleccionadas
// (Presencial) Martes 18:30 a 21:29 - Jueves 18:30 a 21:29
// ["(Presencial) Martes 18:30 a 21:29 - Jueves 18:30 a 21:29", "(Presencial) Martes 17:30 a 19:29 - Jueves 18:30 a 21:29"


const SubjectsRequest = () => {
    const [career, setCareer] = useState("");

    useEffect(() => {
        setCareer(getCareers()[0])
    }, [])

    const getSubjects = () => toPairs(courses[career])
    const getCareers = () => keys(courses)

    return <Page kind="narrow">
        <PageContent>
            <Box align="stretch" justify="center" direction="column" gap="medium">
                <FormFieldTitle title="Carrera"/>
                <Form>
                    <FormField>
                        <Select
                            value={career}
                            options={getCareers()}
                            onChange={({ option }) => setCareer(option)}/>
                    </FormField>
                </Form>
                <Form<CoursesForm>
                    onSubmit={({value}) => console.log(value)}>
                    <FormFieldTitle title="Materias"/>
                    <Box align="stretch" justify="center" gap="medium">
                        {getSubjects().map(([materia, comisiones], index) =>
                            <Accordion key={index}>
                                <AccordionPanel label={materia}>
                                    <FormField name={materia}>
                                        <CheckBoxGroup
                                            name={materia}
                                            labelKey="horario"
                                            valueKey="id"
                                            options={comisiones}/>
                                    </FormField>
                                </AccordionPanel>
                            </Accordion>)}
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