import React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'


import { FormInput } from '../form-input/form-input.component'
import { CustomButton } from '../custom-button/custom-button.component'


import { googleSignInStart } from '../../redux/user/user-actions'
import { emailSignInStart } from '../../redux/user/user-actions'

import './sign-in.style.scss'

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [credentials, setCredentials] = useState({ email: '', password: ''})

    const { email, password } = credentials

    const handleChange = (event) => {
        
        const { name, value } = event.target
        setCredentials({ ...credentials, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
                
        emailSignInStart(email, password)
    }

    return (
        <div className='sign-in'>
            <h2>Have an Account?</h2>
            
            <span>SIgn in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                    type="email" 
                    name='email' 
                    value={email} 
                    label='your Email' 
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
                
                <div className='buttons'>
                <CustomButton type="submit">Sign In</CustomButton>
                <CustomButton 
                    type='button' 
                    onClick={googleSignInStart} 
                isGoogleSignInBtn>Sign In With Google</CustomButton>
                </div>
                
            </form>
        </div>
    )
    
}

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
  })


export default connect(null, mapDispatchToProps)(SignIn)