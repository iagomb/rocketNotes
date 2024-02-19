import { Routes, Route, Navigate } from "react-router-dom"

import { SignIn } from '../pages/Signin'
import { SignUp } from '../pages/SignUp'

export function AuthRoutes(){
    const user = localStorage.getItem('@rocketnotes:user')
    // o * no path conhecido como rota de fallback como se fosse um if se nenhuma das condições foi atendida vai pro else no caso o *
    return(
        <Routes>
            <Route path="/" element={<SignIn/>} />
            <Route path="/register" element={<SignUp/>} />

            
           {!user && <Route path="*" element={<Navigate to="/"/>}/>}
        </Routes>
    )
}