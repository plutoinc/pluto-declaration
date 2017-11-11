import * as React from "react";

import { withStyles } from "../../../../helpers/withStylesHelper";
import Icon from "../../../../icons/index";
const styles = require("./signBox.scss");

interface ISignBoxComponentProps {
  isBoxMovingHeight: boolean;
}

@withStyles<typeof SignBanner>(styles)
export default class SignBanner extends React.PureComponent<ISignBoxComponentProps, {}> {
  public render() {
    // const { isBoxMovingHeight } = this.props;
    return (
      <div
        className={styles.signBoxContainer}
        style={{
          // position: isBoxMovingHeight ? "static" : "fixed",
        }}
      >
        <div className={styles.title}>Add your name to the list!</div>
        <div className={styles.inputWrapper}>
          <Icon className={styles.iconWrapper} icon="TWITTER" />
          <input className={`form-control ${styles.inputBox}`} placeholder="Name" />
        </div>
        <div className={styles.inputWrapper}>
          <Icon className={styles.iconWrapper} icon="TWITTER" />
          <input className={`form-control ${styles.inputBox}`} placeholder="Affiliation" />
        </div>
        <div className={styles.inputWrapper}>
          <Icon className={styles.iconWrapper} icon="TWITTER" />
          <input className={`form-control ${styles.inputBox}`} placeholder="Affiliation E-mail" />
        </div>
        <div className={styles.caution}>{`* Used to verify identity. It will not be shared or
        displayed.`}</div>
        <div className={styles.commentInputWrapper}>
          <textarea className={`form-control ${styles.inputBox}`} placeholder="Additional comment (Option)" />
        </div>
        <div className={styles.checkBoxContainer}>
          <div className={styles.checkBox} />
          <span className={styles.checkBoxContent}>Send me email updates about the project (Option)</span>
        </div>
        <div className={styles.submitButton}>Sign</div>
      </div>
    );
  }
}
