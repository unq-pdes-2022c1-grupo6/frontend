import {NameValueList, NameValuePair} from "grommet";

type StudentInfoProps = {
    nombre?: string,
    dni?: number,
    legajo?: number,
    carrera?: "TPI" | "LI" | "SIMULTANEIDAD",
    coeficiente?: number,
}

const StudentInfo = ({nombre, dni, legajo, carrera, coeficiente} : StudentInfoProps) => {

    return <NameValueList layout="grid" valueProps={{"width": "small"}} nameProps={{"width": "small"}}
                          pairProps={{"direction": "column"}}>
        {[["DNI", dni], ["Legajo", legajo], ["Nombre y Apellido", nombre],
            ["Carrera", carrera], ["Coeficiente", coeficiente]].map(([name, value]) => {
            return <NameValuePair name={name}>{value || "----"}</NameValuePair>
        })}
    </NameValueList>
};

export default StudentInfo;

