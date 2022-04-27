import {createContext, useState, ReactNode, useContext} from "react";
import {User} from "../services/authService";


interface AuthContextType {
    logged_in: boolean;
    role: string;
    login: (user: User) => void
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [logged_in, setLoggedIn] = useState(false);
    const [role, setRole] = useState<string>("");
    const [, setToken] = useState<string>("");

    const login = (user: User) => {
        localStorage.setItem("user", JSON.stringify(user));
        setLoggedIn(true);
        setRole(user.role);
        setToken(user.accessToken);
    }

    return <AuthContext.Provider value={{ logged_in, role, login }}>
        {children}
    </AuthContext.Provider>;

};

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth}

