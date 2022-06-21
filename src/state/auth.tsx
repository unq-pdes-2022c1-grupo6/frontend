import {createContext, useState, ReactNode, useContext} from "react";
import {AxiosResponseHeaders} from "axios";


export interface AuthContextType {
    student: string | undefined,
    setStudent: (dni: string) => void,
    isStudentLogged: boolean,
    loginStudent: (dni: string, headers: AxiosResponseHeaders) => void,
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [student, setStudent] = useState("");
    const [isStudentLogged, setIsStudentLogged] = useState(false);

    const loginStudent = (dni: string, headers: AxiosResponseHeaders) => {
        setStudent(dni);
        const token = headers.authorization;
        const rol = headers.rol;
        if (token && rol) {
            localStorage.setItem("login", JSON.stringify({token, rol}));
            setIsStudentLogged(true);
        }
    }

    const logout = () => {
        localStorage.clear();
        setIsStudentLogged(false);
    }

    return <AuthContext.Provider value={{ student, setStudent, isStudentLogged, loginStudent, logout }}>
        {children}
    </AuthContext.Provider>;

};

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth}

