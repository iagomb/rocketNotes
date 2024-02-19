import { useState } from "react";
import { useNavigate} from "react-router-dom"

import avatarPlaceholder from "../../assets/avatar.svg"

import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { Input} from "../../components/Input"
import { Button } from "../../components/Button"

import { Container, Form, Avatar } from "./styles";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";


export function Profile(){
    const { user, updateProfile } = useAuth()
    
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [passwordOld, setPasswordOld] = useState("")
    const [passwordNew, setPasswordNew] = useState("")


    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    // exibe o avatar
    const [ avatar, setAvatar ] = useState(avatarUrl)
    // mudar/carregar a imagem selecionada
    const [ avatarFile, setAvatarFile ] = useState(null)

    const navigate = useNavigate()
    function handleBack(){
        // navigate("/") usando o navigate dessa forma o historico de navegação vai so empilhando é como um fatia de bolo uma camada em cima da outra
        navigate(-1)// volta para rota anterior
      }

    async function handleUpdate(){
        const updated = {
            name,
            email,
            password: passwordNew, 
            old_password: passwordOld
        }

        // Object.assign copia 1 o mais valores
        // const userUpdated = Object.assign(user, updated)
        const userUpdated = {...user, ...updated}// msm resultado que o de cima

        await updateProfile({user: userUpdated, avatarFile})
    }

    function handleChangeAvatar(event) {
        //input do tipo file no event.target.files é um FileList ou seja um array, entao para acessar a imagem usa o [0] 
        const file = event.target.files[0]
        setAvatarFile(file)

        // criando uma url da imagem 
        const imagePreview = URL.createObjectURL(file)
        // exibindo a imagem selecionada
        setAvatar(imagePreview)

    }

    return(
        <Container>
            <header>
                <button type="button" onClick={handleBack}> <FiArrowLeft/> </button>

            </header>

            <Avatar>
                <img src={avatar} alt="Foto do Usuario" />

                <label htmlFor="avatar">
                    <FiCamera/>
                    <input type="file" id="avatar" onChange={handleChangeAvatar}/>
                </label>
            </Avatar>

            <Form>
                <Input 
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Input 
                    placeholder="E-mail"
                    type="email"
                    icon={FiMail}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Input 
                    placeholder="Senha atual"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordOld(e.target.value)}
                />
                <Input 
                    placeholder="Nova Senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordNew(e.target.value)}
                />

                <Button title="Salvar" onClick={handleUpdate}/>
            </Form>

        </Container>
    )
}