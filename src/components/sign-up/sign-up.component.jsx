import React from 'react'
import { useState } from 'react'
import { FormInput } from '../form-input/form-input.component'
import { CustomButton } from '../custom-button/custom-button.component'

import { connect } from 'react-redux'

import { signUpStart } from '../../redux/user/user-actions'


import './sign-up.style.scss'



const SignUp = ({ signUpStart } ) => {
    
    const [credentials, setCredentials] = useState({ 
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (event) => {
        
        const { name, value } = event.target
        setCredentials({ ...credentials, [name]: value })
    }

    const {
        displayName,
        email,
        password,
        confirmPassword 
    } = credentials

    const handleSubmit =  ( async (event) => {
        event.preventDefault()       

        if(password !== confirmPassword) {
            alert('passwords does not match')
            return
        }

        signUpStart(displayName, email, password )

    })

    return(
        <div className='sign-up'>
            <h2 className='title'>Create an Account?</h2>
            
            <span>SIgn up with your email and password</span>

            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput 
                    type="text" 
                    name='displayName' 
                    value={displayName} 
                    label='Display Name' 
                    handleChange={handleChange}
                    required
                    
                />

                <FormInput 
                    type="email" 
                    name='email' 
                    value={email} 
                    label='Email'
                    handleChange={handleChange}
                    required 
                    
                />
                
                <FormInput 
                    type="password" 
                    name='password' 
                    value={password} 
                    label='Password'
                    handleChange={handleChange}
                    required 
                    
                />

                <FormInput 
                    type="password" 
                    name='confirmPassword' 
                    value={confirmPassword} 
                    label='Confirm Password'
                    handleChange={handleChange}
                    required 
                    
                />
                
                <div className='buttons'>
                <CustomButton type="submit">Sign Up</CustomButton>
                
                </div>
                
            </form>
        </div>
    )
    
}

const mapDispatchToProps = dispatch => ({
    signUpStart: (displayName, email, password ) => dispatch(signUpStart({ displayName, email, password }))
})


export default connect (null, mapDispatchToProps)(SignUp) 




