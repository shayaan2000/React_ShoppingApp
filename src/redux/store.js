import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import persistStore from "redux-persist/es/persistStore";
import rootReducer from "./root-reducer";

// we store middlewares in an array
const middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

//store
export const store = createStore(rootReducer, applyMiddleware(...middlewares)); //spreading middleware so all in array are sent

// for persistance
export const persistor = persistStore(store);

// making a variable to avoid warning
const exp = { store, persistor };
export default exp;
