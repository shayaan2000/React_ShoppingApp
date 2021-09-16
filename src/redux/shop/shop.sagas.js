import { takeEvery, call, put } from "@redux-saga/core/effects";
import ShopActionTypes from "./shop.types";
import { collection } from "@firebase/firestore";
import { getDocs } from "@firebase/firestore";
import {
  convertCollectionsSnapshotToMap,
  firestore,
} from "../../firebase/firebase.util";

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

export function* fetchCollectionsAsync() {
  //fired whenever action of FetchCollectionsStart called
  yield console.log(":I am fired");

  try {
    const collectionRef = collection(firestore, "collection");
    const snapshot = yield getDocs(collectionRef);

    //call is the effect inside generator that invokes the method, to yield in case call takes longer than expected
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    ); //(function, param1, param2,...paramX)

    // put is alternate to dispatch. User for actions
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }

  //thunk code for reference
  // getDocs(collectionRef)
  //   .then((snapshot) => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //     dispatch(fetchCollectionsSuccess(collectionsMap));
  //   })
  //   .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
}

//first saga
export function* fetchCollectionsStart() {
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
