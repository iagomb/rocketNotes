import { Input }from "../../components/Input"
import { Button }from "../../components/Button"
import { FiMail, FiLock } from "react-icons/fi"
import { Link } from "react-router-dom"

import { Container, Form, Background} from "./styles"

import { useAuth } from "../../hooks/auth"
import { useState } from "react"

export function SignIn(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {signIn} = useAuth()

    function handleSignIn() {
        signIn({ email, password })
    }

    return(
        <Container>
            <Form>
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis.</p>

                <h2>Faça seu login</h2>

                <Input 
                    placeholder="E-mail"
                    type="email"
                    icon={FiMail}
                    onChange={e => setEmail(e.target.value)}
                />
                <Input 
                    placeholder="Password"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPassword(e.target.value)}
                />
                
                <Button title="Entrar" onClick={handleSignIn}/>

                <Link to="/register">Criar Contar</Link>
            </Form>
            <Background/>
        </Container>
    )
}