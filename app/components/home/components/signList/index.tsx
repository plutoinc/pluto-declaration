import * as React from "react";
import { withStyles } from "../../../../helpers/withStylesHelper";
import UserList from "./userList";
import { IUsersRecord } from "../../../../reducers/users";
import { USER_LIST_SORT_TYPE } from "../../records";
const styles = require("./signList.scss");

interface ISignListComponentProps {
  signListSearchQuery: string;
  changeSignListSearchQuery: (searchQuery: string) => void;
  users: IUsersRecord;
  page: number;
  isLoading: boolean;
  isEnd: boolean;
  sort: USER_LIST_SORT_TYPE;
  usersCount: number;
  fetchData: () => void;
  fetchUserCount: () => void;
}

@withStyles<typeof SignList>(styles)
export default class SignList extends React.PureComponent<ISignListComponentProps, {}> {
  public componentDidMount() {
    this.props.fetchUserCount();
  }

  public render() {
    const { users, page, isLoading, isEnd, sort, fetchData, usersCount } = this.props;

    return (
      <div className={styles.signListContainer}>
        <div className={styles.title}>
          <span className={styles.number}>{usersCount}</span> People have signed
        </div>
        <UserList
          users={users.users}
          page={page}
          isLoading={isLoading}
          isEnd={isEnd}
          sort={sort}
          fetchData={fetchData}
        />
      </div>
    );
  }
}
