import {createContext, useState, ReactNode, useContext, useEffect} from "react";
import {AxiosResponseHeaders} from "axios";


export interface AuthContextType {
    user: string,
    rol: string,
    isLogged: boolean,
    login: (user: string, headers: AxiosResponseHeaders) => void,
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState("");
    const [rol, setRol] = useState(""); // Directivo | Alumno | ""
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const login = JSON.parse(localStorage.getItem('login') || "null");
        if (login && login.user && login.rol && login.token) {
            setIsLogged(true);
            setUser(login.user);
            setRol(login.rol);
        }
    },[])

    const login = (user: string, headers: AxiosResponseHeaders) => {
        const token = headers.authorization;
        const rol = headers.rol;
        if (token && rol) {
            localStorage.setItem("login", JSON.stringify({user, token, rol}));
            setIsLogged(true);
            setRol(rol);
            setUser(user);
        }
    }

    const logout = () => {
        localStorage.clear();
        setIsLogged(false);
        setRol("");
        setUser("");
    }

    return <AuthContext.Provider value={{rol, user, isLogged, login, logout}}>
        {children}
    </AuthContext.Provider>;

};

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth}

