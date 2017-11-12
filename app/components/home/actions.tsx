import { ACTION_TYPES } from "../../actions/actionTypes";

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
