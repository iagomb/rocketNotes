import { Container } from "./styles"

// transformar um prapriedade em um componente icon: Icon 
export function Input({icon: Icon, ...rest}){
    //se existe o icon, {Icon && <Icon/>} ai sim eu mostro ele, caso contrario n
    return(
        <Container>
            {Icon && <Icon size={20}/>}
            <input {...rest} />
        </Container>
    )
}