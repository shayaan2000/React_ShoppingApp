import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

// we store middlewares in an array
const middlewares = [logger];

//store
const store = createStore(rootReducer, applyMiddleware(...middlewares)); //spreading middleware so all in array are sent

export default store;
