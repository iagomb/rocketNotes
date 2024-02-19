import { Container } from "./styles"

// todo conteudo que for passado pro children Section {children} Section
export function Section({title, children}){
    return(
        <Container>
            <h2>{title}</h2>
            {children}
        </Container>
    )
}