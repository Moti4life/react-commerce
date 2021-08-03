import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { connect } from 'react-redux'

import { auth } from '../../firebase/firebase.utils'
import CartIcon  from '../cart-icon/cart-icon.component.jsx'

import  CartDropdown  from '../cart-dropdown/cart-dropdown.component.jsx'

import './header.style.scss'

// let logme = (user) => {
//     console.log('this log', user);
// }

const Header = ({ currentUser, hidden }) => {
    //logme(currentUser)
    return(
        <div className='header'>
            <Link to='/'>
                <Logo className='logo' />
            </Link>
            <div className='options'>
                <Link className='option' to='/shop'>
                    SHOP
                </Link>
                <Link className='option' to='/shop'>
                    CONTACT
                </Link>
                {
                    currentUser ? (
                        <div className='option' onClick={ () => { auth.signOut()}}>{`Sign Out (${currentUser.currentUser.displayName})`}</div>
                    )
                    :
                    (
                        <Link className='option' to='/signin'>SIGN IN</Link>
                    )
                    
                }
                <CartIcon />
            </div>
            {
                hidden ? null : (
                    <CartDropdown />
                )
            }
        </div>
    )
}

const mapStateToProps = ({user: { currentUser}, cart: { hidden }}) => ({
    currentUser,
    hidden

})

// const Header = connect(mapStateToProps)(headerPure)

// export {Header}

export default connect(mapStateToProps)(Header)


