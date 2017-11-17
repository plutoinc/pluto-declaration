import * as React from "react";
import * as moment from "moment";
import { IUserInformation } from "../../../../reducers/users";
import { List } from "immutable";
import { USER_LIST_SORT_TYPE } from "../../records";
const InfiniteScroll = require("react-infinite-scroller");
const styles = require("./signList.scss");

interface IUserListProps {
  users: List<IUserInformation>;
  page: number;
  isLoading: boolean;
  isEnd: boolean;
  sort: USER_LIST_SORT_TYPE;
  fetchData: () => void;
}

class UserList extends React.PureComponent<IUserListProps, {}> {
  private mapUsers = () => {
    const { users } = this.props;

    return users.map((user, index) => {
      if (user.comment !== undefined && user.comment !== "") {
        return (
          <div key={`userList_${index}`}>
            <li className={styles.userItem}>
              <span className={styles.userItemName}>{user.name}</span>
              <span className={styles.userItemAffiliation}>{user.affiliation}</span>
              <span className={styles.userItemDate}>{moment(parseInt(user.date, 10)).format("M/D/YYYY")}</span>
            </li>
            <div className={styles.userComment}>"{user.comment}"</div>
          </div>
        );
      } else {
        return (
          <li className={styles.userItem} key={`userList_${index}`}>
            <span className={styles.userItemName}>{user.name}</span>
            <span className={styles.userItemAffiliation}>{user.affiliation}</span>
            <span className={styles.userItemDate}>{moment(parseInt(user.date, 10)).format("M/D/YYYY")}</span>
          </li>
        );
      }
    });
  };

  public render() {
    return (
      <div className={styles.joinFormWrapper}>
        <InfiniteScroll
          loadMore={this.props.fetchData}
          hasMore={!this.props.isEnd}
          threshold={400}
          loader={
            <div className={styles.spinner}>
              <div className={styles.bounce1} />
              <div className={styles.bounce2} />
              <div className={styles.bounce3} />
            </div>
          }
        >
          <ul className={styles.userList}>
            <li className={styles.userItemCategory}>
              <span className={styles.userItemName}>Name</span>
              <span className={styles.userItemAffiliation}>Affiliation</span>
              <span className={styles.userItemDate}>Date</span>
            </li>
            {this.mapUsers()}
          </ul>
        </InfiniteScroll>
      </div>
    );
  }
}

export default UserList;
