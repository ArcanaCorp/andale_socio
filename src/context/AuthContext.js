import { createContext, useContext, useEffect, useState } from "react";
import { serviceInfoAccount } from "../services/bussines.service";
import Cookies from "js-cookie";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null)
    const [ authReady, setAuthReady ] = useState(false)

    const contextSavedAccount = async (token) => {
        try {
            const data = await serviceInfoAccount(token)
            if (!data) return { ok: false, message: 'No se pudo recuperar la información de la sesión.' }
                console.log(data);
                setUser(data.bussines)
        } catch (error) {
            return { ok: false, message: error.message }
        }
    }

    useEffect(() => {

        const contextAccount = async () => {
            const token = Cookies.get('andale_socio');
            if (token) {
                await contextSavedAccount(token);
            }
            setAuthReady(true);
        }

        contextAccount();

    }, [])

    const contextValue = {
        user,
        authReady
    }

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)