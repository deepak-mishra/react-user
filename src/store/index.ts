import {createStore, applyMiddleware, Action} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, {ThunkDispatch} from "redux-thunk";
import rootReducer from "../reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type  AppDispatch = ThunkDispatch<RootState, void, Action>;
