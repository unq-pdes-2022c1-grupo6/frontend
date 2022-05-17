import {useEffect, useState} from "react";
import {
    Page, PageContent, Box,
    Form, FormField, Select,
    Accordion, AccordionPanel,
    CheckBoxGroup, Button
} from 'grommet';
import toPairs from "lodash/toPairs";
import keys from "lodash/keys";
import reduce from "lodash/reduce";
import {courses} from "../utils/fake-data";
import FormFieldTitle from "../components/FormFieldTitle";
import FormErrorMessage from "../components/FormErrorMessage";
import {maxSubjects, requiredSubjects} from "../utils/validators";

// interface Course {
//     id: string,
//     horario: string,
//     materia: string,
//     carrera: string
// }

interface CoursesForm {
    [subject: string]: string[]
}

interface Errors {
    max: string | undefined,
    required: string | undefined
}
// Algoritmos (01307) - 0/3 seleccionadas
// (Presencial) Martes 18:30 a 21:29 - Jueves 18:30 a 21:29
// ["(Presencial) Martes 18:30 a 21:29 - Jueves 18:30 a 21:29", "(Presencial) Martes 17:30 a 19:29 - Jueves 18:30 a 21:29"


const SubjectsRequest = () => {
    const [career, setCareer] = useState("");
    const [errors, setErrors] = useState<Errors>({max: undefined, required: undefined});
    const [coursesForm, setCoursesForm] = useState<CoursesForm>({});

    useEffect(() => {
        setCareer(getCareers()[0])
    }, [])

    const getSubjects = () => toPairs(courses[career])
    const getCareers = () => keys(courses)

    const totalSubjects = (csf: CoursesForm) => {
        return reduce(csf, (acc, cs, _) => cs.length === 0 ? acc : 1 + acc, 0);
    }

    const getTotalCoursesBySubject = (materia: string) => {
        return coursesForm[materia]? coursesForm[materia].length: 0
    }

    const onSubmit = (csf: CoursesForm) => {
        if (!errors.max && !errors.required) {
            console.log(csf)
        }
    };

    const onValidate = () => {
        const total = totalSubjects(coursesForm);
        setErrors((prevState) => ({...prevState, max: maxSubjects(6)(total)}));
        setErrors((prevState) => ({...prevState, required: requiredSubjects(total)}));
    };

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
                    onValidate={() => onValidate()}
                    onChange={value => setCoursesForm(value)}
                    onSubmit={({value}) => onSubmit(value)}>
                    <FormFieldTitle title="Materias"/>
                    <Box align="stretch" justify="center" gap="medium">
                        {getSubjects().map(([materia, comisiones], index) =>
                            <Accordion key={index}>
                                <AccordionPanel
                                    label={`${materia} - ${getTotalCoursesBySubject(materia)}/${comisiones.length} selecc.`}>
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
                    <FormErrorMessage message={errors.max}/>
                    <FormErrorMessage message={errors.required}/>
                    <Box align="center" justify="center" direction="row" gap="medium" pad="medium">
                        <Button label="Solicitar" type="submit" primary/>
                    </Box>
                </Form>
            </Box>
        </PageContent>
    </Page>;

};

export default SubjectsRequest;