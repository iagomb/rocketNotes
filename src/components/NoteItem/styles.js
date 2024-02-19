import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    align-items: center;

    background-color: ${({theme, $isnew})=> $isnew ? theme.COLORS.BACKGROUND_900  : 'transparent'};
    color: ${({theme})=> theme.COLORS.GRAY_300};

    border: ${({theme, $isnew})=> $isnew ? 'none' : `2px dashed ${theme.COLORS.GRAY_300}`};

    margin-bottom: 8px;
    border-radius: 10px;
    padding-right: 16px;

    > button{
        border: none;
        background: none;

        > svg{
            color: ${({theme, $isnew})=> $isnew ? theme.COLORS.ORANGE : theme.COLORS.RED}
        }
    }

    > input{
        height: 56px;
        width: 100%;

        padding: 12px;

        color: ${({theme})=> theme.COLORS.WHITE};

        background: transparent;

        border: none;

        &::placeholder{
            ${({theme})=> theme.COLORS.GRAY_300}
        }
    }
`;