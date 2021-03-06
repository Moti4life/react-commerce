import styled, { css } from 'styled-components'

const defaultButtonStyles = css`
    background-color: black;
    color: white;
    border: none;

    &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
    }
`

const invertedButtonStyles = css`
    background-color: white;
    color: black;
    border: 1px solid black;
    &:hover{
        background-color: black;
        color: white;
    }
`
const googleSignInStyles = css`
    background-color: #4285f4;
    color: white;

    &:hover{
    background-color: #3568b9;
    color: rgb(219, 219, 219);
    border: none;
    }
`

const getButtonStyles = (props) => {

    if(props.isGoogleSignInBtn) {
        return googleSignInStyles
    }
    return props.inverted ? invertedButtonStyles : defaultButtonStyles
}

export const CustomButtonContainer = styled.button`
    min-width: 160px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;

    font-size: 15px;
    background-color: black;
    color: white;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    border: none;
    cursor: pointer;
    overflow: hidden;

    ${getButtonStyles}
`