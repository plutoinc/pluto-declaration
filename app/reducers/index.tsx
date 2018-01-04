import * as Redux from "redux";
import { routerReducer } from "react-router-redux";

// Home Reducer & Record
import * as homeReducer from "../components/home/reducer";
import { IHomeStateRecord, HOME_INITIAL_STATE } from "../components/home/records";

// User Data Record
import * as usersReducer from "./users";
import { IUsersRecord, USERS_INITIAL_STATE } from "./users";

export interface IAppState {
  routing?: any;
  home: IHomeStateRecord;
  users: IUsersRecord;
}

export const initialState: IAppState = {
  home: HOME_INITIAL_STATE,
  users: USERS_INITIAL_STATE,
};

export const rootReducer = Redux.combineReducers<IAppState>({
  routing: routerReducer,
  home: homeReducer.reducer,
  users: usersReducer.reducer,
});
