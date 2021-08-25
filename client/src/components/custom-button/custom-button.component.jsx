import React from 'react'


//import './custom-button.style.scss'

import { CustomButtonContainer } from './custom-button.styles'

const CustomButton = ({ children, ...props }) => {
    return (
        <CustomButtonContainer {...props}>
        {children}
        </CustomButtonContainer>
    )
}

export {CustomButton}