import axios from "axios";
import { ACTION_TYPES } from "../../actions/actionTypes";
import { Dispatch } from "react-redux";

interface IPostSignUserParams {
  name: string;
  affiliation: string;
  email: string;
  organization: string;
  comment: string;
}

export function changeSignListSearchQuery(searchQuery: string) {
  return {
    type: ACTION_TYPES.SIGN_LIST_CHANGE_SEARCH_INPUT,
    payload: {
      searchQuery,
    },
  };
}

export function reachScrollTop() {
  return {
    type: ACTION_TYPES.HEADER_REACH_SCROLL_TOP,
  };
}

export function leaveScrollTop() {
  return {
    type: ACTION_TYPES.HEADER_LEAVE_SCROLL_TOP,
  };
}

export function reachBoxMovingHeight() {
  return {
    type: ACTION_TYPES.SIGN_BOX_REACH_BOX_MOVING_HEIGHT,
  };
}

export function leaveBoxMovingHeight() {
  return {
    type: ACTION_TYPES.SIGN_BOX_LEAVE_BOX_MOVING_HEIGHT,
  };
}

export function changeSignBoxNameInput(name: string) {
  return {
    type: ACTION_TYPES.SIGN_BOX_CHANGE_NAME_INPUT,
    payload: {
      name,
    },
  };
}

export function changeSignBoxAffiliation(affiliation: string) {
  return {
    type: ACTION_TYPES.SIGN_BOX_CHANGE_AFFILIATION,
    payload: {
      affiliation,
    },
  };
}

export function changeSignBoxAffiliationEmail(affiliationEmail: string) {
  return {
    type: ACTION_TYPES.SIGN_BOX_CHANGE_AFFILIATION_EMAIL,
    payload: {
      affiliationEmail,
    },
  };
}

export function changeSignBoxCommentInput(comment: string) {
  return {
    type: ACTION_TYPES.SIGN_BOX_CHANGE_COMMENT,
    payload: {
      comment,
    },
  };
}

export function postSignUser({ name, affiliation, email, organization, comment }: IPostSignUserParams) {
  return async (dispatch: Dispatch<any>) => {
    dispatch({
      type: ACTION_TYPES.SIGN_LIST_START_TO_POST_USERS,
    });

    try {
      await axios.post("https://uunwh2xzgg.execute-api.us-east-1.amazonaws.com/production/sendSheet", {
        name,
        affiliation,
        email,
        organization,
        comment,
      });

      dispatch({
        type: ACTION_TYPES.GLOBAL_ADD_USER,
        payload: {
          user: {
            name,
            affiliation,
            date: new Date(),
          },
        },
      });
    } catch (err) {
      alert(err);
      dispatch({
        type: ACTION_TYPES.SIGN_LIST_FAILED_TO_POST_USERS,
      });
    }
  };
}

export function fetchUsersData(page: number) {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: ACTION_TYPES.SIGN_LIST_START_TO_FETCH_USERS,
      });

      const result = await axios.get(
        `https://uunwh2xzgg.execute-api.us-east-1.amazonaws.com/production/getUsers?page=${page}`,
      );

      const userList = result.data;
      if (!result.data || result.data.length === 0) {
        dispatch({ type: ACTION_TYPES.SIGN_LIST_END_TO_FETCH_USERS });
      } else {
        dispatch({
          type: ACTION_TYPES.GLOBAL_GET_USERS,
          payload: {
            users: userList,
            page: page + 1,
          },
        });
      }
    } catch (err) {
      dispatch({ type: ACTION_TYPES.SIGN_LIST_FAILED_TO_FETCH_USERS });
    }
  };
}
