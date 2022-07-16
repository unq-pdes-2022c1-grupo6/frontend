import {NameValueList, NameValuePair} from "grommet";

type StudentInfoProps = {
    nombre?: string,
    dni?: number,
    carrera?: "P" | "W" | "PW",
}

const StudentInfo = ({nombre, dni, carrera}: StudentInfoProps) => {

    return <NameValueList layout="grid" valueProps={{"width": "small"}} nameProps={{"width": "small"}}
                          pairProps={{"direction": "column"}}>
        <NameValuePair name="DNI">{dni || "----"}</NameValuePair>
        <NameValuePair name="Solo Nombre">{nombre || "----"}</NameValuePair>
        <NameValuePair name="Carrera">{carrera || "----"}</NameValuePair>
    </NameValueList>
};

export default StudentInfo;

