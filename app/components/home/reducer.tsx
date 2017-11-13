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

    case ACTION_TYPES.SIGN_BOX_CHANGE_NAME_INPUT: {
      return state.set("nameInput", action.payload.name);
    }

    case ACTION_TYPES.SIGN_BOX_CHANGE_AFFILIATION: {
      return state.set("affiliationInput", action.payload.affiliation);
    }

    case ACTION_TYPES.SIGN_BOX_CHANGE_AFFILIATION_EMAIL: {
      return state.set("affiliationEmailInput", action.payload.affiliationEmail);
    }

    case ACTION_TYPES.SIGN_BOX_CHANGE_COMMENT: {
      return state.set("commentInput", action.payload.comment);
    }

    case ACTION_TYPES.SIGN_LIST_START_TO_FETCH_USERS: {
      return state.withMutations(currentState => {
        return currentState.set("userListIsLoading", true).set("userListIsEnd", false);
      });
    }

    case ACTION_TYPES.SIGN_LIST_FAILED_TO_FETCH_USERS:
    case ACTION_TYPES.SIGN_LIST_END_TO_FETCH_USERS: {
      return state.withMutations(currentState => {
        return currentState.set("userListIsLoading", false).set("userListIsEnd", true);
      });
    }

    case ACTION_TYPES.SIGN_LIST_START_TO_POST_USERS: {
      return state.set("isLoading", true).set("hasError", false);
    }

    case ACTION_TYPES.GLOBAL_ADD_USER: {
      return state.withMutations(currentState => {
        return currentState
          .set("isLoading", false)
          .set("alreadySigned", true)
          .set("usersCount", currentState.usersCount + 1);
      });
    }

    case ACTION_TYPES.SIGN_LIST_FAILED_TO_POST_USERS: {
      return state.set("isLoading", false).set("hasError", true);
    }

    case ACTION_TYPES.GLOBAL_SET_USER_COUNT: {
      return state.set("usersCount", action.payload.count);
    }

    case ACTION_TYPES.GLOBAL_GET_USERS: {
      return state.withMutations(currentState => {
        return currentState
          .set("userListPage", currentState.userListPage + 1)
          .set("userListIsLoading", false)
          .set("userListIsEnd", false);
      });
    }

    default:
      return state;
  }
}
