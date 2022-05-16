import {Text} from "grommet";

const FormFieldTitle = ({title}: { title: string }) =>
    <Text color="accent-1" weight="bold" size="medium">
        {title}
    </Text>;

export default FormFieldTitle;