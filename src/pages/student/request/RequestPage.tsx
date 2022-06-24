import {Heading, Page, PageContent, Text} from "grommet";
import {formatSubjectCourse} from "../../../services/dtos/subjectDTO";
import {RequestStatusText} from "../../../components/studentDetails/StatusText";
import {EnrolledCourse, RequestCourseDTO, RequestDTO} from "../../../services/dtos/requestDTO";
import sortBy from "lodash/sortBy";
import GenericTable from "../../../components/GenericTable";

const formulario: RequestDTO = {
    "id": 5,
    "dniAlumno": 45678900,
    "solicitudes": [
        {
            "id": 7,
            "estado": "RECHAZADO",
            "comision": {
                "id": 6,
                "numero": 2,
                "materia": "Introducción a la Programación",
                "modalidad": "PRESENCIAL",
                "sobrecuposTotales": 5,
                "sobrecuposDisponibles": 5,
                "horarios": [
                    {
                        "dia": "LUNES",
                        "inicio": "09:00",
                        "fin": "11:00"
                    },
                    {
                        "dia": "JUEVES",
                        "inicio": "18:00",
                        "fin": "22:00"
                    }
                ]
            }
        },
        {
            "id": 8,
            "estado": "RECHAZADO",
            "comision": {
                "id": 7,
                "numero": 1,
                "materia": "Organización de las Computadoras",
                "modalidad": "PRESENCIAL",
                "sobrecuposTotales": 5,
                "sobrecuposDisponibles": 5,
                "horarios": [
                    {
                        "dia": "LUNES",
                        "inicio": "09:00",
                        "fin": "11:00"
                    },
                    {
                        "dia": "MIERCOLES",
                        "inicio": "10:00",
                        "fin": "12:00"
                    }
                ]
            }
        }
    ],
    "estado": "CERRADO",
    "comisionesInscripto": [
        {
            "id": 5,
            "numero": 1,
            "materia": "Introducción a la Programación",
            "cuposTotales": 30,
            "sobreCuposTotales": 5,
            "cuposDisponibles": 5,
            "horarios": [
                {
                    "dia": "MARTES",
                    "inicio": "18:00",
                    "fin": "20:00"
                },
                {
                    "dia": "JUEVES",
                    "inicio": "18:00",
                    "fin": "22:00"
                }
            ]
        }]
}


const RequestPage = () => {

    const requestedCourses = sortBy(formulario.solicitudes, ["comision.materia", "comision.numero"]);

    const enrolledCourses = sortBy(formulario.comisionesInscripto, ["materia", "numero"]);

    return <Page kind="narrow" margin={{vertical: "medium"}}>
        <PageContent gap="medium" justify="center">
            <Heading level={3} size="medium">
                {`Solicitud Estado: ${formulario.estado}`}
            </Heading>
            <GenericTable<RequestCourseDTO>
                data={requestedCourses}
                columns={[
                    {label: 'Materia', format: (c) => <Text>{c.comision.materia}</Text>},
                    {label: 'Comisión', format: (c) => <Text>
                            {formatSubjectCourse(c.comision.numero, c.comision.modalidad, c.comision.horarios)}
                    </Text>},
                    {label: 'Estado', format: (c) => <RequestStatusText state={c.estado}/>},
                ]}
            />
            <Heading level={4} size="medium" margin={{top: "medium", bottom: "xxsmall"}}>
                Comisiones Inscriptas por el Guaraní
            </Heading>
            <GenericTable<EnrolledCourse>
                data={enrolledCourses}
                columns={[
                    {label: 'Materia', format: (c) => <Text>{c.materia}</Text>},
                    {label: 'Comisión', format: (c) =>
                            <Text>{formatSubjectCourse(c.numero, undefined, c.horarios)}</Text>}
                ]}
            />
        </PageContent>
    </Page>

};

export default RequestPage;
