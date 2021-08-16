import ShopActionTypes from "./shop-types";

// import { firestore } from "../../firebase/firebase.utils";
// import { convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = ( () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
    
}))

/* export const fetchCollectionsStartAsync = () => {
    return (dispatch) => {
        
        const collectionRef = firestore.collection('collections') // title of the collection in the firestore 'collections'
        dispatch(fetchCollectionsStart())

        collectionRef.get().then( (snapshot) => {
            //console.log(snapshot);
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            dispatch(fetchCollectionsSuccess(collectionsMap))
        }).catch( (error) => dispatch( fetchCollectionFailure(error.message) ))
    }
} */

export const fetchCollectionsSuccess = ( (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
}))

export const fetchCollectionFailure = ( (errorMessage) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
}))