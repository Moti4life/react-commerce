import React from 'react'


import './custom-button.style.scss'

const CustomButton = ( { 
    children, 
    isGoogleSignInBtn, 
    inverted, 
    ...otherProps 
} ) => {
    return (
        <button className={`${isGoogleSignInBtn ? 'google-signin-btn' : ''}
        ${inverted ? 'inverted' : ''}
        custom-button`} {...otherProps}>
        {children}
        </button>
    )
}

export {CustomButton}