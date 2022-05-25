
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
                "comisionId": 1,
                "materia": "Bases de Datos",
            },
            {
                "id": 2,
                "estado": "PENDIENTE",
                "comisionId": 2,
                "materia": "Bases de Datos"
            }
        ],
        "estado": "ABIERTO"
    },
    "resumenCursadas": []
}