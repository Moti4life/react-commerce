import React from 'react'

import { FormInput } from '../form-input/form-input.component'
import { CustomButton } from '../custom-button/custom-button.component'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

import './sign-in.style.scss'

class SignIn extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        const { email, password } = this.state

        try {
            await auth.signInWithEmailAndPassword(email, password)
            this.setState = ({
                email: '',
                password: ''
            })

        } catch (error) {
            console.log('error with sign in.', error);
        }

        
    }

    handleChange = (event) => {
        
        const { name, value } = event.target
        this.setState({ [name]: value})

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
                    <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignInBtn>Sign In With Google</CustomButton>
                    </div>
                    
                </form>
            </div>
        )
    }

}



export { SignIn }