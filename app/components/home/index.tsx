import * as React from "react";
import Helmet from "react-helmet";
import { connect, DispatchProp } from "react-redux";
import { withStyles } from "../../helpers/withStylesHelper";
import Declaration from "./components/declaration";
import SignList from "./components/signList";
import { IHomeStateRecord } from "./records";
import { IAppState } from "../../rootReducer";
import * as Actions from "./actions";
import SignBox from "./components/signBox";
import { throttle } from "lodash";
import EnvChecker from "../../helpers/envChecker";
import { IUsersRecord } from "../../reducers/users";

const styles = require("./home.scss");
const BOX_MOVING_HEIGHT = 483;

interface IHomeComponentProps extends DispatchProp<any> {
  homeState: IHomeStateRecord;
  users: IUsersRecord;
}

function mapStateToProps(state: IAppState) {
  return {
    homeState: state.home,
    users: state.users,
  };
}

@withStyles<typeof HomeComponent>(styles)
class HomeComponent extends React.PureComponent<IHomeComponentProps, {}> {
  public componentDidMount() {
    if (!EnvChecker.isServer()) {
      window.addEventListener("scroll", this.handleScroll);
      // START LOAD TWITTER API
      (window as any).twttr = (function(d, s, id) {
        var js: any,
          fjs = d.getElementsByTagName(s)[0],
          t = (window as any).twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function(f: any) {
          t._e.push(f);
        };

        return t;
      })(document, "script", "twitter-wjs");
      // END LOAD TWITTER API
    }
  }

  public componentWillUnmount() {
    if (!EnvChecker.isServer()) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  }

  private handleScrollEvent = () => {
    const { dispatch } = this.props;
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

    if (scrollTop < BOX_MOVING_HEIGHT) {
      dispatch(Actions.reachBoxMovingHeight());
    } else {
      dispatch(Actions.leaveBoxMovingHeight());
    }
  };

  private handleScroll = throttle(this.handleScrollEvent, 100);

  private changeSignListSearchQuery = (searchQuery: string) => {
    const { dispatch } = this.props;

    dispatch(Actions.changeSignListSearchQuery(searchQuery));
  };

  private changeSignBoxNameInput = (name: string) => {
    const { dispatch } = this.props;

    dispatch(Actions.changeSignBoxNameInput(name));
  };

  private changeSignBoxAffiliation = (affiliation: string) => {
    const { dispatch } = this.props;

    dispatch(Actions.changeSignBoxAffiliation(affiliation));
  };

  private changeSignBoxAffiliationEmail = (affiliationEmail: string) => {
    const { dispatch } = this.props;

    dispatch(Actions.changeSignBoxAffiliationEmail(affiliationEmail));
  };

  private changeSignBoxCommentInput = (comment: string) => {
    const { dispatch } = this.props;

    dispatch(Actions.changeSignBoxCommentInput(comment));
  };

  private handleSubmitSignForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { nameInput, affiliationInput, affiliationEmailInput, commentInput } = this.props.homeState;

    await dispatch(
      Actions.postSignUser({
        name: nameInput,
        affiliation: affiliationInput,
        email: affiliationEmailInput,
        organization: affiliationInput,
        comment: commentInput,
      }),
    );
  };

  private fetchUserCount = () => {
    const { dispatch } = this.props;
    dispatch(Actions.getUserCount());
  };

  private fetchData = () => {
    const { dispatch, homeState } = this.props;

    if (!homeState.userListIsLoading) {
      dispatch(Actions.fetchUsersData(homeState.userListPage));
    }
  };

  public render() {
    const {
      signListSearchQuery,
      isBoxMovingHeight,
      nameInput,
      affiliationInput,
      affiliationEmailInput,
      commentInput,
      userListIsLoading,
      userListIsEnd,
      userListPage,
      userListSort,
      isLoading,
      usersCount,
      alreadySigned,
    } = this.props.homeState;
    const { users } = this.props;

    return (
      <div className={styles.homeContainer}>
        <Helmet title="Join Pluto Network!" />
        <Declaration />
        <div className={styles.signContainer}>
          <SignList
            changeSignListSearchQuery={this.changeSignListSearchQuery}
            signListSearchQuery={signListSearchQuery}
            users={users}
            page={userListPage}
            isLoading={userListIsLoading}
            isEnd={userListIsEnd}
            sort={userListSort}
            fetchData={this.fetchData}
            usersCount={usersCount}
            fetchUserCount={this.fetchUserCount}
          />
          <SignBox
            isBoxMovingHeight={isBoxMovingHeight}
            nameInput={nameInput}
            changeSignBoxNameInput={this.changeSignBoxNameInput}
            affiliationInput={affiliationInput}
            changeSignBoxAffiliation={this.changeSignBoxAffiliation}
            affiliationEmailInput={affiliationEmailInput}
            changeSignBoxAffiliationEmail={this.changeSignBoxAffiliationEmail}
            commentInput={commentInput}
            changeSignBoxCommentInput={this.changeSignBoxCommentInput}
            handleSubmitSignForm={this.handleSubmitSignForm}
            isLoading={isLoading}
            alreadySigned={alreadySigned}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomeComponent);
