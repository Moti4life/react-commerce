import { call, all } from "@redux-saga/core/effects";

//import the sagas
import { fetchCollectionsStart } from "./shop/shop-sagas";

//userSagas
import { userSagas } from "./user/user-sagas";

export default function* rootSaga() {
    yield all([
        call(fetchCollectionsStart),
        call(userSagas)
    ])

}