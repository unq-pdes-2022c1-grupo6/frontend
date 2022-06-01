import React from 'react';
import {Page, PageContent} from "grommet";
import StudentInfoDetails from "../components/studentDetails/StudentInfoDetails";
import SubjectsRequestTable, {Course} from "../components/studentDetails/SubjectsRequestTable";
import {CourseState} from "../model/course";
import map from "lodash/map";

const student = {
    nombre: "Nombre Apellido",
    dni: 43567884,
    carrera: "SIMULTANEIDAD",
    coeficiente: "TPI 8.12 - LI 7.12",
    materiasHechas: "TPI 10 - LI 8"
};

const comisiones = [
    [
        {
            id: "1",
            materia: 'TPI-Algoritmos',
            comision: '(Presencial) Lunes 18:00 a 22:00',
            sd: 3,
            st: 5,
            estado: 'PENDIENTE',
        },
        {
            id: "2",
            materia: 'TPI-Algoritmos',
            comision: '(Presencial) Martes 18:00 a 22:00',
            sd: 4,
            st: 5,
            estado: 'PENDIENTE',
        },
        {
            id: "3",
            materia: 'TPI-Algoritmos',
            comision: '(Presencial) Miercoles 18:00 a 22:00',
            sd: 3,
            st: 5,
            estado: 'PENDIENTE',
        }
    ],
    [
        {
            id: "5",
            materia: 'LI-Bases de Datos',
            comision: '(Presencial) Lunes 18:00 a 22:00',
            sd: 0,
            st: 5,
            estado: 'PENDIENTE',
        },
        {
            id: "7",
            materia: 'LI-Bases de Datos',
            comision: '(Presencial) Martes 18:00 a 22:00',
            sd: 2,
            st: 5,
            estado: 'PENDIENTE',
        }
    ],
    [{
        id: "8",
        materia: 'LI-Aspectos Legales',
        comision: '(Presencial) Lunes 18:00 a 22:00',
        sd: 5,
        st: 5,
        estado: 'PENDIENTE',
    }]
];


// Si el nuevo estado es aprobado o, es rechazado pero el acumulado no es aprobado, devuelvo el nuevo estado
// Sino devuelvo el estado acumulado
const getSubjectState = (newEstado: string, accEstado: string) => {
    return  newEstado === CourseState.APROBADO ||
    (accEstado !== CourseState.APROBADO && newEstado === CourseState.RECHAZADO)?
    newEstado: accEstado;
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
            sd: acc.sd + c.sd};
    }, {id: "", materia: "", estado: CourseState.PENDIENTE, st: 0, sd: 0});
}

const convertToTableData = (request: Course[][]) => {
    return request.map((cr) => {
        const subject = getSubjectRow(cr);
        return {subject, courses: cr}
    });
}

const StudentDetails = () => {
    const data = convertToTableData(comisiones);
    const subjects: string[] = map(data, "subject.materia");

    const onUpdateRequest = () => {
    }

    return <Page kind="wide" gap="medium" pad="medium">
        <PageContent>
            <StudentInfoDetails information={student}/>
        </PageContent>
        <PageContent>
            <SubjectsRequestTable
                data={data}
                subjects={subjects}
                onUpdateRequest={onUpdateRequest}/>
        </PageContent>
    </Page>


};

export default StudentDetails;