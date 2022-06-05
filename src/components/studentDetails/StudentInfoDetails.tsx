import {NameValueList, NameValuePair} from "grommet";

type StudentInfoDetailsProps = {
    information: {
        nombre: string,
        legajo: number,
        email: string,
        dni: number,
        carrera: string,
    }
}

const StudentInfoDetails = ({information: {nombre, legajo, email, dni, carrera}}
                                : StudentInfoDetailsProps) => {

    return <NameValueList layout="grid" valueProps={{"width": "small"}} nameProps={{"width": "small"}}
                          pairProps={{"direction": "column"}}>
        <NameValuePair name="DNI">{dni}</NameValuePair>
        <NameValuePair name="Legajo">{legajo}</NameValuePair>
        <NameValuePair name="Email">{email}</NameValuePair>
        <NameValuePair name="Nombre y Apellido">{nombre}</NameValuePair>
        <NameValuePair name="Carrera/s">{carrera}</NameValuePair>
    </NameValueList>
};

export default StudentInfoDetails;