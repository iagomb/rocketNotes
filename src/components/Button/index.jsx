/* eslint-disable react/prop-types */
import { Container } from "./styles";


/* caso queira colocar mais propriedade use o rest operator ...rest, no container {...rest} entao qualquer propriedade que for passada componente Button pode ser acessa com o ...rest*/
export function Button({title, loading=false, ...rest}){
    return(
        <Container 
            type="button"
            disabled={loading}
            {...rest}>
            {loading ? "Carregando...": title}
        </Container>
    )
}