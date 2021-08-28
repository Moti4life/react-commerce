import styled, { css } from "styled-components";
import { Link } from "react-router-dom";


// do this to share styles; import { css } from 'styled-components
const OptionContainerStyles = css`
    padding: 10px 12px;
    text-decoration: none;
    color: #000;
    cursor: pointer;
`


export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    
    `

export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
    `

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 15px 10px 0 0;
    justify-content: flex-end;

    @media screen and (max-width: 600px) {
        width: 80%;
        
        }
    `
export const OptionLink = styled(Link)`
    ${OptionContainerStyles}
`

export const OptionDiv = styled.div`
    ${OptionContainerStyles}
`

