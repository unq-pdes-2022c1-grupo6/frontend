
export const availableSubjectsDTO = [
    {
        "codigo": "01035",
        "nombre": "Bases de Datos",
        "comisiones": [
            {
                "id": 1,
                "comision": 1,
                "modalidad": "PRESENCIAL",
                "horarios": [
                    {
                        "dia": "MARTES",
                        "inicio": "10:00",
                        "fin": "12:00"
                    },
                    {
                        "dia": "JUEVES",
                        "inicio": "10:00",
                        "fin": "12:00"
                    }
                ]
            },
            {
                "id": 2,
                "comision": 2,
                "modalidad": "PRESENCIAL",
                "horarios": [
                    {
                        "dia": "LUNES",
                        "inicio": "10:00",
                        "fin": "12:00"
                    },
                    {
                        "dia": "MIERCOLES",
                        "inicio": "10:00",
                        "fin": "12:00"
                    }
                ]
            }
        ]
    }
]

export const DNI = 12345681;

export const requestDTO = {
    "nombre": "Bartolo",
    "dni": 12345677,
    "formulario": {
        "id": 1,
        "dniAlumno": 12345677,
        "solicitudes": [
            {
                "id": 1,
                "estado": "PENDIENTE",
                "comision": {
                    "id": 1,
                    "numero": 1,
                    "materia": "Bases de Datos",
                    "modalidad": "PRESENCIAL",
                    "horarios": [
                        {
                            "dia": "MARTES",
                            "inicio": "10:00",
                            "fin": "12:00"
                        },
                        {
                            "dia": "JUEVES",
                            "inicio": "10:00",
                            "fin": "12:00"
                        }
                    ]
                }
            },
            {
                "id": 2,
                "estado": "PENDIENTE",
                "comision": {
                    "id": 2,
                    "numero": 2,
                    "materia": "Bases de Datos",
                    "modalidad": "PRESENCIAL",
                    "horarios": [
                        {
                            "dia": "LUNES",
                            "inicio": "10:00",
                            "fin": "12:00"
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
        "estado": "ABIERTO"
    },
    "resumenCursadas": []
}

export const requestDTO2 = {
    "nombre": "Bartolo",
    "dni": 12345677,
    "formulario": {
        "id": 1,
        "dniAlumno": 12345677,
        "solicitudes": [
            {
                "id": 0,
                "estado": "PENDIENTE",
                "comision": {
                    "id": 0,
                    "numero": 1,
                    "materia": "Bases de Datos",
                    "modalidad": "PRESENCIAL",
                    "horarios": [
                        {
                            "dia": "MARTES",
                            "inicio": "10:00",
                            "fin": "12:00"
                        },
                        {
                            "dia": "JUEVES",
                            "inicio": "10:00",
                            "fin": "12:00"
                        }
                    ]
                }
            },
            {
                "id": 1,
                "estado": "PENDIENTE",
                "comision": {
                    "id": 1,
                    "numero": 2,
                    "materia": "Bases de Datos",
                    "modalidad": "PRESENCIAL",
                    "horarios": [
                        {
                            "dia": "LUNES",
                            "inicio": "10:00",
                            "fin": "12:00"
                        },
                        {
                            "dia": "MARTES",
                            "inicio": "10:00",
                            "fin": "12:00"
                        },
                        {
                            "dia": "MIERCOLES",
                            "inicio": "10:00",
                            "fin": "12:00"
                        }
                    ]
                }
            },
            {
                "id": 2,
                "estado": "PENDIENTE",
                "comision": {
                    "id": 2,
                    "numero": 1,
                    "materia": "Estrategias de Persistencia",
                    "modalidad": "VIRTUAL",
                    "horarios": [
                        {
                            "dia": "VIERNES",
                            "inicio": "16:00",
                            "fin": "22:00"
                        }
                    ]
                }
            },
            {
                "id": 3,
                "estado": "PENDIENTE",
                "comision": {
                    "id": 3,
                    "numero": 1,
                    "materia": "Matemática I",
                    "modalidad": "PRESENCIAL",
                    "horarios": [
                        {
                            "dia": "LUNES",
                            "inicio": "10:00",
                            "fin": "12:00"
                        },
                        {
                            "dia": "MARTES",
                            "inicio": "10:00",
                            "fin": "12:00"
                        },
                        {
                            "dia": "MIERCOLES",
                            "inicio": "10:00",
                            "fin": "12:00"
                        }
                    ]
                }
            },
            {
                "id": 5,
                "estado": "PENDIENTE",
                "comision": {
                    "id": 5,
                    "numero": 1,
                    "materia": "Algoritmos",
                    "modalidad": "Virtual",
                    "horarios": [
                        {
                            "dia": "MARTES",
                            "inicio": "10:00",
                            "fin": "12:00"
                        },
                        {
                            "dia": "JUEVES",
                            "inicio": "10:00",
                            "fin": "12:00"
                        }
                    ]
                }
            },
            {
                "id": 6,
                "estado": "PENDIENTE",
                "comision": {
                    "id": 6,
                    "numero": 2,
                    "materia": "Algoritmos",
                    "modalidad": "Virtual",
                    "horarios": [
                        {
                            "dia": "LUNES",
                            "inicio": "10:00",
                            "fin": "12:00"
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
        "estado": "ABIERTO"
    },
    "resumenCursadas": []
}


export const requestingStudents = [
    {
        "dni": 59731607,
        "legajo": 73466,
        "nyap": "Stacey Hawkins",
        "carrera": "SIMULTANEO",
        "comisionesSol": 3,
        "materiasSol": 1
    },
    {
        "dni": 31416564,
        "legajo": 80937,
        "nyap": "Gonzalez Barlow",
        "carrera": "SIMULTANEO",
        "comisionesSol": 8,
        "materiasSol": 3
    },
    {
        "dni": 47671977,
        "legajo": 68615,
        "nyap": "Eleanor Coleman",
        "carrera": "TPI",
        "comisionesSol": 9,
        "materiasSol": 1
    },
    {
        "dni": 37596504,
        "legajo": 30261,
        "nyap": "Barbra Lindsey",
        "carrera": "LI",
        "comisionesSol": 8,
        "materiasSol": 1
    },
    {
        "dni": 34935860,
        "legajo": 33501,
        "nyap": "Reba Camacho",
        "carrera": "SIMULTANEO",
        "comisionesSol": 6,
        "materiasSol": 2
    }
]


export const requestedSubjects = [
    {
        "materia": "IPLAX",
        "codigo": 51274,
        "comisiones": 41872,
        "carrera": "SIMULTANEO",
        "cupoDisp": 6,
        "cupoTotal": 12,
        "demanda": 5
    },
    {
        "materia": "DAISU",
        "codigo": 34020,
        "comisiones": 44672,
        "carrera": "LI",
        "cupoDisp": 7,
        "cupoTotal": 13,
        "demanda": 16
    },
    {
        "materia": "QUILITY",
        "codigo": 63173,
        "comisiones": 39613,
        "carrera": "TPI",
        "cupoDisp": 7,
        "cupoTotal": 12,
        "demanda": 20
    },
    {
        "materia": "GEOSTELE",
        "codigo": 49342,
        "comisiones": 31511,
        "carrera": "TPI",
        "cupoDisp": 7,
        "cupoTotal": 14,
        "demanda": 12
    },
    {
        "materia": "FARMAGE",
        "codigo": 62358,
        "comisiones": 53564,
        "carrera": "SIMULTANEO",
        "cupoDisp": 6,
        "cupoTotal": 12,
        "demanda": 7
    },
    {
        "materia": "BESTO",
        "codigo": 44155,
        "comisiones": 50444,
        "carrera": "LI",
        "cupoDisp": 8,
        "cupoTotal": 15,
        "demanda": 15
    },
    {
        "materia": "ISOTRACK",
        "codigo": 68065,
        "comisiones": 63801,
        "carrera": "LI",
        "cupoDisp": 8,
        "cupoTotal": 10,
        "demanda": 1
    }
]