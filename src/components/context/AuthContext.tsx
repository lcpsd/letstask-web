import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

interface AuthContextProps{
    login: () => Promise<void>;
    logout: (pushTo: string) => Promise<void>;
    user: any
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthContextProvider({children}:{children: JSX.Element}){

    const [user, setUser] = useState<any | null>(null)
    const router = useRouter()

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => setUser(session?.user))
    },[])

    const login = async () => {
        supabase.auth.signIn({provider: "google"})
    }

    const logout = async (pushTo: string) => {
        await supabase.auth.signOut()
        setUser(null)
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