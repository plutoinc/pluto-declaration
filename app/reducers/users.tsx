import { List } from "immutable";
import { TypedRecord, makeTypedFactory } from "typed-immutable-record";
import { IReduxAction } from "../typings/actionType";
import { ACTION_TYPES } from "../actions/actionTypes";

export interface IUserInformation {
  name: string;
  affiliation: string;
  date: Date;
}

export interface IUsers {
  users: List<IUserInformation>;
}

export interface IUsersRecord extends TypedRecord<IUsersRecord>, IUsers {}

const initialUsers: IUsers = {
  users: List(),
};

export const usersFactory = makeTypedFactory<IUsers, IUsersRecord>(initialUsers);

export const USERS_INITIAL_STATE = usersFactory();

export function reducer(state = USERS_INITIAL_STATE, action: IReduxAction<any>): IUsersRecord {
  switch (action.type) {
    case ACTION_TYPES.GLOBAL_GET_USERS: {
      return state.set("users", state.users.concat(action.payload.users));
    }

    case ACTION_TYPES.GLOBAL_ADD_USER: {
      return state.set("users", state.users.unshift(action.payload.user));
    }

    default:
      return state;
  }
}
