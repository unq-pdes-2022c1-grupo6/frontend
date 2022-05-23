import {convertRequestDTO} from "../request";
import {Careers} from "../subject";
import {availableSubjectsDTO, requestDTO} from "../../utils/fake-data";

const convertedRequest = {
    "nombre": "Bartolo", "dni": 12345677, "resumenCursadas": [],
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
        "solicitudes": {
            "Bases de Datos": [{
                "id": "1",
                "description": "1 - (Presencial) Martes 10:00 a 12:00 - Jueves 10:00 a 12:00 ",
                "state": "PENDIENTE"
            }, {
                "id": "2",
                "description": "2 - (Presencial) Lunes 10:00 a 12:00 - Miercoles 10:00 a 12:00 ",
                "state": "PENDIENTE"
            }]
        },
        "estado": "ABIERTO"
    }
}

describe('convertRequestDTO', () => {

    it("devuelve una nueva solicitud con sus solicitudes convertidas en RequestType", () => {

        expect(convertRequestDTO(new Careers(availableSubjectsDTO), requestDTO)).toStrictEqual(convertedRequest)
    });

});
