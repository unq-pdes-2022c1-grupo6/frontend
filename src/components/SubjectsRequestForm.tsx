import {useState} from "react";
import {
    Box, Form, FormField,
    Select, Accordion,
    AccordionPanel,
    CheckBoxGroup,
} from 'grommet';
import map from "lodash/map";
import keys from "lodash/keys";
import reduce from "lodash/reduce";
import FormFieldTitle from "./FormFieldTitle";
import FormErrorMessage from "./FormErrorMessage";
import {maxSubjects, requiredSubjects} from "../utils/validators";
import SubmitButton from "./SubmitButton";
import {AvailableSubjects, RequestForm} from "../services/subjectsRequestService";


type SubjectRequestFormProps = {
    requestForm?: RequestForm,
    availableSubjects: { [career: string]: AvailableSubjects },
    onSubmit?: (sf: RequestForm) => void,
}

interface Errors {
    max: string | undefined,
    required: string | undefined
}

const SubjectsRequestForm = ({requestForm = {}, availableSubjects, onSubmit}: SubjectRequestFormProps) => {
    const getCareers = () => keys(availableSubjects)
    const editable = onSubmit !== undefined;

    const [career, setCareer] = useState(getCareers()[0]);
    const [errors, setErrors] = useState<Errors>({max: undefined, required: undefined});
    const [subjectsForm, setSubjectsForm] = useState<RequestForm>(requestForm);

    const getSubjects = () => availableSubjects[career]

    const totalSubjects = (rf: RequestForm) => {
        return reduce(rf, (acc, cs, _) => cs.length === 0 ? acc : 1 + acc, 0);
    }

    const getTotalCoursesBySubject = (materia: string) => {
        return subjectsForm[materia] ? subjectsForm[materia].length : 0
    }

    const onSubmit0 = (rf: RequestForm) => {
        const total = totalSubjects(rf);
        const newErrors = {required: requiredSubjects(total), max: maxSubjects(5)(total)};
        setErrors(newErrors);
        if (!newErrors.max && !newErrors.required && onSubmit) {
            onSubmit(rf);
        }
    };

    return <Box align="stretch" justify="center" direction="column" gap="medium">
        <FormFieldTitle title="Carrera"/>
        <Form>
            <FormField>
                <Select
                    value={career}
                    options={getCareers()}
                    onChange={({option}) => setCareer(option)}/>
            </FormField>
        </Form>
        <Form<RequestForm>
            value={subjectsForm}
            onChange={value => setSubjectsForm(value)}
            onSubmit={({value}) => onSubmit0(value)}>
            <FormFieldTitle title="Materias"/>
            <Box align="stretch" justify="center" gap="medium">
                {map(getSubjects(), (courses, subject) =>
                    <Accordion key={subject}>
                        <AccordionPanel
                            label={`${subject} - ${getTotalCoursesBySubject(subject)}/${courses.length} selecc.`}>
                            <FormField name={subject}>
                                <CheckBoxGroup
                                    disabled={!editable}
                                    name={subject}
                                    labelKey="description"
                                    valueKey="id"
                                    options={courses}/>
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