import React from 'react'


import './custom-button.style.scss'

const CustomButton = ( { children, isGoogleSignInBtn, ...otherProps } ) => {
    return (
        <button className={`${isGoogleSignInBtn ? 'google-signin-btn' : ''} custom-button`} {...otherProps}>
            {children}
        </button>
    )
}

export {CustomButton}