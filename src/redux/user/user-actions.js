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


// success and failure
export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
})

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error
})

