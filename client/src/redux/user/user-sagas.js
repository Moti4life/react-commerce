import { takeLatest } from "@redux-saga/core/effects";
import { put, all, call } from "@redux-saga/core/effects";

import UserActionTypes from "./user.types";

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from "../../firebase/firebase.utils";

import { signInSuccess,
    signInFailure, 
    signOutFailure, 
    signOutSuccess, 
    signUpSuccess, 
    signUpFailure 
} from "./user-actions";


//user sagas listeners

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onEmailSignUpStart),
        call(onSignUpSuccess)
    ])
}


//getSnapshotFromUserAuth

export function* getSnapshotFromUserAuth(userAuth, additionalData){
    
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData)
        const userSnapshot = yield userRef.get()
        yield put(
            signInSuccess({
                id: userSnapshot.id,
                ...userSnapshot.data()
            })
        )

    } catch (error) {
        yield put(signInFailure(error))
    }
}

//google

export function* signInWithGoogle() {
    yield console.log('fired signInWithGoogle');

    try {
        const { user } = yield auth.signInWithPopup(googleProvider)
        yield getSnapshotFromUserAuth(user)

    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onGoogleSignInStart() { 
    yield takeLatest(
        UserActionTypes.GOOGLE_SIGN_IN_START,
        signInWithGoogle
    )
}




//email saga

export function* signInWithEmail({ payload: { email, password } }) {
    yield console.log('fired signInWithEmail');

    try {
        const { user } = yield auth.signInWithEmailAndPassword( email, password)
        yield getSnapshotFromUserAuth(user)

    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(
        UserActionTypes.EMAIL_SIGN_IN_START,
        signInWithEmail
    )
}

//user Session

export function* isUserAuthenticated() {
    yield console.log('fired isUserAuthenticated')

    try {
        const userAuth = yield getCurrentUser()
        
        if(!userAuth){
            return
        }
        yield getSnapshotFromUserAuth(userAuth)

    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(
        UserActionTypes.CHECK_USER_SESSION,
        isUserAuthenticated
    )
}

// sign out

export function* userSignOut() {
    yield console.log('fired isUserSignOut')

    try {
        yield auth.signOut()
        yield put(signOutSuccess())

    } catch (error) {
        yield put(signOutFailure(error))
    }
}

export function* onSignOutStart() {
    yield takeLatest(
        UserActionTypes.SIGN_OUT_START,
        userSignOut
    )
}

// sign up
export function* signUpWithEmail({ payload: { displayName, email, password  } }) {
    yield console.log('fired signUpWithEmail');

    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password)
        yield put(signUpSuccess({
            user, 
            additionalData: { displayName } 
        }))
    
    } catch (error) {
        yield put(signUpFailure(error))
    }
}


export function* onEmailSignUpStart() {
    yield takeLatest(
        UserActionTypes.SIGN_UP_START,
        signUpWithEmail
    )
}



// then sign in after sign up

export function* signInAfterSignUp({ payload: { user, additionalData }}) {
    yield console.log('fired signInAfterSignUp');

    yield getSnapshotFromUserAuth(user, additionalData)

}

export function* onSignUpSuccess() {
    yield takeLatest(
        UserActionTypes.SIGN_UP_SUCCESS,
        signInAfterSignUp
    )
}






//====================
