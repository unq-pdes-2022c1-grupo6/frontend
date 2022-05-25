import {useState} from "react";
import {
    Box, Form, FormField,
    Select, Accordion,
    AccordionPanel,
    CheckBoxGroup,
} from 'grommet';
import FormFieldTitle from "../FormFieldTitle";
import FormErrorMessage from "../FormErrorMessage";
import {maxSubjects, requiredSubjects} from "../../utils/validators";
import SubmitButton from "../SubmitButton";
import {
    getCareers,
    getFirstCareer,
    getSubjectsByCareer, getTotalCourses, getTotalSelectedCourses,
    mapToId,
    totalSubjects
} from "../../model/subject";
import {SelectedCourses, Subject} from "../../services/subjectDTO";


type SubjectRequestFormProps = {
    selectedCourses?: SelectedCourses,
    subjectsOptions: Subject[],
    onSubmit?: (ss: SelectedCourses) => void,
}

interface Errors {
    max: string | undefined,
    required: string | undefined
}

const SubjectsRequestForm = ({selectedCourses = {}, subjectsOptions, onSubmit}: SubjectRequestFormProps) => {
    const editable = Boolean(onSubmit);

    const [activeIndex, setActiveIndex] = useState([0]);
    const [career, setCareer] = useState(getFirstCareer(subjectsOptions));
    const [errors, setErrors] = useState<Errors>({max: undefined, required: undefined});
    const [selectedCourses0, setSelectedCourses0] = useState<SelectedCourses>(selectedCourses);

    const subjectLabel = (subject: Subject) => {
        const selectedInfo = editable ? ` ${getTotalSelectedCourses(selectedCourses0, subject.nombre)}/` : "";
        return `${subject.nombre} (${subject.codigo}) - ${selectedInfo}${getTotalCourses(subject)} selecc.`
    }

    const onSubmit0 = (ss: SelectedCourses) => {
        const total = totalSubjects(ss);
        const newErrors = {required: requiredSubjects(total), max: maxSubjects(5)(total)};
        setErrors(newErrors);
        if (!newErrors.max && !newErrors.required && onSubmit) {
            onSubmit(ss);
        }
    };

    return <Box align="stretch" justify="center" direction="column" gap="medium">
        <FormFieldTitle title="Carrera"/>
        <Form>
            <FormField>
                <Select
                    value={getFirstCareer(subjectsOptions)}
                    options={getCareers(subjectsOptions)}
                    onChange={({option}) => setCareer(option)}/>
            </FormField>
        </Form>
        <Form<SelectedCourses>
            value={selectedCourses0}
            onChange={value => setSelectedCourses0(value)}
            onSubmit={({value}) => onSubmit0(value)}>
            <FormFieldTitle title="Materias"/>
            <Box align="stretch" justify="center" gap="medium">
                <Accordion
                    activeIndex={activeIndex}
                    onActive={(newActiveIndex) => setActiveIndex(newActiveIndex)}
                    multiple>
                    {getSubjectsByCareer(subjectsOptions, career).map((subject, index) =>
                        <AccordionPanel
                            key={index}
                            label={subjectLabel(subject)}>
                            <FormField name={subject.nombre}>
                                <CheckBoxGroup
                                    disabled={!editable}
                                    name={subject.nombre}
                                    labelKey="description"
                                    valueKey="id"
                                    options={mapToId(subject.comisiones)}/>
                            </FormField>
                        </AccordionPanel>)}
                </Accordion>
            </Box>
            <FormErrorMessage message={errors.max}/>
            <FormErrorMessage message={errors.required}/>
            {editable && <SubmitButton label="Solicitar"/>}
        </Form>
    </Box>;

};

export default SubjectsRequestForm;