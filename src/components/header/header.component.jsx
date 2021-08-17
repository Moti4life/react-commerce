import React from 'react'
// import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'


import { auth } from '../../firebase/firebase.utils'
import CartIcon  from '../cart-icon/cart-icon.component.jsx'
import { selectCurrentUser } from '../../redux/user/user-selector'
import { selectCartHidden } from '../../redux/cart/cart-selectors'

import  CartDropdown  from '../cart-dropdown/cart-dropdown.component.jsx'

// trying out styled Components
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv } from './header.styles'

let logme = (user) => {
    console.log('this is me log', user);
}

const Header = ({ currentUser, hidden }) => {
    logme(currentUser)
    return(
        <HeaderContainer>
        
            <LogoContainer to='/'>
                <Logo className='logo' />
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to='/shop'>
                SHOP
                </OptionLink>
                <OptionLink to='/shop'>
                CONTACT
                </OptionLink>
                {
                    currentUser ? (
                        <OptionDiv onClick={ () => { auth.signOut()}}>{`Sign Out (${currentUser.displayName})`}</OptionDiv>
                        
                    )
                    :
                    (
                        <OptionLink to='/signin'>SIGN IN</OptionLink>
                    )
                    
                }
                <CartIcon />
            </OptionsContainer>
            {
                hidden ? null : (
                    <CartDropdown />
                )
            }
        
        </HeaderContainer>
    )
}

/* const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state),
    hidden: selectCartHidden(state)
}) */ //or without using createStructuredSelector

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

// const Header = connect(mapStateToProps)(headerPure)

// export {Header}

export default connect(mapStateToProps)(Header)


