import React from 'react';
import { useEffect } from 'react';
import { lazy } from 'react';
import { Suspense } from 'react';
// React.lazy currently only supports default exports. If the module you want to import uses named exports, you can create an intermediate module that reexports it as the default. This ensures that tree shaking keeps working and that you don’t pull in unused components.

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
// import HomePage from './pages/homepage/homepage.component'
// import ShopPage from './pages/shopPage/shop.component'
// import SignInAndSignUpPage from './pages/sign-in-and-up-page/sign-in-and-up-page.component';
// import CheckoutPage from './pages/checkout-page/checkout.component';

import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

// style
import './App.css';

// lazy
// const  = lazy( () => import('') ) 
const HomePage = lazy( () => import('./pages/homepage/homepage.component'))
const ShopPage = lazy( () => import('./pages/shopPage/shop.component') ) 
const SignInAndSignUpPage = lazy( () => import('./pages/sign-in-and-up-page/sign-in-and-up-page.component') ) 
const CheckoutPage = lazy( () => import('./pages/checkout-page/checkout.component') ) 

// import { GlobalStyle } from './global.style';

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
      {/* <GlobalStyle /> */}
      <Header />
      <Switch>
        <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Route exact path='/' component={HomePage} />
        {/* <Route exact path='/' component={HomePage} /> */}
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' render={ () => (
          currentUser ?(
            <Redirect to='/' />
            ) : (
              <SignInAndSignUpPage />
              )
              
              
              )} />
        </Suspense>
        </ErrorBoundary>
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