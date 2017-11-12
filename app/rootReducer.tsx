import * as Redux from "redux";
import { routerReducer } from "react-router-redux";

// Home Reducer & Record
import * as homeReducer from "./components/home/reducer";
import { IHomeStateRecord, HOME_INITIAL_STATE } from "./components/home/records";

export interface IAppState {
  routing?: any;
  home: IHomeStateRecord;
}

export const initialState: IAppState = {
  home: HOME_INITIAL_STATE,
};

export const rootReducer = Redux.combineReducers<IAppState>({
  routing: routerReducer,
  home: homeReducer.reducer,
});
