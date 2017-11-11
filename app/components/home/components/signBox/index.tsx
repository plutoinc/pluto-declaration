import * as React from "react";

import { withStyles } from "../../../../helpers/withStylesHelper";
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
        test
      </div>
    );
  }
}
