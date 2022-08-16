import { useEffect } from "react"
import { supabase } from "../services/supabase"

export function ProtectedRoute({children}:{children: JSX.Element}){

    const session = supabase.auth.session()

    useEffect(() => {}, [session])

    if(!session){
        return <></>
    }
    return children
}