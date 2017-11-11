import { IReduxAction } from "../../typings/actionType";
import { IHomeStateRecord, HOME_INITIAL_STATE } from "./records";
import { ACTION_TYPES } from "../../actions/actionTypes";

export function reducer(state = HOME_INITIAL_STATE, action: IReduxAction<any>): IHomeStateRecord {
  switch (action.type) {
    case ACTION_TYPES.SIGN_LIST_CHANGE_SEARCH_INPUT: {
      return state.set("signListSearchQuery", action.payload.searchQuery);
    }

    case ACTION_TYPES.HEADER_REACH_SCROLL_TOP: {
      return state.set("isTop", true);
    }

    case ACTION_TYPES.HEADER_LEAVE_SCROLL_TOP: {
      return state.set("isTop", false);
    }

    case ACTION_TYPES.SIGN_BOX_REACH_BOX_MOVING_HEIGHT: {
      return state.set("isBoxMovingHeight", true);
    }

    case ACTION_TYPES.SIGN_BOX_LEAVE_BOX_MOVING_HEIGHT: {
      return state.set("isBoxMovingHeight", false);
    }

    default:
      return state;
  }
}
