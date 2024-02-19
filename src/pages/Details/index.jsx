import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { Tag } from "../../components/Tag"
import { Button } from "../../components/Button"
import { Header } from "../../components/Header"
import { Section } from "../../components/Section"
import { ButtonText } from "../../components/ButtonText"

import { Container, Links, Content} from "./styles"
import { api } from "../../services/api"
//existe uma regra no react que um componente retorna no maximum 1 elemento 
/* se no title é um numero title={1}. 
  Propredades booleanas n precisa colocar o ={} somente loading
*/
/* <Button 
        title="Login" loading/>
    <Button title="Cadastrar"/> 
*/
export function Details() {
  // useParams para buscar o parametros que existem na rota
  const [data, setData] = useState()

  const params = useParams()
  const navigate = useNavigate()
  console.log(params);
  function handleBack(){
    // navigate("/") usando o navigate dessa forma o historico de navegação vai so empilhando é como um fatia de bolo uma camada em cima da outra
    navigate(-1)
  }

  async function handleRemove() {
    const confirm = window.confirm("Deseja realmente remover a nota?")
    if (confirm) {
      await api.delete(`/notes/${params.id}`)
      navigate(-1)
    }
  }

  useEffect(() => {
    async function fetchNotes(){
      const response = await api.get(`/notes/${params}`)
      setData(response.data)
      console.log(data);
    }
    fetchNotes()
  }, [])

  return (
    <Container>
      <Header/>


    {
      data &&
      <main>
        <Content>
          <ButtonText title="Excluir a nota" onClick={handleRemove}/>

          <h1>
            {data.title}
          </h1>

          <p>
            {data.description}
          </p>

          {
            data.links &&
            <Section title="Links úteis">
              <Links>
                {
                  data.links.map(link => (
                    <li key={String(link.id)}>
                      <a href={link.url} target="_blank" rel="noreferrer">{link.url}</a>
                    </li>
                  ))
                }
                
              </Links>
            </Section>
          }

          {
            // so renderizo isso se tiver as tags
            data.tags &&
            <Section title="Marcadores">
              {
                data.tags.map(tag=> (
                  <Tag 
                    key={String(tag.id)} 
                    title={tag.name}
                  />

                ))
              }
            </Section>
          }

          <Button title="Voltar" onClick={handleBack}/>
    
        </Content>
      </main>
    }
    </Container>
  )
}


