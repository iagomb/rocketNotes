import React from 'react'
import ReactDOM from 'react-dom/client'


import { Routes } from './routes'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from './styles/global'
import theme from './styles/theme';

import { AuthProvider } from './hooks/auth'

//reactDOM é uma biblioteca para manipular a dom
// MyContext fica por volta de <Routes/> para que todas as rotas possa acessar o MyContext
// o MyContext.Provider pra provendo um valor pra todas as rotas ou seja, em qualquer rota, enqualquer lugar da aplicação vou conseguir acessar o conteudo dentro desse value
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles/> 
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
