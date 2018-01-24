import axios from "axios";
import * as moment from "moment";
import { ACTION_TYPES } from "../../actions/actionTypes";
import { Dispatch } from "react-redux";
import EnvChecker from "../../helpers/envChecker";
import validateEmail from "../../helpers/validateEmail";

interface IPostSignUserParams {
  name: string;
  affiliation: string;
  email: string;
  organization: string;
  comment: string;
  sendEmailChecked: boolean;
}

interface IUploadImageParams {
  imageDataURL: string;
}

export function changeSignListSearchQuery(searchQuery: string) {
  return {
    type: ACTION_TYPES.SIGN_LIST_CHANGE_SEARCH_INPUT,
    payload: {
      searchQuery,
    },
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

export function checkValidSignBoxNameInput(name: string) {
  const isNameTooShort = name.length < 1;

  if (isNameTooShort) {
    return {
      type: ACTION_TYPES.SIGN_BOX_FORM_ERROR,
      payload: {
        type: "nameInput",
      },
    };
  } else {
    return {
      type: ACTION_TYPES.SIGN_BOX_REMOVE_FORM_ERROR,
      payload: {
        type: "nameInput",
      },
    };
  }
}

export function changeSignBoxAffiliation(affiliation: string) {
  return {
    type: ACTION_TYPES.SIGN_BOX_CHANGE_AFFILIATION,
    payload: {
      affiliation,
    },
  };
}

export function checkValidSignBoxAffiliation(affiliation: string) {
  const isAffiliationTooShort = affiliation.length < 1;

  if (isAffiliationTooShort) {
    return {
      type: ACTION_TYPES.SIGN_BOX_FORM_ERROR,
      payload: {
        type: "affiliationInput",
      },
    };
  } else {
    return {
      type: ACTION_TYPES.SIGN_BOX_REMOVE_FORM_ERROR,
      payload: {
        type: "affiliationInput",
      },
    };
  }
}

export function changeSignBoxAffiliationEmail(affiliationEmail: string) {
  return {
    type: ACTION_TYPES.SIGN_BOX_CHANGE_AFFILIATION_EMAIL,
    payload: {
      affiliationEmail,
    },
  };
}

export function checkValidSignBoxAffiliationEmail(affiliationEmail: string) {
  const isInValidEmail = !validateEmail(affiliationEmail);

  if (isInValidEmail) {
    return {
      type: ACTION_TYPES.SIGN_BOX_FORM_ERROR,
      payload: {
        type: "affiliationEmailInput",
      },
    };
  } else {
    return {
      type: ACTION_TYPES.SIGN_BOX_REMOVE_FORM_ERROR,
      payload: {
        type: "affiliationEmailInput",
      },
    };
  }
}

export function changeSignBoxCommentInput(comment: string) {
  return {
    type: ACTION_TYPES.SIGN_BOX_CHANGE_COMMENT,
    payload: {
      comment,
    },
  };
}

export function getUserCount() {
  return async (dispatch: Dispatch<any>) => {
    try {
      const result = await axios.get(`${EnvChecker.getLambdaHost()}/getUserCount`);
      const usersCount = result.data;
      dispatch({
        type: ACTION_TYPES.GLOBAL_SET_USER_COUNT,
        payload: {
          count: usersCount,
        },
      });
    } catch (err) {
      alert(err);
    }
  };
}

export function postSignUser({
  name,
  affiliation,
  email,
  organization,
  comment,
  sendEmailChecked,
}: IPostSignUserParams) {
  return async (dispatch: Dispatch<any>) => {
    dispatch({
      type: ACTION_TYPES.SIGN_LIST_START_TO_POST_USERS,
    });

    const isNameTooShort = name.length < 1;
    if (isNameTooShort) {
      dispatch({
        type: ACTION_TYPES.SIGN_BOX_FORM_ERROR,
        payload: {
          type: "nameInput",
        },
      });
    } else {
      dispatch({
        type: ACTION_TYPES.SIGN_BOX_REMOVE_FORM_ERROR,
        payload: {
          type: "nameInput",
        },
      });
    }

    const isAffiliationTooShort = affiliation.length < 1;
    if (isAffiliationTooShort) {
      dispatch({
        type: ACTION_TYPES.SIGN_BOX_FORM_ERROR,
        payload: {
          type: "affiliationInput",
        },
      });
    } else {
      dispatch({
        type: ACTION_TYPES.SIGN_BOX_REMOVE_FORM_ERROR,
        payload: {
          type: "affiliationInput",
        },
      });
    }

    const isInValidEmail: boolean = !validateEmail(email);

    if (isInValidEmail) {
      dispatch({
        type: ACTION_TYPES.SIGN_BOX_FORM_ERROR,
        payload: {
          type: "affiliationEmailInput",
        },
      });
    } else {
      dispatch({
        type: ACTION_TYPES.SIGN_BOX_REMOVE_FORM_ERROR,
        payload: {
          type: "affiliationEmailInput",
        },
      });
    }

    const hasFormError = isNameTooShort || isAffiliationTooShort || isInValidEmail;
    if (hasFormError) {
      dispatch({
        type: ACTION_TYPES.SIGN_LIST_FAILED_TO_POST_USERS,
      });
      return;
    }

    try {
      await axios.post(`${EnvChecker.getLambdaHost()}/sendSheet`, {
        name,
        affiliation,
        email,
        organization,
        comment,
        sendEmailChecked,
      });

      const date = new Date();
      const createdAt = moment(date).format("x");

      dispatch({
        type: ACTION_TYPES.GLOBAL_ADD_USER,
        payload: {
          user: {
            name,
            affiliation,
            date: createdAt,
            comment,
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

export function subscribeEmail(email: string) {
  return async (dispatch: Dispatch<any>) => {
    dispatch({
      type: ACTION_TYPES.SIGN_BOX_START_TO_SUBSCRIBE_EMAIL,
    });
    const mailingMicroServiceHost = "https://gesqspxc8i.execute-api.us-east-1.amazonaws.com";
    const isValidEmail: boolean = validateEmail(email);

    if (isValidEmail) {
      try {
        await axios.post(`${mailingMicroServiceHost}/prod/subscribeMailingList?email=${email}`);
        alert("You are on the subscribe list now");
        dispatch({
          type: ACTION_TYPES.SIGN_BOX_SUCCEEDED_TO_SUBSCRIBE_EMAIL,
        });
      } catch (err) {
        alert(`Failed to subscribe Email! ${err}`);
        dispatch({
          type: ACTION_TYPES.SIGN_BOX_FAILED_TO_SUBSCRIBE_EMAIL,
        });
      }
    } else {
      dispatch({
        type: ACTION_TYPES.SIGN_BOX_FAILED_TO_SUBSCRIBE_EMAIL,
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
      const result = await axios.get(`${EnvChecker.getLambdaHost()}/getUsers?page=${page}`);
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

export function toggleSendEmailCheckBox() {
  return {
    type: ACTION_TYPES.SIGN_BOX_TOGGLE_SEND_EMAIL_CHECK_BOX,
  };
}

export function toggleReadMoreBox() {
  return {
    type: ACTION_TYPES.DECLARATION_TOGGLE_READ_MORE_BOX,
  };
}

export function uploadImage({ imageDataURL }: IUploadImageParams) {
  return async (dispatch: Dispatch<any>) => {
    try {
      const fileName = await axios.post(`${EnvChecker.getLambdaHost()}/uploadImage`, imageDataURL);

      return fileName.data;
    } catch (err) {
      alert(err);
      dispatch({
        type: ACTION_TYPES.SIGN_LIST_FAILED_TO_POST_USERS,
      });
    }
  };
}
