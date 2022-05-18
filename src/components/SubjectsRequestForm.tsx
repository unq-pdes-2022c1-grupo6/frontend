import {useEffect, useState} from "react";
import {
    Box, Form, FormField,
    Select, Accordion,
    AccordionPanel,
    CheckBoxGroup,
} from 'grommet';
import toPairs from "lodash/toPairs";
import keys from "lodash/keys";
import reduce from "lodash/reduce";
import FormFieldTitle from "./FormFieldTitle";
import FormErrorMessage from "./FormErrorMessage";
import {maxSubjects, requiredSubjects} from "../utils/validators";
import SubmitButton from "./SubmitButton";

export type Course = {
    id: string,
    horario: string,
    materia: string,
    carrera: string
}

export interface SubjectsForm {
    [subject: string]: string[]
}

interface Errors {
    max: string | undefined,
    required: string | undefined
}
// Algoritmos (01307) - 0/3 seleccionadas
// (Presencial) Martes 18:30 a 21:29 - Jueves 18:30 a 21:29
// ["(Presencial) Martes 18:30 a 21:29 - Jueves 18:30 a 21:29", "(Presencial) Martes 17:30 a 19:29 - Jueves 18:30 a 21:29"

//  formulario datos, boton de submit desaparece, courses cambia, onSubmit diferente
//

interface CourseOptions {
    [career: string]: { [subject: string]: Course[] }
}

type SubjectRequestFormProps = {
    subjects?: SubjectsForm,
    coursesOptions: CourseOptions,
    onSubmit?: (sf: SubjectsForm) => void,
}

const SubjectsRequestForm = ({subjects = {}, coursesOptions, onSubmit}: SubjectRequestFormProps) => {
    const editable = onSubmit !== undefined;
    const [career, setCareer] = useState("");
    const [errors, setErrors] = useState<Errors>({max: undefined, required: undefined});
    const [subjectsForm, setSubjectsForm] = useState<SubjectsForm>(subjects);

    useEffect(() => {
        setCareer(getCareers()[0])
        // eslint-disable-next-line
    },[])

    const getSubjects = () => toPairs(coursesOptions[career])
    const getCareers = () => keys(coursesOptions)

    const totalSubjects = (sf: SubjectsForm) => {
        return reduce(sf, (acc, cs, _) => cs.length === 0 ? acc : 1 + acc, 0);
    }

    const getTotalCoursesBySubject = (materia: string) => {
        return subjectsForm[materia]? subjectsForm[materia].length: 0
    }

    const onSubmit0 = (sf: SubjectsForm) => {
        if (!errors.max && !errors.required && onSubmit) {
            onSubmit(sf);
        }
    };

    const onValidate = () => {
        const total = totalSubjects(subjectsForm);
        setErrors((prevState) => ({...prevState, max: maxSubjects(6)(total)}));
        setErrors((prevState) => ({...prevState, required: requiredSubjects(total)}));
    };

    return <Box align="stretch" justify="center" direction="column" gap="medium">
                <FormFieldTitle title="Carrera"/>
                <Form>
                    <FormField>
                        <Select
                            value={career}
                            options={getCareers()}
                            onChange={({ option }) => setCareer(option)}/>
                    </FormField>
                </Form>
                <Form<SubjectsForm>
                    value={subjectsForm}
                    onValidate={() => onValidate()}
                    onChange={value => setSubjectsForm(value)}
                    onSubmit={({value}) => onSubmit0(value)}>
                    <FormFieldTitle title="Materias"/>
                    <Box align="stretch" justify="center" gap="medium">
                        {getSubjects().map(([materia, comisiones], index) =>
                            <Accordion key={index}>
                                <AccordionPanel
                                    label={`${materia} - ${getTotalCoursesBySubject(materia)}/${comisiones.length} selecc.`}>
                                    <FormField name={materia}>
                                        <CheckBoxGroup
                                            disabled={!editable}
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
                    {editable && <SubmitButton label="Solicitar"/>}
                </Form>
            </Box>;

};

export default SubjectsRequestForm;