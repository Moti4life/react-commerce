import React from 'react';
import { Route, Switch } from 'react-router-dom'


import {HomePage} from './pages/homepage/homepage.component'
import {ShopPage} from './pages/shopPage/shop.component'
import { Header } from './components/header/header.component';
import { SignInAndSignUpPage } from './pages/sign-in-and-up-page/sign-in-and-up-page.component';
import { auth } from './firebase/firebase.utils';


import './App.css';

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentUser: null
    }
  }

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
    this.unsubscribeFromAuth = auth.onAuthStateChanged( (user) => {
      this.setState({ currentUser: user })

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
        <Header 
        currentUser={this.state.currentUser}
        />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    )
  }
  
}

export default App;
