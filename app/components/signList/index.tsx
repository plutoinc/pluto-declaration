import * as React from "react";

import { withStyles } from "../../helpers/withStylesHelper";
const styles = require("./signList.scss");

interface ISignListComponentProps {}

@withStyles<typeof SignList>(styles)
export default class SignList extends React.PureComponent<ISignListComponentProps, {}> {
  public render() {
    return <div className={styles.SignListContainer}>test</div>;
  }
}
