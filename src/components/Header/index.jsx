import { useNavigate } from "react-router-dom";
import { Container, Profile, Logout} from "./styles";
import { RiShutDownLine } from "react-icons/ri"; 
import avatarPlaceholder from "../../assets/avatar.svg"

import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";

export function Header() {
    const { signOut, user } = useAuth();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const navigate = useNavigate()
    function handleSingnOut() {
        navigate("/")
        signOut()
    }
    return(
        <Container>
            <Profile to="/profile">
                <img src={avatarUrl} alt={user.name} />

                <div>
                    <span>Bem-vindo</span>
                    <strong>{user.name}</strong>
                </div>
            </Profile>

            <Logout onClick={handleSingnOut}>
                <RiShutDownLine/>
            </Logout>
        </Container>
    )
}