import {AuthContextType, AuthProvider, useAuth} from "../auth";
import {mockLocalStorage} from "../../setupTests";
import {act, renderHook, RenderResult} from "@testing-library/react-hooks";
import {ReactNode} from "react";


const {setItemMock, getItemMock, removeItemMock} = mockLocalStorage();


describe("<AuthProvider/>", () => {
    const user = {
        role: "student", accessToken: "aalkhsfl43fhwelfuiewh"
    };
    const wrapper = ({children}: { children: ReactNode }) => <AuthProvider>{children}</AuthProvider>;
    const render = () => renderHook(() => useAuth(), {wrapper}).result;
    let result: RenderResult<AuthContextType | null>;

    describe("cuando esta guardado el usuario en localStorage", () => {

        beforeEach(() => {
            getItemMock.mockReturnValue(JSON.stringify(user));
            result = render();
        });

        it("lo loggea automaticamente", () => {
            expect(getItemMock).toBeCalledTimes(1)

            expect(result?.current?.logged_in).toBeTruthy()
            expect(result?.current?.role).toBe(user.role)
            expect(result?.current?.token).toBe(user.accessToken)
        })

        describe("logout", () => {

            it("elimina al usuario del localStorage y setea en valores nulos a logged_in, role y token",
                () => {

                    act(() => {
                        result?.current?.logout()
                    })

                    expect(removeItemMock).toBeCalledWith("user")

                    expect(result?.current?.logged_in).toBeFalsy()
                    expect(result?.current?.role).toBe("")
                    expect(result?.current?.token).toBe("")
                })

        });

    });

    describe("cuando no esta guardado el usuario en localStorage", () => {

        beforeEach(() => {
            result = render();
        });

        it("no se loggea", () => {
            expect(getItemMock).toBeCalledTimes(1)

            expect(result?.current?.logged_in).toBeFalsy()
            expect(result?.current?.role).toBe("")
            expect(result?.current?.token).toBe("")
        })

        describe("login", () => {

            it("guarda al usuario en localStorage y en el state de AuthProvider",
                () => {

                    act(() => {
                        result?.current?.login(user)
                    })

                    expect(setItemMock).toBeCalledWith("user", JSON.stringify(user))

                    expect(result?.current?.logged_in).toBeTruthy()
                    expect(result?.current?.role).toBe(user.role)
                    expect(result?.current?.token).toBe(user.accessToken)
                })

        });

    });

});
