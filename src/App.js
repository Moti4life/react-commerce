import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import { auth , createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user-actions'
import { selectCurrentUser } from './redux/user/user-selector';

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

class App extends React.Component {
  /* constructor() {
    super()

    this.state = {
      currentUser: null
    }
  } */

/*   unsubscribeFromAuth is initialised as null

  unsubscribeFromAuth is reassigned to the return value
  of calling auth.onAuthStateChanged().
  this method returns another method: firebase.unsubscribe().

  (see docs here: https://firebase.google.com/docs/reference/js/firebase.auth.Auth#returns-firebase.unsubscribe)

  when unsubscribeFromAuth() is called inside the 
  componentWillUnmount, it now has the value of firebase.unsubscribe(), 
  which executes, closing the session.  */

  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged( async (userAuth) => {
     
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        //gets userRef back from firebase then onSnapshot will check for changes
        userRef.onSnapshot( (snapShot) => {
          //console.log(snapShot.data());
          // call redux method to store 
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
            ...snapShot.data()
            }
          }
          /* ,
          () => {
            console.log('');
          } */
          )
        })
        
      }
      else {
        setCurrentUser(userAuth)
      }

      // add local test data to firebase
      /* addCollectionAndDocuments('collections', collectionsArray.map( ({title, items}) => ({
        title,
        items
      }))
      ) */

      //console.log(this.unsubscribeFromAuth);
      //console.log(user.displayName);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render () {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={ () => (
            this.props.currentUser ?(
              <Redirect to='/' />
            ) : (
              <SignInAndSignUpPage />
            )
            

          )} />
        </Switch>
      </div>
    )
  }
  
}

/* const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
}) */

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  
  // for adding local test data to firebase
  /* collectionsArray: selectCollectionsForPreview */

})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App)