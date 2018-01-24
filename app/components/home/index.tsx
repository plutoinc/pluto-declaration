import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { withStyles } from "../../helpers/withStylesHelper";
import Declaration from "./components/declaration";
import SignList from "./components/signList";
import { IHomeStateRecord } from "./records";
import { IAppState } from "../../reducers";
import * as Actions from "./actions";
import SignBox from "./components/signBox";
import EnvChecker from "../../helpers/envChecker";
import { IUsersRecord } from "../../reducers/users";
import { trackAndOpenLink } from "../../helpers/handleGA";
import { loadTwitterApi, loadFacebookApi } from "../../helpers/loadSocialApi";

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
  private drawingCanvas: HTMLCanvasElement;

  public componentDidMount() {
    if (!EnvChecker.isServer()) {
      loadTwitterApi();
      loadFacebookApi();
    }
  }

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
      isReadMoreBoxToggled,
    } = this.props.homeState;
    const { users } = this.props;

    return (
      <div className={styles.homeContainer}>
        <Declaration isReadMoreBoxToggled={isReadMoreBoxToggled} toggleReadMoreBox={this.toggleReadMoreBox} />
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
            shareTwitterWithComposedImage={this.shareTwitterWithComposedImage}
          />
        </div>
        <canvas
          ref={ele => {
            this.drawingCanvas = ele;
          }}
          style={{ display: "none" }}
        />
      </div>
    );
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

  private handleSubmitSignForm = async () => {
    const { dispatch } = this.props;
    const { nameInput, affiliationInput, affiliationEmailInput, commentInput, sendEmailChecked } = this.props.homeState;

    try {
      await dispatch(
        Actions.postSignUser({
          name: nameInput,
          affiliation: affiliationInput,
          email: affiliationEmailInput,
          organization: affiliationInput,
          comment: commentInput,
          sendEmailChecked,
        }),
      );

      if (sendEmailChecked) {
        await dispatch(Actions.subscribeEmail(affiliationEmailInput));
      }
    } catch (err) {
      console.error(err);
    }
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

  private toggleReadMoreBox = () => {
    const { dispatch } = this.props;

    dispatch(Actions.toggleReadMoreBox());
  };

  private shareTwitterWithComposedImage = async () => {
    const { dispatch, homeState } = this.props;
    const { commentInput } = homeState;
    let fileName;
    try {
      const imageUrl: string = await this.drawTextAtImage(commentInput);
      fileName = await dispatch(
        Actions.uploadImage({
          imageDataURL: imageUrl,
        }),
      );
    } catch (err) {
      console.error(err);
    }

    const plutoUrlWithImage = encodeURIComponent(`${EnvChecker.getHost()}/userImage/${fileName}`);

    if (!EnvChecker.isServer()) {
      window.open(
        `https://twitter.com/intent/tweet?text=${commentInput}&url=${plutoUrlWithImage}&hashtags=FutureOfScholComm`,
      );
      trackAndOpenLink("signBannerTwitterShare");
    }
  };

  private drawTextAtImage = (commentInput: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const context = this.drawingCanvas.getContext("2d");
        const background = new Image();
        const backgroundUrl =
          "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?h=350&auto=compress&cs=tinysrgb";
        this.drawingCanvas.width = 600;
        this.drawingCanvas.height = 314;
        background.setAttribute("crossOrigin", "anonymous");
        background.src = backgroundUrl;
        background.onload = () => {
          context.drawImage(background, 0, 0);
          context.font = "20px Roboto";
          context.fillStyle = "#6096ff";
          context.fillText(commentInput, 50, 200);
          const imageUrl = this.drawingCanvas.toDataURL();
          resolve(imageUrl);
        };
      } catch (err) {
        reject(err);
      }
    });
  };
}

export default connect(mapStateToProps)(HomeComponent);
