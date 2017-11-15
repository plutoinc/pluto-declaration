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
import EnvChecker from "../../helpers/envChecker";
import { IUsersRecord } from "../../reducers/users";

const styles = require("./home.scss");

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
      // START LOAD FACEBOOK API
      (window as any).facebook = (function(d, s, id) {
        var js: any,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
      // END LOAD FACEBOOK API
    }
  }

  private changeSignListSearchQuery = (searchQuery: string) => {
    const { dispatch } = this.props;

    dispatch(Actions.changeSignListSearchQuery(searchQuery));
  };

  private changeSignBoxNameInput = (name: string) => {
    const { dispatch } = this.props;

    dispatch(Actions.changeSignBoxNameInput(name));
  };

  private checkValidSignBoxNameInput = () => {
    const { dispatch, homeState } = this.props;

    dispatch(Actions.checkValidSignBoxNameInput(homeState.nameInput));
  };

  private changeSignBoxAffiliation = (affiliation: string) => {
    const { dispatch } = this.props;

    dispatch(Actions.changeSignBoxAffiliation(affiliation));
  };

  private checkValidSignBoxAffiliation = () => {
    const { dispatch, homeState } = this.props;

    dispatch(Actions.checkValidSignBoxAffiliation(homeState.affiliationInput));
  };

  private changeSignBoxAffiliationEmail = (affiliationEmail: string) => {
    const { dispatch } = this.props;

    dispatch(Actions.changeSignBoxAffiliationEmail(affiliationEmail));
  };

  private checkValidSignBoxAffiliationEmail = () => {
    const { dispatch, homeState } = this.props;

    dispatch(Actions.checkValidSignBoxAffiliationEmail(homeState.affiliationEmailInput));
  };

  private changeSignBoxCommentInput = (comment: string) => {
    const { dispatch } = this.props;

    dispatch(Actions.changeSignBoxCommentInput(comment));
  };

  private handleSubmitSignForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { nameInput, affiliationInput, affiliationEmailInput, commentInput, sendEmailChecked } = this.props.homeState;

    await dispatch(
      Actions.postSignUser({
        name: nameInput,
        affiliation: affiliationInput,
        email: affiliationEmailInput,
        organization: affiliationInput,
        comment: commentInput,
        sendEmailChecked,
      }),
    ).then(async () => {
      if (sendEmailChecked) {
        await dispatch(Actions.subscribeEmail(affiliationEmailInput));
      }
    }).catch(err=> {
      console.error(err);
    });
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

  private toggleSendEmailCheckBox = () => {
    const { dispatch } = this.props;

    dispatch(Actions.toggleSendEmailCheckBox());
  };

  public render() {
    const {
      signListSearchQuery,
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
      sendEmailChecked,
      formInputErrorCheck,
    } = this.props.homeState;
    const { users } = this.props;

    return (
      <div className={styles.homeContainer}>
        <Helmet title="Join Pluto Network!">
          <meta property="og:url" content="https://join.pluto.network" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="The Future of Scholarly Communication" />
          <meta property="og:description" content="Decentralized Scholarly Communication Platform" />
          <meta
            property="og:image"
            content="https://pbs.twimg.com/profile_images/879901726739808256/ry_UkEdB_400x400.jpg"
          />
        </Helmet>
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
            nameInput={nameInput}
            changeSignBoxNameInput={this.changeSignBoxNameInput}
            checkValidSignBoxNameInput={this.checkValidSignBoxNameInput}
            affiliationInput={affiliationInput}
            changeSignBoxAffiliation={this.changeSignBoxAffiliation}
            checkValidSignBoxAffiliation={this.checkValidSignBoxAffiliation}
            affiliationEmailInput={affiliationEmailInput}
            changeSignBoxAffiliationEmail={this.changeSignBoxAffiliationEmail}
            checkValidSignBoxAffiliationEmail={this.checkValidSignBoxAffiliationEmail}
            commentInput={commentInput}
            changeSignBoxCommentInput={this.changeSignBoxCommentInput}
            handleSubmitSignForm={this.handleSubmitSignForm}
            isLoading={isLoading}
            alreadySigned={alreadySigned}
            sendEmailChecked={sendEmailChecked}
            toggleSendEmailCheckBox={this.toggleSendEmailCheckBox}
            formInputErrorCheck={formInputErrorCheck}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomeComponent);
