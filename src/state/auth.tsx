import {createContext, useState, ReactNode, useContext} from "react";


export interface AuthContextType {
    student: string | undefined,
    setStudent: (dni: string) => void
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [student, setStudent] = useState("");

    return <AuthContext.Provider value={{ student, setStudent }}>
        {children}
    </AuthContext.Provider>;

};

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth}

