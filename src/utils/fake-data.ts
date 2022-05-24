
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

export const DNI = 12345677;

export const requestDTO = {
    "nombre": "Bartolo",
    "dni": 12345677,
    "formulario": {
        "id": 1,
        "dniAlumno": 12345677,
        "cuatrimestre": {
            "anio": 2022,
            "semestre": "S1",
            "inicioInscripciones": "2022-05-23T08:00:00",
            "finInscripciones": "2022-06-06T20:00:00",
            "id": 1
        },
        "solicitudes": [
            {
                "id": 1,
                "estado": "PENDIENTE",
                "comisionDTO": {
                    "id": 1,
                    "numero": 1,
                    "materia": "Bases de Datos",
                    "cuposTotales": 30,
                    "sobreCuposTotales": 5,
                    "cuposDisponibles": 5
                }
            },
            {
                "id": 2,
                "estado": "PENDIENTE",
                "comisionDTO": {
                    "id": 2,
                    "numero": 2,
                    "materia": "Bases de Datos",
                    "cuposTotales": 30,
                    "sobreCuposTotales": 5,
                    "cuposDisponibles": 5
                }
            }
        ],
        "estado": "ABIERTO"
    },
    "resumenCursadas": []
}