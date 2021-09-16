import ShopActionTypes from "./shop.types";
import {
  convertCollectionsSnapshotToMap,
  firestore,
} from "../../firebase/firebase.util";
import { onSnapshot } from "firebase/firestore";
import { collection } from "@firebase/firestore";
import { getDocs } from "@firebase/firestore";
export const fetchCollectionsStart = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
  payload: collectionsMap,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollecctionsStartAsync = () => {
  return (dispatch) => {
    const collectionRef = collection(firestore, "collection");
    dispatch(fetchCollectionsStart());

    getDocs(collectionRef)
      .then((snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch((error) => dispatch(fetchCollectionsFailure(error.message)));

    //old obsevable pattern as compared to the promise pattern now^
    /*    onSnapshot(collectionRef, async (snapShot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
      // have the final formatted data here
      dispatch(fetchCollectionsSuccess(collectionsMap)); //will fire it in reducer and make is fetch false
    }); */
  };
};
