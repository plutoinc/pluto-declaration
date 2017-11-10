import * as React from "react";
import axios from "axios";
const InfiniteScroll = require("react-infinite-scroller");
const styles = require("./userList.scss");

interface IUserInformation {
  name: string;
  affiliation: string;
}

interface IUserListState {
  users: IUserInformation[];
  page: number;
  isLoading: boolean;
  isEnd: boolean;
}

class UserList extends React.PureComponent<{}, IUserListState> {
  public state = {
    users: [] as IUserInformation[],
    page: 0,
    isLoading: false,
    isEnd: false,
  };

  private mapUsers = () => {
    const { users } = this.state;

    return users.map((user, index) => {
      return <li key={`userList_${index}`}>{`${user.name} - ${user.affiliation}`}</li>;
    });
  };

  private fetchData = async () => {
    const { page, isLoading } = this.state;
    if (isLoading) {
      return;
    }

    try {
      this.setState({ isLoading: true });

      const result = await axios.get(
        `https://uunwh2xzgg.execute-api.us-east-1.amazonaws.com/production/getUsers?page=${page}`,
      );
      const userList = result.data;

      if (!result.data || result.data.length === 0) {
        this.setState({
          isLoading: false,
          isEnd: true,
        });
      } else {
        this.setState({
          users: [...this.state.users, ...userList],
          isLoading: false,
          page: this.state.page + 1,
        });
      }
    } catch (err) {
      this.setState({
        isLoading: false,
      });
      alert(err);
    }
  };

  public render() {
    return (
      <div className={styles.joinFormWrapper}>
        <h1>Signer List</h1>
        <InfiniteScroll
          loadMore={this.fetchData}
          hasMore={!this.state.isEnd}
          threshold={400}
          loader={<div className="loader">Loading ...</div>}
        >
          <ul>{this.mapUsers()}</ul>
        </InfiniteScroll>
      </div>
    );
  }
}

export default UserList;
