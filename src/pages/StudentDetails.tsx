import React, {useState} from 'react';
import {Page, PageContent, Tabs, Tab, Box} from "grommet";
import StudentInfoDetails from "../components/studentDetails/StudentInfoDetails";
import SubjectsRequestTable, {Course} from "../components/studentDetails/SubjectsRequestTable";
import {CourseState} from "../model/course";
import map from "lodash/map";
import TextAreaForm from "../components/TextAreaForm";
import StudentAcademicRecordTable from "../components/studentDetails/StudentAcademicRecordTable";

const student = {
    nombre: "Nombre Apellido",
    legajo: 423423,
    email: "email@gmail.com",
    dni: 43567884,
    carrera: "SIMULTANEIDAD",

};

const comisiones = [
    [
        {
            id: "1",
            materia: 'Algoritmos',
            comision: '(Presencial) Lunes 18:00 a 22:00',
            sd: 3,
            st: 5,
            estado: 'PENDIENTE',
        },
        {
            id: "2",
            materia: 'Algoritmos',
            comision: '(Presencial) Martes 18:00 a 22:00',
            sd: 4,
            st: 5,
            estado: 'PENDIENTE',
        },
        {
            id: "3",
            materia: 'Algoritmos',
            comision: '(Presencial) Miercoles 18:00 a 22:00',
            sd: 3,
            st: 5,
            estado: 'PENDIENTE',
        }
    ],
    [
        {
            id: "5",
            materia: 'Bases de Datos',
            comision: '(Presencial) Lunes 18:00 a 22:00',
            sd: 0,
            st: 5,
            estado: 'APROBADO',
        },
        {
            id: "7",
            materia: 'Bases de Datos',
            comision: '(Presencial) Martes 18:00 a 22:00',
            sd: 2,
            st: 5,
            estado: 'RECHAZADO',
        }
    ],
    [{
        id: "8",
        materia: 'Aspectos Legales',
        comision: '(Presencial) Lunes 18:00 a 22:00',
        sd: 5,
        st: 5,
        estado: 'RECHAZADO',
    }]
];

const record = [
    {
        "nombreMateria": "Lectura y Escritura Académica",
        "codigoMateria": "80000",
        "estado": "APROBADO",
        "fechaDeCarga": "2022-06-03",
        "cantidadDeVecesCursada": 1
    },
    {
        "nombreMateria": "Elementos de Programación y Lógica",
        "codigoMateria": "80005",
        "estado": "APROBADO",
        "fechaDeCarga": "2022-06-03",
        "cantidadDeVecesCursada": 1
    },
    {
        "nombreMateria": "Matemática",
        "codigoMateria": "8003N",
        "estado": "APROBADO",
        "fechaDeCarga": "2022-06-03",
        "cantidadDeVecesCursada": 1
    }
]


// Si el nuevo estado es aprobado o, es rechazado pero el acumulado no es aprobado, devuelvo el nuevo estado
// Sino devuelvo el estado acumulado
const getSubjectState = (newEstado: string, accEstado: string) => {
    return newEstado === CourseState.APROBADO ||
    (accEstado !== CourseState.APROBADO && newEstado === CourseState.RECHAZADO) ?
        newEstado : accEstado;
}

const getSubjectRow = (subjectCourses: Course[]) => {
    return subjectCourses.reduce((acc: Course, c) => {
        const estado = getSubjectState(c.estado, acc.estado);
        const comision = c.estado === CourseState.APROBADO ? c.comision : acc.comision;
        return {
            estado,
            comision,
            id: c.materia,
            materia: c.materia,
            st: acc.st + c.st,
            sd: acc.sd + c.sd
        };
    }, {id: "", materia: "", estado: CourseState.PENDIENTE, st: 0, sd: 0});
}

const convertToTableData = (request: Course[][]) => {
    return request.map((cr) => {
        const subject = getSubjectRow(cr);
        return {subject, courses: cr}
    });
}


const observations = ` 8Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`

const StudentDetails = () => {
    const data = convertToTableData(comisiones);
    const subjects: string[] = map(data, "subject.materia");
    const [index, setIndex] = useState(0);

    const onUpdateRequest = () => {
    }

    return <Page kind="wide" gap="large" pad="medium">
        <PageContent>
            <StudentInfoDetails information={student}/>
        </PageContent>
        <PageContent>
            <Tabs activeIndex={index}
                  onActive={index => setIndex(index)} justify="start">
                <Tab title="Historia Académica">
                    <Box margin="small">
                        <StudentAcademicRecordTable record={record}/>
                    </Box>
                </Tab>
                <Tab title="Solicitud">
                    <Box margin="small">
                        <SubjectsRequestTable
                            data={data}
                            subjects={subjects}
                            onUpdateRequest={onUpdateRequest}/>
                        <TextAreaForm
                            label="Observaciones"
                            value={observations}
                            onSubmit={onUpdateRequest}/>
                    </Box>
                </Tab>
        </Tabs>
    </PageContent>
</Page>


};

export default StudentDetails;