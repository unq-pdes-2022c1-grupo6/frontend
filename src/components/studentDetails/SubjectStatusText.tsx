import {Text} from "grommet";
import {CourseState} from "../../model/course";

const SubjectStatusText = ({state}: { state: string }) => {

    const getColor = () => {
        let color;
        switch (state) {
            case CourseState.APROBADO:
                color = "status-ok";
                break;
            case CourseState.RECHAZADO:
                color = "status-critical";
                break;
            default:
                color = "status-warning";
                break;
        }
        return color;
    }

    return <Text weight="bold" color={getColor()}>
        {state}
    </Text>

};

export default SubjectStatusText;