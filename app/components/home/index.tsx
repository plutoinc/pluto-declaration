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
import SignBox from "./components/signBox";
import { throttle } from "lodash";

const styles = require("./home.scss");
const BOX_MOVING_HEIGHT = 483;

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
  public componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  public componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
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

  public render() {
    const {
      signListSearchQuery,
      isBoxMovingHeight,
      nameInput,
      affiliationInput,
      affiliationEmailInput,
      commentInput,
    } = this.props.homeState;
    return (
      <div className={styles.homeContainer}>
        <Helmet title="Join Pluto Network!" />
        <Declaration />
        <div className={styles.signContainer}>
          <SignList
            changeSignListSearchQuery={this.changeSignListSearchQuery}
            signListSearchQuery={signListSearchQuery}
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
          />
        </div>
        <JoinForm />
        <UserList />
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomeComponent);
