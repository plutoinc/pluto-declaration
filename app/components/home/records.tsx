import { TypedRecord, makeTypedFactory, recordify } from "typed-immutable-record";

export enum USER_LIST_SORT_TYPE {
  DATE,
  NAME,
  AFFILIATION,
}

export interface IHomeState {
  alreadySigned: boolean;
  isLoading: boolean; // For post user
  hasError: boolean; // For post user
  usersCount: number;
  signListSearchQuery: string;
  nameInput: string;
  affiliationInput: string;
  affiliationEmailInput: string;
  commentInput: string;
  sendEmailChecked: boolean;
  userListIsLoading: boolean;
  userListIsEnd: boolean;
  userListPage: number;
  userListSort: USER_LIST_SORT_TYPE;
  formInputErrorCheck: ISignBoxFormInputErrorCheckRecord;
  isReadMoreBoxToggled: boolean;
}

export interface IHomeStateRecord extends TypedRecord<IHomeStateRecord>, IHomeState {}

export interface ISignBoxFormInputErrorCheck {
  nameInput: boolean;
  affiliationInput: boolean;
  affiliationEmailInput: boolean;
}

export interface ISignBoxFormInputErrorCheckRecord
  extends TypedRecord<ISignBoxFormInputErrorCheckRecord>,
    ISignBoxFormInputErrorCheck {}

export const initialErrorCheck: ISignBoxFormInputErrorCheckRecord = recordify({
  nameInput: false,
  affiliationInput: false,
  affiliationEmailInput: false,
});

const initialHomeState: IHomeState = {
  alreadySigned: false,
  isLoading: false,
  hasError: false,
  usersCount: 0,
  signListSearchQuery: "",
  nameInput: "",
  affiliationInput: "",
  affiliationEmailInput: "",
  commentInput: "",
  sendEmailChecked: true,
  userListIsLoading: false,
  userListIsEnd: false,
  userListPage: 0,
  userListSort: USER_LIST_SORT_TYPE.DATE,
  formInputErrorCheck: initialErrorCheck,
  isReadMoreBoxToggled: false,
};

export const HomeStateFactory = makeTypedFactory<IHomeState, IHomeStateRecord>(initialHomeState);

export const HOME_INITIAL_STATE = HomeStateFactory();
