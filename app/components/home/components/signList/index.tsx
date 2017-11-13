import * as React from "react";
import { withStyles } from "../../../../helpers/withStylesHelper";
import UserList from "./userList";
import Icon from "../../../../icons";
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
  fetchData: () => void;
}

@withStyles<typeof SignList>(styles)
export default class SignList extends React.PureComponent<ISignListComponentProps, {}> {
  private getPlaceHolder = () => {
    const { signListSearchQuery } = this.props;

    if (signListSearchQuery === "") {
      return (
        <div className={styles.placeHolder}>
          Search by <span className={styles.bold}>Name</span> or <span className={styles.bold}>Affiliation</span>
        </div>
      );
    }
  };

  public render() {
    const {
      signListSearchQuery,
      changeSignListSearchQuery,
      users,
      page,
      isLoading,
      isEnd,
      sort,
      fetchData,
    } = this.props;

    return (
      <div className={styles.signListContainer}>
        <div className={styles.title}>
          <span className={styles.number}>828</span> People have signed
        </div>
        <div className={styles.searchBar}>
          {this.getPlaceHolder()}
          <input
            onChange={e => {
              changeSignListSearchQuery(e.currentTarget.value);
            }}
            className={`form-control ${styles.inputBox}`}
            value={signListSearchQuery}
          />
          Search!!
          <Icon className={styles.searchIconWrapper} icon="SEARCH" />
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
