import styled from "styled-components";

//inportação de imagem é passa o caminho da imagem para uma variavel e depois passar para o src={nomeDaImagem} ou na url(${nomeDaImagem}) do css
import backgroundImg from "../../assets/bg.png"

export const Container = styled.div`
    height: 100vh;

    display: flex;
    align-items: stretch;
`;

export const Form = styled.form`
    padding: 0 136px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;

    > h1{
        font-size: 48px;
        color: ${({theme}) => theme.COLORS.ORANGE};
    }

    > h2{
        font-size: 24px;
        margin: 48px 0;
    }

    > p{
        font-size: 14px;
        color: ${({theme}) => theme.COLORS.GRAY_100};
    }

    > a {
        margin-top: 124px;
        color: ${({theme}) => theme.COLORS.ORANGE};
    }

    order: 1;
`;

export const Background = styled.div`
    flex: 1;
    background: url(${backgroundImg}) no-repeat center center;
    background-size: cover;
`;