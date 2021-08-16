import { takeEvery } from "@redux-saga/core/effects";
import { call } from "@redux-saga/core/effects";
import { put } from "@redux-saga/core/effects";

import { firestore } from "../../firebase/firebase.utils";
import { convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

import { fetchCollectionsSuccess } from "./shop-actions";
import { fetchCollectionFailure } from "./shop-actions";

import ShopActionTypes from "./shop-types";

//gen function* needs yield

export function* fetchCollectionsAsync() {
    yield console.log('fired fetchCollectionsAsync');
           
    try {
        const collectionRef = firestore.collection('collections') // title of the collection in the firestore 'collections'
        const snapshot = yield collectionRef.get()
        const collectionsMap = yield call(
            convertCollectionsSnapshotToMap, 
            snapshot
        )
        yield put(fetchCollectionsSuccess(collectionsMap))

    } catch (error) {
        yield put(fetchCollectionFailure(error.message))
    }   
     
    
}

//takeEvery is a non blocking call
export function* fetchCollectionsStart() {
    yield takeEvery(
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync
    )
}

