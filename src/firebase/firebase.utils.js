
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'



const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASEAPIKEY,
    authDomain: "react-commerce-app1.firebaseapp.com",
    projectId: "react-commerce-app1",
    storageBucket: "react-commerce-app1.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASEMESSAGINGSENDERID,
    appId: "1:560255161139:web:c79b0cb9b76094519b6446",
    measurementId: "G-S0PFGQE53C"
}

firebase.initializeApp(firebaseConfig)


const auth = firebase.auth()
const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

const signInWithGoogle = () => {
    auth.signInWithPopup(provider)
}


export {auth , firestore, signInWithGoogle} 
