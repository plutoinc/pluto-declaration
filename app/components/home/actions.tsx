import axios from "axios";
import * as moment from "moment";
import { ACTION_TYPES } from "../../actions/actionTypes";
import { Dispatch } from "react-redux";
import FileNameMaker from "../../helpers/fileNameMaker";

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
      searchQuery
    }
  };
}

export function changeSignBoxNameInput(name: string) {
  return {
    type: ACTION_TYPES.SIGN_BOX_CHANGE_NAME_INPUT,
    payload: {
      name
    }
  };
}

export function checkValidSignBoxNameInput(name: string) {
  const isNameTooShort = name.length < 1;

  if (isNameTooShort) {
    return {
      type: ACTION_TYPES.SIGN_BOX_FORM_ERROR,
      payload: {
        type: "nameInput"
      }
    };
  } else {
    return {
      type: ACTION_TYPES.SIGN_BOX_REMOVE_FORM_ERROR,
      payload: {
        type: "nameInput"
      }
    };
  }
}

export function changeSignBoxAffiliation(affiliation: string) {
  return {
    type: ACTION_TYPES.SIGN_BOX_CHANGE_AFFILIATION,
    payload: {
      affiliation
    }
  };
}

export function checkValidSignBoxAffiliation(affiliation: string) {
  const isAffiliationTooShort = affiliation.length < 1;

  if (isAffiliationTooShort) {
    return {
      type: ACTION_TYPES.SIGN_BOX_FORM_ERROR,
      payload: {
        type: "affiliationInput"
      }
    };
  } else {
    return {
      type: ACTION_TYPES.SIGN_BOX_REMOVE_FORM_ERROR,
      payload: {
        type: "affiliationInput"
      }
    };
  }
}

export function changeSignBoxAffiliationEmail(affiliationEmail: string) {
  return {
    type: ACTION_TYPES.SIGN_BOX_CHANGE_AFFILIATION_EMAIL,
    payload: {
      affiliationEmail
    }
  };
}

export function checkValidSignBoxAffiliationEmail(affiliationEmail: string) {
  // e-mail empty check && e-mail validation by regular expression
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValidEmail = reg.test(affiliationEmail) && affiliationEmail !== "" && affiliationEmail.length > 0;

  if (!isValidEmail) {
    return {
      type: ACTION_TYPES.SIGN_BOX_FORM_ERROR,
      payload: {
        type: "affiliationEmailInput"
      }
    };
  } else {
    return {
      type: ACTION_TYPES.SIGN_BOX_REMOVE_FORM_ERROR,
      payload: {
        type: "affiliationEmailInput"
      }
    };
  }
}

export function changeSignBoxCommentInput(comment: string) {
  return {
    type: ACTION_TYPES.SIGN_BOX_CHANGE_COMMENT,
    payload: {
      comment
    }
  };
}

export function getUserCount() {
  return async (dispatch: Dispatch<any>) => {
    try {
      const result = await axios.get("https://uunwh2xzgg.execute-api.us-east-1.amazonaws.com/production/getUserCount");
      const usersCount = result.data;
      dispatch({
        type: ACTION_TYPES.GLOBAL_SET_USER_COUNT,
        payload: {
          count: usersCount
        }
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
  sendEmailChecked
}: IPostSignUserParams) {
  return async (dispatch: Dispatch<any>) => {
    dispatch({
      type: ACTION_TYPES.SIGN_LIST_START_TO_POST_USERS
    });

    // Validating
    let hasFormError: boolean = false;
    // name check
    const isNameTooShort = name.length < 1;

    if (isNameTooShort) {
      dispatch({
        type: ACTION_TYPES.SIGN_BOX_FORM_ERROR,
        payload: {
          type: "nameInput"
        }
      });
      hasFormError = true;
    } else {
      dispatch({
        type: ACTION_TYPES.SIGN_BOX_REMOVE_FORM_ERROR,
        payload: {
          type: "nameInput"
        }
      });
    }
    // affiliation check
    const isAffiliationTooShort = affiliation.length < 1;

    if (isAffiliationTooShort) {
      dispatch({
        type: ACTION_TYPES.SIGN_BOX_FORM_ERROR,
        payload: {
          type: "affiliationInput"
        }
      });
      hasFormError = true;
    } else {
      dispatch({
        type: ACTION_TYPES.SIGN_BOX_REMOVE_FORM_ERROR,
        payload: {
          type: "affiliationInput"
        }
      });
    }
    // e-mail empty check && e-mail validation by regular expression
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = reg.test(email) && email !== "" && email.length > 0;

    if (!isValidEmail) {
      dispatch({
        type: ACTION_TYPES.SIGN_BOX_FORM_ERROR,
        payload: {
          type: "affiliationEmailInput"
        }
      });
      hasFormError = true;
    } else {
      dispatch({
        type: ACTION_TYPES.SIGN_BOX_REMOVE_FORM_ERROR,
        payload: {
          type: "affiliationEmailInput"
        }
      });
    }

    if (hasFormError) {
      dispatch({
        type: ACTION_TYPES.SIGN_LIST_FAILED_TO_POST_USERS
      });
      return;
    }

    try {
      await axios.post("https://uunwh2xzgg.execute-api.us-east-1.amazonaws.com/production/sendSheet", {
        name,
        affiliation,
        email,
        organization,
        comment,
        sendEmailChecked
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
            comment
          }
        }
      });
    } catch (err) {
      alert(err);
      dispatch({
        type: ACTION_TYPES.SIGN_LIST_FAILED_TO_POST_USERS
      });
    }
  };
}

export function subscribeEmail(email: string) {
  return async (dispatch: Dispatch<any>) => {
    dispatch({
      type: ACTION_TYPES.SIGN_BOX_START_TO_SUBSCRIBE_EMAIL
    });
    // e-mail validation by regular expression
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = reg.test(email) && email !== "" && email.length > 0;

    if (isValidEmail) {
      try {
        await axios.post(
          `https://gesqspxc8i.execute-api.us-east-1.amazonaws.com/prod/subscribeMailingList?email=${email}`
        );
        alert("You are on the subscribe list now");
        dispatch({
          type: ACTION_TYPES.SIGN_BOX_SUCCEEDED_TO_SUBSCRIBE_EMAIL
        });
      } catch (err) {
        alert(`Failed to subscribe Email! ${err}`);
        dispatch({
          type: ACTION_TYPES.SIGN_BOX_FAILED_TO_SUBSCRIBE_EMAIL
        });
      }
    } else {
      dispatch({
        type: ACTION_TYPES.SIGN_BOX_FAILED_TO_SUBSCRIBE_EMAIL
      });
    }
  };
}

export function fetchUsersData(page: number) {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: ACTION_TYPES.SIGN_LIST_START_TO_FETCH_USERS
      });

      const result = await axios.get(
        `https://uunwh2xzgg.execute-api.us-east-1.amazonaws.com/production/getUsers?page=${page}`
      );

      const userList = result.data;
      if (!result.data || result.data.length === 0) {
        dispatch({ type: ACTION_TYPES.SIGN_LIST_END_TO_FETCH_USERS });
      } else {
        dispatch({
          type: ACTION_TYPES.GLOBAL_GET_USERS,
          payload: {
            users: userList,
            page: page + 1
          }
        });
      }
    } catch (err) {
      dispatch({ type: ACTION_TYPES.SIGN_LIST_FAILED_TO_FETCH_USERS });
    }
  };
}

export function toggleSendEmailCheckBox() {
  return {
    type: ACTION_TYPES.SIGN_BOX_TOGGLE_SEND_EMAIL_CHECK_BOX
  };
}

export function toggleReadMoreBox() {
  return {
    type: ACTION_TYPES.DECLARATION_TOGGLE_READ_MORE_BOX
  };
}

export function uploadImage({ imageDataURL }: IUploadImageParams) {
  return async (dispatch: Dispatch<any>) => {
    // const buffer = new Buffer(imageDataURL, "base64");
    // const fileSize = buffer.byteLength;
    // console.log(fileSize, "=== file buffer size");

    // Size validation
    // if (fileSize > process.env.MAX_SIZE_LIMIT) {
    //   return context.done(undefined, {
    //     statusCode: 403,
    //     body: JSON.stringify("File size is too big"),
    //   });
    // }
    try {
      await axios.post("https://uunwh2xzgg.execute-api.us-east-1.amazonaws.com/production/uploadImage", {
        buffer: imageDataURL,
        fileId: FileNameMaker.getNewFileId(),
        fileName: FileNameMaker.getNewFileName()
      });
    } catch (err) {
      alert(err);
      dispatch({
        type: ACTION_TYPES.SIGN_LIST_FAILED_TO_POST_USERS
      });
    }
  };
}
