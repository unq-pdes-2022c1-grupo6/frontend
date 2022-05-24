import {availableSubjectsDTO} from "../../utils/fake-data";
import {Subject} from "../../services/subjectDTO";
import {convertSubjectsDTO} from "../subject";

const expectedSubjects: Subject[] = [{
    "carrera": "TPI - Tecnicatura universitaria en programación informática",
    "comisiones": [
        {"id": 1, "description": "1 - (Presencial) Martes 10:00 a 12:00 - Jueves 10:00 a 12:00 "},
        {"id": 2, "description": "2 - (Presencial) Lunes 10:00 a 12:00 - Miercoles 10:00 a 12:00 "}
    ],
    "codigo": "01035",
    "nombre": "Bases de Datos"
}]

describe('convertSubjectsDTO', () => {

    it("devuelve las comisiones en una lista de tipo Course", () => {
        expect(convertSubjectsDTO(availableSubjectsDTO)).toStrictEqual(expectedSubjects)
    });

});