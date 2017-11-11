import { IReduxAction } from "../../typings/actionType";
import { IHomeStateRecord, HOME_INITIAL_STATE } from "./records";
import { ACTION_TYPES } from "../../actions/actionTypes";

export function reducer(state = HOME_INITIAL_STATE, action: IReduxAction<any>): IHomeStateRecord {
  switch (action.type) {
    case ACTION_TYPES.SIGN_LIST_CHANGE_SEARCH_INPUT: {
      return state.set("signListSearchQuery", action.payload.searchQuery);
    }

    default:
      return state;
  }
}
