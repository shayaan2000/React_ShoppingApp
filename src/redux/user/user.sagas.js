import { takeLatest, put, all, call } from "@redux-saga/core/effects";
import { UserActionTypes } from "./user.types";
import {
  googleProvider,
  auth,
  createUserProfileDocument,
} from "../../firebase/firebase.util";
import { googleSignInSuccess, googleSignInFailure } from "./user.actions";
import { signInWithPopup } from "@firebase/auth";
import { getDoc } from "@firebase/firestore";
export function* signInWithGoogle() {
  try {
    const { user } = yield signInWithPopup(auth, googleProvider);
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapshot = yield getDoc(userRef);
    yield put(
      googleSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
  } catch (error) {
    yield put(googleSignInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart)]);
}
