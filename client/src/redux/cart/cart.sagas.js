import { all, call, takeLatest, put } from "@redux-saga/core/effects";

import { UserActionTypes } from "../user/user.types";
import { clearCart } from "./cart.actions";

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

// listening for on sign out success
export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
