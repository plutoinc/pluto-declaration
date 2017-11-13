import * as React from "react";

import { withStyles } from "../../../../helpers/withStylesHelper";
import Icon from "../../../../icons";
const styles = require("./signBox.scss");

interface ISignBoxComponentProps {
  isBoxMovingHeight: boolean;
  isLoading: boolean;
  nameInput: string;
  changeSignBoxNameInput: (name: string) => void;
  affiliationInput: string;
  changeSignBoxAffiliation: (affiliation: string) => void;
  affiliationEmailInput: string;
  changeSignBoxAffiliationEmail: (affiliationEmail: string) => void;
  commentInput: string;
  changeSignBoxCommentInput: (comment: string) => void;
  handleSubmitSignForm: (e: React.FormEvent<HTMLFormElement>) => void;
}

@withStyles<typeof SignBanner>(styles)
export default class SignBanner extends React.PureComponent<ISignBoxComponentProps, {}> {
  private getSubmitButton = () => {
    const { isLoading } = this.props;

    if (isLoading) {
      return <div className={styles.submitButton}>Uploading ...</div>;
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
    } = this.props;
    // const { isBoxMovingHeight } = this.props;

    return (
      <form
        onSubmit={handleSubmitSignForm}
        className={styles.signBoxContainer}
        style={{
          // position: isBoxMovingHeight ? "static" : "fixed",
        }}
      >
        <div className={styles.title}>Add your name to the list!</div>
        <div className={styles.inputWrapper}>
          <Icon className={styles.iconWrapper} icon="TWITTER" />
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
          <Icon className={styles.iconWrapper} icon="TWITTER" />
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
          <Icon className={styles.iconWrapper} icon="TWITTER" />
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
          <div className={styles.checkBox} />
          <span className={styles.checkBoxContent}>Send me email updates about the project (Option)</span>
        </div>
        {this.getSubmitButton()}
      </form>
    );
  }
}
