import {NameValueList, NameValuePair} from "grommet";

type StudentInfoProps = {
    nombre?: string,
    dni?: number,
    legajo?: number,
    carrera?: "TPI" | "LI" | "SIMULTANEIDAD",
    coeficiente?: number,
}

const StudentInfo = ({nombre, dni, legajo, carrera, coeficiente}: StudentInfoProps) => {

    return <NameValueList layout="grid" valueProps={{"width": "small"}} nameProps={{"width": "small"}}
                          pairProps={{"direction": "column"}}>
        <NameValuePair name="DNI">{dni || "----"}</NameValuePair>
        <NameValuePair name="Legajo">{legajo || "----"}</NameValuePair>
        <NameValuePair name="Nombre y Apellido">{nombre || "----"}</NameValuePair>
        <NameValuePair name="Carrera">{carrera || "----"}</NameValuePair>
        <NameValuePair name="Coeficiente">{coeficiente || "----"}</NameValuePair>
    </NameValueList>
};

export default StudentInfo;

