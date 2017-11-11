import * as React from "react";
import Helmet from "react-helmet";
import { connect, DispatchProp } from "react-redux";
import { withStyles } from "../../helpers/withStylesHelper";
import JoinForm from "../joinForm";
import UserList from "../userList";
import Declaration from "./components/declaration";
import SignList from "./components/signList";
import { IHomeStateRecord } from "./records";
import { IAppState } from "../../rootReducer";
import * as Actions from "./actions";

const styles = require("./home.scss");

interface IHomeComponentProps extends DispatchProp<IHomeMappedState> {
  homeState: IHomeStateRecord;
}

interface IHomeMappedState {
  homeState: IHomeStateRecord;
}

function mapStateToProps(state: IAppState) {
  return {
    homeState: state.home,
  };
}

@withStyles<typeof HomeComponent>(styles)
class HomeComponent extends React.PureComponent<IHomeComponentProps, {}> {
  private changeSignListSearchQuery = (searchQuery: string) => {
    const { dispatch } = this.props;

    dispatch(Actions.changeSignListSearchQuery(searchQuery));
  };

  public render() {
    const { signListSearchQuery } = this.props.homeState;
    return (
      <div className={styles.homeWrapper}>
        <Helmet title="Join Pluto Network!" />
        <Declaration />
        <SignList
          changeSignListSearchQuery={this.changeSignListSearchQuery}
          signListSearchQuery={signListSearchQuery}
        />
        <JoinForm />
        <UserList />
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomeComponent);
