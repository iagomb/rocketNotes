import { Tag } from "../Tag"
import { Container } from "./styles"

export function Note({data, ...rest}){
    return(
        <Container {...rest}>
            <h1>{data.title}</h1>

            {
                data.tags && 
                <footer>
                    { // a propriedade key é usado quando vamos trabalhar com arrays
                        data.tags.map(tag=> <Tag key={tag.id} title={tag.name}/>)
                    }
                </footer>
            }
        </Container>
    )
}