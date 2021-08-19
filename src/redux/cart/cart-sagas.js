import { takeLatest, call, put, all } from "@redux-saga/core/effects";

import UserActionTypes from "../user/user.types";
//import CartActionTypes from "./cart-types";

import { clearCartitems } from "./cart-actions";



// the cart clear

export function* clearCart() {
    yield console.log('fired clearCart');
    yield put(clearCartitems())
}

// on click clear *LOOPING*
/* export function* onClearCart() {
    yield takeLatest(
        CartActionTypes.CLEAR_CART,
        clearCart
    )
} */

// sign out clear
export function* onSignOutSuccess() {
    yield takeLatest(
        UserActionTypes.SIGN_OUT_SUCCESS,
        clearCart
    )
}


//cart sagas

export function* cartSagas() {
    yield all([
        //call(onClearCart),
        call(onSignOutSuccess)
    ])
}


