import {availableSubjectsDTO, requestDTO} from "../../utils/fake-data";
import {convertToRequest} from "../request";
import {convertSubjectsDTO} from "../subject";

const expectedRequest = {
    "nombre": "Bartolo",
    "dni": 12345677,
    "resumenCursadas": [],
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
        "solicitudes": [{
            "carrera": "TPI - Tecnicatura universitaria en programación informática",
            "comisiones": [{
                "estado": "PENDIENTE",
                "id": 1,
                "description": "1 - (Presencial) Martes 10:00 a 12:00 - Jueves 10:00 a 12:00 "
            }, {
                "estado": "PENDIENTE",
                "id": 2,
                "description": "2 - (Presencial) Lunes 10:00 a 12:00 - Miercoles 10:00 a 12:00 "
            }],
            "codigo": "01035",
            "nombre": "Bases de Datos"
        }],
        "estado": "ABIERTO"
    }
}

describe('convertRequestDTO', () => {

    it("devuelve una nueva solicitud con sus solicitudes convertidas en una lista de tipo Subject", () => {
        const res = convertToRequest(convertSubjectsDTO(availableSubjectsDTO), requestDTO);

        expect(res).toStrictEqual(expectedRequest)
    });

});
