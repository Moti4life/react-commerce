import React from 'react';
import { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';

import { selectCurrentUser } from './redux/user/user-selector';

import { checkUserSession } from './redux/user/user-actions';

// for adding local test data to firebase
/* import { selectCollectionsForPreview } from './redux/shop/shop-selectors';
import { addCollectionAndDocuments } from './firebase/firebase.utils'; */

// pages
import {HomePage} from './pages/homepage/homepage.component'
import ShopPage from './pages/shopPage/shop.component'
import { SignInAndSignUpPage } from './pages/sign-in-and-up-page/sign-in-and-up-page.component';
import CheckoutPage from './pages/checkout-page/checkout.component';

// style
import './App.css';

const App = ({ checkSession, currentUser }) => {
  
  // unsubscribeFromAuth = null

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth()
  // }

  useEffect( () => {
    checkSession()
    
  },[checkSession])
  // pass an empty array to run like componentDidMount
  // will listen to the changes in anything inside the array

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' render={ () => (
          currentUser ?(
            <Redirect to='/' />
          ) : (
            <SignInAndSignUpPage />
          )
          

        )} />
      </Switch>
    </div>
  )
  
  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  
})

const mapDispatchToProps = (dispatch) => ({
  // setCurrentUser: user => dispatch(setCurrentUser(user))
  checkSession: () => dispatch(checkUserSession())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps 
)(App)