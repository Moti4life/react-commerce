import { call, all } from "@redux-saga/core/effects";

//import the sagas

//shop sagas
import { shopSagas } from "./shop/shop-sagas";

//user sagas
import { userSagas } from "./user/user-sagas";

//cart sagas
import { cartSagas } from "./cart/cart-sagas";

export default function* rootSaga() {
    yield all([
        call(shopSagas),
        call(userSagas),
        call(cartSagas)
    ])

}