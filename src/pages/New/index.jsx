import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { api } from "../../services/api"

import { Header } from "../../components/Header"
import { Section } from "../../components/Section"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText"
import { TextArea } from "../../components/TextArea"
import { NoteItem } from "../../components/NoteItem"


import { Container, Form } from "./styles"

export function New(){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [links, setLinks] = useState([])
    const [newLink, setNewLink] = useState("")

    const [tags, setTags] = useState([])
    const [newTag, setNewTag] = useState("")

    function handleBack(){
        // navigate("/") usando o navigate dessa forma o historico de navegação vai so empilhando é como um fatia de bolo uma camada em cima da outra
        navigate(-1)
      }

    function handleAddLink() {
        // acessando o estado anterior e montando um novo array com tudo que tinha antes e o novo
        setLinks(prevState => [...prevState, newLink])
        //Limpando
        setNewLink("")
    }

    function handleRemoveLink(deleted) {
        setLinks(prevState => prevState.filter(link => link !== deleted))
    }
    
    function handleAddTag() {
        setTags(prevState => [ ...prevState, newTag])
        setNewTag("")
    }

    function handleRemoveTag(deleted) {
        setTags(prevState => prevState.filter(tag => tag !== deleted))
        console.log('cliquei');
    }

    const navigate = useNavigate()
    async function handleNewNote(){
        if (!title) {
            return alert("Digite o titulo da nota")
        }
        if (newTag) {
            return alert("Você deixou uma tag no campo para adicionar, mas não clicou em adicionar. Clique para adicionar")
        }
        if (newLink) {
            return alert("Você deixou uma Link no campo para adicionar, mas não clicou em adicionar. Clique para adicionar")
        }
        await api.post('/notes', {
            title,
            description,
            tags,
            links
        });

        alert('Nota criada com sucesso!');
        navigate(-1)
    }

    return (
        <Container>
            <Header/>


            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <ButtonText title="Voltar" onClick={handleBack}/>
                    </header>

                    <Input
                        type="text"
                        placeholder="titulo"
                        onChange={e => setTitle(e.target.value)}
                    />

                    <TextArea 
                        placeholder="Observações" 
                        onChange={e => setDescription(e.target.value)}
                    />

                    <Section title="Links úteis">
                        {
                            links.map((link, index) =>(
                                <NoteItem
                                    // padrao do react passa o valor do key em formato de texto
                                    key={String(index)} 
                                    value={link}
                                    //uma função que n faz nada () => {}
                                    // quando tiver uma função que tem que passar um parametro a função vai ficar assim () => handleRemoveLink(link)
                                    onClick={() => handleRemoveLink(link)}/>
                            ))
                        }
                        <NoteItem 
                            isnew={true}
                            placeholder="Novo link"
                            value={newLink}
                            onChange={e=> setNewLink(e.target.value)}
                            onClick={handleAddLink}/>
                    </Section>


                    
                    <Section title="Marcadores" >
                        <div className="tags">
                            {
                                tags.map((tag, index) =>(
                                   <NoteItem 
                                        key={String(index)}
                                        value={tag}
                                        onClick={()=> handleRemoveTag(tag)}/> 
                                ))    
                            }
                            <NoteItem 
                                isnew={true} 
                                placeholder="Novo marcador"
                                onChange={e=> setNewTag(e.target.value)}
                                value={newTag}
                                onClick={handleAddTag}/>
                        </div>
                    </Section>

                    <Button title="Salvar" onClick={handleNewNote}/>
                </Form>
            </main>
        </Container>
    )
}