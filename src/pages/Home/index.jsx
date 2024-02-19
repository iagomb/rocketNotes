import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { api } from "../../services/api";

import { Note } from "../../components/Note";
import { Input } from "../../components/Input";
import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";

import { Container, Brand, Menu, Search, Content, NewNote} from "./styles";

import { FiPlus } from "react-icons/fi"

export function Home(){
    const [search, setSearch] = useState("")

    const [tags, setTags] = useState([])
    const [tagsSelected, setTagsSelected] = useState([])

    const [notes, setNotes] = useState([])

    const navigate = useNavigate()

    function handleDetails(id) {
        navigate(`/details/${id}`  )
    }

    function handleTagsSelected(tagName) {
        if (tagName === "all") {
            return setTagsSelected([])
        }
        const alreadySelected = tagsSelected.includes(tagName)
        console.log(alreadySelected);

        if (alreadySelected) {
            const filteredTags = tagsSelected.filter(tag => tag !== tagName)
            setTagsSelected(filteredTags)
        }else{
            setTagsSelected(prevState => [...prevState, tagName])
        }


    }

    // useEffect n acessa o async tem que criar uma função vc pode criar dentro dele ou fora
    useEffect(()=> {
        async function fetchTags(){
            const response = await api.get('/tags')
            setTags(response.data)
        }
        fetchTags()
    }, [])

    useEffect(()=> {
        async function fetchNotes(){
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
            setNotes(response.data)
        }
        fetchNotes()
    }, [tagsSelected, search])
    return(
        <Container>
            <Brand>
                <h1>Rocketnotes</h1>
            </Brand>

            <Header/>

            <Menu>
                <li><ButtonText title="Todos" isActive={tagsSelected.length === 0} onClick={() => handleTagsSelected("all")}/></li>
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText 
                                title={tag.name}
                                onClick={() => handleTagsSelected(tag.name)}
                                isActive={tagsSelected.includes(tag.name)}
                            />
                        </li>
                    ))
                }
                
            </Menu>

            <Search>
                <Input 
                    placeholder="Pesquisar pelo titulo"
                    onChange={e => setSearch(e.target.value)}
                />
            </Search>

            <Content>
                <Section title="Minhas notas">
                    {
                        notes.map(note => (
                            // o key tem que ser passa como string
                            <Note 
                                key={String(note.id)} 
                                data={note}
                                onClick={() => handleDetails(note.id)}
                            />
                        ))
                    }
                </Section>

            </Content>

            <NewNote to="/new">
                <FiPlus /> Criar nota
            </NewNote>
        </Container>
    )
}