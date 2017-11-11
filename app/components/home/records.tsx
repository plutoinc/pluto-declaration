import { TypedRecord, makeTypedFactory } from "typed-immutable-record";

export interface IHomeState {
  isLoading: boolean;
  isFailed: boolean;
  hasError: boolean;
  signListSearchQuery: string;
  isTop: boolean;
  isBoxMovingHeight: boolean;
}

export interface IHomeStateRecord extends TypedRecord<IHomeStateRecord>, IHomeState {}

const initialHomeState: IHomeState = {
  isLoading: false,
  isFailed: false,
  hasError: false,
  signListSearchQuery: "",
  isTop: true,
  isBoxMovingHeight: false,
};

export const HomeStateFactory = makeTypedFactory<IHomeState, IHomeStateRecord>(initialHomeState);

export const HOME_INITIAL_STATE = HomeStateFactory();
