import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
//create context posso passa um valor padrão caso tenha, como n tenho um {} objeto vazio
export const AuthContext = createContext({})


function AuthProvider({ children }) {
    const [ data, setData ] = useState({})
    // com as {} a ordem n importa quando for chamar o signIn 
    async function signIn({ email, password }) {

        try {
            // Enviando o email e a senha para o backend
            const response = await api.post('/sessions', { email, password })
            const { user, token } = response.data;

            localStorage.setItem('@rocketnotes:user', JSON.stringify(user)) || []; 
            localStorage.setItem('@rocketnotes:token', token)

            // to inserindo um token do tipo bearer de autorização no cabeçalho por padrao para todas as rotas
            // error: dando token invalido pq coloquei um + no `Bearer + ${token}`
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setData({ user, token });
 
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            }else{
                alert("Não foi possivel entrar.")
            }
        }
    }

    function signOut() {
        // para deslogar somente remover do lacalStorange os dados e mudar o estado para vazio
        localStorage.removeItem('@rocketnotes:token')
        localStorage.removeItem('@rocketnotes:user')

        setData({})
    }

    async function updateProfile({ user, avatarFile }) {
        try {
            // esse FormData é a mesma coisa que ir la no insominia e colocar o multipart form
            if (avatarFile) {
                const fileUploadForm = new FormData()
                // append 2 parametros 1 nome do upload.single('avatar') que esta na api e dentro de single, 2 arquivo
                fileUploadForm.append("avatar", avatarFile)
                console.log(fileUploadForm);
                console.log(avatarFile);
                const response = await api.patch('/users/avatar', fileUploadForm)
                user.avatar = response.data.avatar
            }

            const response = await api.put('/users', user);
            const { token } = response.data;

            localStorage.setItem('@rocketnotes:user', JSON.stringify(user))
            console.log(token);
            setData({
                user,
                token
            })
            alert("Perfil atualizado!")
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            }else{
                alert("Não foi possivel atualizar o perfil.")
            }
        }
    }

    // useEffect tem duas partes 1 uma função que vai execulta depois da renderização do componente, 2 um vetor que pode colocar o estado que vc quiser, so que quando estado mudar o useEffect vai ser disparado novamente, como vai ser vazio, so sera carregado uma vez apos a renderização do nosso componente
    useEffect(() => {
        const token = localStorage.getItem('@rocketnotes:token')
        const user = localStorage.getItem('@rocketnotes:user')

        if (token && user) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setData({
                token,
                user: JSON.parse(user)
            })
        }
    }, []);

    return(
        <AuthContext.Provider value={{ 
            signIn, 
            user: data.user,
            signOut,
            updateProfile
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth } ;