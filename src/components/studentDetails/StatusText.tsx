import {Text} from "grommet";


const ThreeStatesText = ([status1, status2]: [string,string]) =>
    ({state}: { state: string }) => {

    const getColor = () => {
        let color;
        switch (state) {
            case status1:
                color = "status-ok";
                break;
            case status2:
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

export const RequestStatusText = ThreeStatesText(["APROBADO", "RECHAZADO"]);
export const StatusText = ThreeStatesText(["APROBADO", "DESAPROBADO"]);
