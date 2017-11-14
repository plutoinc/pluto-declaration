import * as React from "react";
import * as moment from "moment";
import { withStyles } from "../../../../helpers/withStylesHelper";
import Icon from "../../../../icons";
import CircularProgress from "material-ui/CircularProgress";

const styles = require("./signBox.scss");

interface ISignBoxComponentProps {
  isLoading: boolean;
  alreadySigned: boolean;
  nameInput: string;
  changeSignBoxNameInput: (name: string) => void;
  affiliationInput: string;
  changeSignBoxAffiliation: (affiliation: string) => void;
  affiliationEmailInput: string;
  changeSignBoxAffiliationEmail: (affiliationEmail: string) => void;
  commentInput: string;
  changeSignBoxCommentInput: (comment: string) => void;
  handleSubmitSignForm: (e: React.FormEvent<HTMLFormElement>) => void;
  sendEmailChecked: boolean;
  toggleSendEmailCheckBox: () => void;
}

@withStyles<typeof SignBanner>(styles)
export default class SignBanner extends React.PureComponent<ISignBoxComponentProps, {}> {
  private getSubmitButton = () => {
    const { isLoading } = this.props;

    if (isLoading) {
      return (
        <div className={`${styles.submitButton} ${styles.loadingSubmitButton}`}>
          <CircularProgress
            style={{ display: "flex", position: "absolute", left: "21px", top: "17px" }}
            innerStyle={{ display: "flex" }}
            size={13.5}
            thickness={2}
            color="#656d7c"
          />
          Sign
        </div>
      );
    } else {
      return (
        <button type="submit" className={styles.submitButton}>
          Sign
        </button>
      );
    }
  };

  public render() {
    const {
      nameInput,
      changeSignBoxNameInput,
      affiliationInput,
      changeSignBoxAffiliation,
      affiliationEmailInput,
      changeSignBoxAffiliationEmail,
      commentInput,
      changeSignBoxCommentInput,
      handleSubmitSignForm,
      alreadySigned,
      sendEmailChecked,
      toggleSendEmailCheckBox,
    } = this.props;

    if (alreadySigned) {
      const plutoUrl = encodeURIComponent("https://join.pluto.network");
      const date = new Date();

      return (
        <div className={styles.signBoxContainer}>
          <div className={styles.twitterBoxTitle}>THANK YOU FOR SIGNING!</div>
          <div className={styles.twitterBoxSubTitle}>
            Share with your friends with hashtag
            <span className={styles.twitterBoxSubTitleHashtag}> #FutureOfScholComm</span>
          </div>
          <div className={styles.fakeTwitterBox}>
            <div className={styles.userInformation}>
              <img className={styles.userImg} src="https://d103giazgvc1eu.cloudfront.net/user-photo@2x.jpg" />
              <span className={styles.usernameBox}>
                <div className={styles.username}>{nameInput}</div>
                <div className={styles.affiliation}>{`@${affiliationInput}`}</div>
              </span>
            </div>
            <div className={styles.twitterContent}>
              Lorem ipsum dolor sit amet, cons #FutureOfScholComm elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </div>
            <div className={styles.createdAt}>{moment(date).format("LT - MMM Do YYYY")}</div>
            <img className={styles.fakeActionButton} src="https://d103giazgvc1eu.cloudfront.net/footer-icons@2x.png" />
          </div>
          <a
            className={styles.twitButton}
            href={`https://twitter.com/intent/tweet?text=${commentInput}&url=${plutoUrl}&hashtags=FutureOfScholComm`}
          >
            Share with Twitter
          </a>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmitSignForm} className={styles.signBoxContainer}>
        <div className={styles.title}>Add your name to the list!</div>
        <div className={styles.inputWrapper}>
          <Icon className={styles.iconWrapper} icon="NAME" />
          <input
            type="text"
            onChange={e => {
              changeSignBoxNameInput(e.currentTarget.value);
            }}
            className={`form-control ${styles.inputBox}`}
            placeholder="Name"
            value={nameInput}
          />
        </div>
        <div className={styles.inputWrapper}>
          <Icon className={styles.iconWrapper} icon="AFFILIATION" />
          <input
            type="text"
            onChange={e => {
              changeSignBoxAffiliation(e.currentTarget.value);
            }}
            className={`form-control ${styles.inputBox}`}
            placeholder="Affiliation"
            value={affiliationInput}
          />
        </div>
        <div className={styles.inputWrapper}>
          <Icon className={styles.iconWrapper} icon="EMAIL" />
          <input
            type="email"
            onChange={e => {
              changeSignBoxAffiliationEmail(e.currentTarget.value);
            }}
            className={`form-control ${styles.inputBox}`}
            placeholder="Affiliation E-mail"
            value={affiliationEmailInput}
          />
        </div>
        <div className={styles.caution}>{`* Used to verify identity. It will not be shared or
        displayed.`}</div>
        <div className={styles.commentInputWrapper}>
          <textarea
            onChange={e => {
              changeSignBoxCommentInput(e.currentTarget.value);
            }}
            className={`form-control ${styles.inputBox}`}
            placeholder="Additional comment (Option)"
            value={commentInput}
          />
        </div>
        <div className={styles.checkBoxContainer}>
          <div
            onClick={toggleSendEmailCheckBox}
            className={sendEmailChecked ? styles.checkBox : `${styles.checkBox} ${styles.unChecked}`}
          />
          <span className={styles.checkBoxContent}>Send me email updates about the project (Option)</span>
        </div>
        {this.getSubmitButton()}
      </form>
    );
  }
}
