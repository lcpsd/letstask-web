import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps{
    login: () => Promise<void>;
    logout: (pushTo: string) => Promise<void>;
    user: any
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthContextProvider({children}:{children: JSX.Element}){

    const [user, setUser] = useState<any | undefined>(undefined)
    const router = useRouter()

    const login = async () => {
        
    }

    const logout = async (pushTo: string) => {
        router.push(pushTo)
    }

    return(
        <AuthContext.Provider value={{login, logout, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext(){
    return useContext(AuthContext)
}