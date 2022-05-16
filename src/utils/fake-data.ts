import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';

const coursesDTO =
    [
        {
            "id": "62826ce9edae7c9983e8374b",
            "horario": "SuPMY 2021-05-09T12:18:26 +03:00",
            "materia": "Bases de Datos",
            "carrera": "TPI - Tecnicatura universitaria en programación informática"
        },
        {
            "id": "62826ce998b44ff1cf85da8b",
            "horario": "FrPMY 2015-11-20T05:36:53 +03:00",
            "materia": "Construcción de Interfaces de Usuario",
            "carrera": "TPI - Tecnicatura universitaria en programación informática"
        },
        {
            "id": "62826ce9b554edd3d10b62a7",
            "horario": "MoPMY 2020-12-14T09:51:24 +03:00",
            "materia": "Construcción de Interfaces de Usuario",
            "carrera": "TPI - Tecnicatura universitaria en programación informática"
        },
        {
            "id": "62826ce901f60d544346ede7",
            "horario": "MoPMY 2015-06-01T03:23:15 +03:00",
            "materia": "Bases de Datos",
            "carrera": "TPI - Tecnicatura universitaria en programación informática"
        },
        {
            "id": "62826ce9ebbd15bee5e81b1b",
            "horario": "FrPMY 2015-07-10T12:41:37 +03:00",
            "materia": "Bases de Datos",
            "carrera": "TPI - Tecnicatura universitaria en programación informática"
        },
        {
            "id": "62826ce9c6a20516f3639863",
            "horario": "MoPMY 2018-02-19T10:09:27 +03:00",
            "materia": "Matematica I",
            "carrera": "TPI - Tecnicatura universitaria en programación informática"
        },
        {
            "id": "62826ce9d3edaf80ab360ca4",
            "horario": "FrAMY 2018-06-15T06:12:23 +03:00",
            "materia": "Matematica I",
            "carrera": "TPI - Tecnicatura universitaria en programación informática"
        },
        {
            "id": "62826ce9aa354f8e3eecb6d5",
            "horario": "WePMY 2015-04-15T08:42:48 +03:00",
            "materia": "Bases de Datos",
            "carrera": "TPI - Tecnicatura universitaria en programación informática"
        },
        {
            "id": "62826ce9f07dd28d64e67c39",
            "horario": "SuAMY 2021-06-27T03:54:26 +03:00",
            "materia": "Construcción de Interfaces de Usuario",
            "carrera": "TPI - Tecnicatura universitaria en programación informática"
        },
        {
            "id": "62826ce9b55ac1e1983d90f3",
            "horario": "FrAMY 2021-10-01T11:42:44 +03:00",
            "materia": "Construcción de Interfaces de Usuario",
            "carrera": "TPI - Tecnicatura universitaria en programación informática"
        },
        {
            "id": "62826ce9a2cd4f6fe2db8092",
            "horario": "FrAMY 2016-03-25T12:12:33 +03:00",
            "materia": "Construcción de Interfaces de Usuario",
            "carrera": "TPI - Tecnicatura universitaria en programación informática"
        },
        {
            "id": "62826d549014142a3f6c8279",
            "horario": "TuPMY 2015-10-13T10:49:22 +03:00",
            "materia": "Arquitectura de Software II",
            "carrera": "LI - Licenciatura en informática"
        },
        {
            "id": "62826d54c6f52c10ce944d46",
            "horario": "ThPMY 2020-05-07T03:48:51 +03:00",
            "materia": "Algoritmos",
            "carrera": "LI - Licenciatura en informática"
        },
        {
            "id": "62826d540d335a610e8d31a4",
            "horario": "SaAMY 2016-07-23T01:28:59 +03:00",
            "materia": "Algoritmos",
            "carrera": "LI - Licenciatura en informática"
        },
        {
            "id": "62826d543dcd9ca523b50a63",
            "horario": "TuAMY 2016-08-02T11:11:49 +03:00",
            "materia": "Algoritmos",
            "carrera": "LI - Licenciatura en informática"
        },
        {
            "id": "62826d5401e6793567920c25",
            "horario": "WePMY 2019-05-08T06:58:46 +03:00",
            "materia": "Arquitectura de Software II",
            "carrera": "LI - Licenciatura en informática"
        },
        {
            "id": "62826d543b55f7d7ef3ffc02",
            "horario": "FrAMY 2014-09-05T06:25:17 +03:00",
            "materia": "Algoritmos",
            "carrera": "LI - Licenciatura en informática"
        }
    ]

export const courses = mapValues(groupBy(coursesDTO, 'carrera'), materias => groupBy(materias, 'materia'));