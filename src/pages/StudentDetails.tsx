import React from 'react';
import {Page, PageContent} from "grommet";
import StudentInfoDetails from "../components/studentDetails/StudentInfoDetails";
import SubjectsRequestTable from "../components/studentDetails/SubjectsRequestTable";

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
            materia: '(TPI) Algoritmos',
            comision: '(Presencial) Lunes 18:00 a 22:00',
            sd: 3,
            st: 5,
            estado: 'PENDIENTE',
        },
        {
            id: "2",
            materia: '(TPI) Algoritmos',
            comision: '(Presencial) Martes 18:00 a 22:00',
            sd: 4,
            st: 5,
            estado: 'PENDIENTE',
        },
        {
            id: "3",
            materia: '(TPI) Algoritmos',
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


const StudentDetails = () => {

    const onUpdateRequest = () => {
    }

    return <Page kind="wide">
        <PageContent>
            <StudentInfoDetails information={student}/>
        </PageContent>
        <PageContent>
            <SubjectsRequestTable request={comisiones} onUpdateRequest={onUpdateRequest}/>
        </PageContent>
    </Page>


};

export default StudentDetails;