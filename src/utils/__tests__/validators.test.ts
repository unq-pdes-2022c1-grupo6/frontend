import {maxLength, minLength} from "../validators";


describe('minLength', () => {

    test("con un largo minimo 6 y la palabra hola devuelve el mensaje Minimo 6 caracteres", () => {
        expect(minLength(6)("hola")).toBe("Minimo 6 caracteres");
    });

    test("con un largo minimo 4 y la palabra pepito devuelve undefined", () => {
        expect(minLength(4)("pepito")).toBeUndefined();
    });

});


describe('maxLength', () => {

    test("con un largo maximo 4 y la palabra pepito devuelve el mensaje Maximo 4 caracteres", () => {
        expect(maxLength(4)("pepito")).toBe("Maximo 4 caracteres");
    });

    test("con un largo maximo 6 y la palabra hola devuelve undefined", () => {
        expect(maxLength(6)("hola")).toBeUndefined();
    });

});