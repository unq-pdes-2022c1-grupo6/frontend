
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

export const DNI = 12345678;

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
                    "materia": "Matematica I",
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