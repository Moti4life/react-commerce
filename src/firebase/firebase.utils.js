
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

const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth){
        return
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    //get snapShot
    const snapShot = await userRef.get()
    //console.log(snapShot.data());

    if(!snapShot.exists){
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            //create new document
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef

    // console.log(snapShot);
    // console.log(firestore.doc('users/123123sample'));
}


// add data to firebase
const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

    const collectionRef = firestore.collection(collectionKey)
    console.log('****collectionRef****', collectionRef);

    const batch = firestore.batch()
    objectsToAdd.forEach( obj => {
        const newDocRef = collectionRef.doc()
        //console.log(newDocRef);

        batch.set(newDocRef, obj)
    })

    // fire batch commit
    return await batch.commit()
}

// get data from firebase

const convertCollectionsSnapshotToMap = (collections) => {

    const transformedCollection = collections.docs.map( (doc) => {
        const { title, items } = doc.data()

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })   
    
    //console.log('TRANSFORM COLLECTION', transformedCollection);

    return transformedCollection.reduce( (accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection
        return accumulator
    }, {} )
} 


const auth = firebase.auth()
const firestore = firebase.firestore()


// google provider
export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider)
}


export {
    auth, 
    firestore, 
    createUserProfileDocument, 
    addCollectionAndDocuments,
    convertCollectionsSnapshotToMap

} 
