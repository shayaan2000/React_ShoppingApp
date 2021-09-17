import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
// import thunk from "redux-thunk";
import persistStore from "redux-persist/es/persistStore";
import rootReducer from "./root-reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./roots-saga";
const sagaMiddleware = createSagaMiddleware();

// we store middlewares in an array
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

//store
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
); //spreading middleware so all in array are sent

sagaMiddleware.run(rootSaga);

// for persistance
export const persistor = persistStore(store);

// making a variable to avoid warning
const exp = { store, persistor };
export default exp;
