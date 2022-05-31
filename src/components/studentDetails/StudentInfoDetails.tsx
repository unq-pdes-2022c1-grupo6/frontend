import {NameValueList, NameValuePair} from "grommet";

type StudentInfoDetailsProps = {
    information: {
        nombre: string,
        dni: number,
        carrera: string,
        coeficiente: string,
        materiasHechas: string
    }
}

const StudentInfoDetails = ({information: {nombre, dni, carrera, coeficiente, materiasHechas}}
                                : StudentInfoDetailsProps) => {

    return <NameValueList layout="grid" valueProps={{"width": "small"}} nameProps={{"width": "small"}}
                          pairProps={{"direction": "column"}}>
        <NameValuePair name="Nombre y Apellido">{nombre}</NameValuePair>
        <NameValuePair name="DNI">{dni}</NameValuePair>
        <NameValuePair name="Carrera/s">{carrera}</NameValuePair>
        <NameValuePair name="Coeficiente">{coeficiente}</NameValuePair>
        <NameValuePair name="Materias Hechas">{materiasHechas}</NameValuePair>
    </NameValueList>
};

export default StudentInfoDetails;