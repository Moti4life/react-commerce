import UserActionTypes from "./user.types";


//email
export const emailSignInStart = (emailAndPassword) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
})

//google
export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
})


// sign in success and failure
export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
})

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error
})


//user session

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION
})


//sign out

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START
})

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS
})

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error
})

//sign up userDetails as object

export const signUpStart = (userDetails) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userDetails
})

// { user, additionalData } destructured
export const signUpSuccess = ({ user, additionalData }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData }
})

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error
})