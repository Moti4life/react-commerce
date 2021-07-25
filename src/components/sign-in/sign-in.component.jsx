import React from 'react'

import { FormInput } from '../form-input/form-input.component'
import { CustomButton } from '../custom-button/custom-button.component'

import { signInWithGoogle } from '../../firebase/firebase.utils'

import './sign-in.style.scss'

class SignIn extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        this.setState( { email: '', password: '' } )
    }

    handleChange = (event) => {
        
        const { name, value } = event.target
        this.setState( { [name]: value} )

    }

    render () {
        return (
            <div className='sign-in'>
                <h2>Have an Account?</h2>
                
                <span>SIgn in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        type="email" 
                        name='email' 
                        value={this.state.email} 
                        label='your Email' 
                        handleChange={this.handleChange}
                        required
                        
                    />
                    
                    <FormInput 
                        type="password" 
                        name='password' 
                        value={this.state.password} 
                        label='Password'
                        handleChange={this.handleChange}
                        required 
                        
                    />
                    
                    <div className='buttons'>
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignInBtn>Sign In With Google</CustomButton>
                    </div>
                    
                </form>
            </div>
        )
    }

}



export { SignIn }