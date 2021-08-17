import React from 'react'
import { connect } from 'react-redux'


import { FormInput } from '../form-input/form-input.component'
import { CustomButton } from '../custom-button/custom-button.component'


import { googleSignInStart } from '../../redux/user/user-actions'
import { emailSignInStart } from '../../redux/user/user-actions'

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
        const { emailSignInStart } = this.props
        const { email, password } = this.state

        emailSignInStart(email, password)
        
    }

    handleChange = (event) => {
        
        const { name, value } = event.target
        this.setState({ [name]: value})

    }

    render () {
        const { googleSignInStart } = this.props
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
                    <CustomButton 
                        type='button' 
                        onClick={googleSignInStart} 
                        isGoogleSignInBtn>Sign In With Google</CustomButton>
                    </div>
                    
                </form>
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
  })


export default connect(null, mapDispatchToProps)(SignIn)