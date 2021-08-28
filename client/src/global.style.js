import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

    body{
        font-family: 'Open Sans Condensed', sans-serif;
        padding: 1.5rem 40px;
    
        @media screen and (max-width: 600px) {
        padding: 10px;
        }
    
    }
    
    * {
    box-sizing: border-box;
}
    
`