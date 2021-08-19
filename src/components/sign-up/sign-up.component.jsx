import React from 'react'
import { FormInput } from '../form-input/form-input.component'
import { CustomButton } from '../custom-button/custom-button.component'

import { connect } from 'react-redux'

import { signUpStart } from '../../redux/user/user-actions'

//import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

import './sign-up.style.scss'

class SignUp extends React.Component {
    constructor() {
        super()


        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleChange = (event) => {
        
        const { name, value } = event.target
        this.setState( { [name]: value} )

    }

    handleSubmit =  ( async (event) => {
        event.preventDefault()

        const { signUpStart } = this.props
        const {
            displayName,
            email,
            password,
            confirmPassword 
        } = this.state

        if(password !== confirmPassword) {
            alert('passwords does not match')
            return
        }

        signUpStart(displayName, email, password )

        /* try {

            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            createUserProfileDocument(user, { displayName })

            this.setState = {
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }

        } catch (error) {
            console.log('error occured with creating user', error);
        } */

    })

    render() {
        const {
            displayName,
            email,
            password,
            confirmPassword 
        } = this.state

        return(
            <div className='sign-up'>
                <h2 className='title'>Create an Account?</h2>
                
                <span>SIgn up with your email and password</span>

                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput 
                        type="text" 
                        name='displayName' 
                        value={displayName} 
                        label='Display Name' 
                        handleChange={this.handleChange}
                        required
                        
                    />

                    <FormInput 
                        type="email" 
                        name='email' 
                        value={email} 
                        label='Email'
                        handleChange={this.handleChange}
                        required 
                        
                    />
                    
                    <FormInput 
                        type="password" 
                        name='password' 
                        value={password} 
                        label='Password'
                        handleChange={this.handleChange}
                        required 
                        
                    />

                    <FormInput 
                        type="password" 
                        name='confirmPassword' 
                        value={confirmPassword} 
                        label='Confirm Password'
                        handleChange={this.handleChange}
                        required 
                        
                    />
                    
                    <div className='buttons'>
                    <CustomButton type="submit">Sign Up</CustomButton>
                    
                    </div>
                    
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: (displayName, email, password ) => dispatch(signUpStart({ displayName, email, password }))
})


export default connect (null, mapDispatchToProps)(SignUp) 




