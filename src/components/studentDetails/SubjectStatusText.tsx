import {Text} from "grommet";

const SubjectStatusText = ({state}: { state: string | undefined }) => {
    return !state ?
        <Text color={state === "Aprobado" ? "status-ok" : "status-critical"}>
            {state}
        </Text> : null

};

export default SubjectStatusText;