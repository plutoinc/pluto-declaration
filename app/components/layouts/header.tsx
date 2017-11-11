import * as React from "react";
import { Link } from "react-router-dom";

import { withStyles } from "../../helpers/withStylesHelper";
const styles = require("./header.scss");

interface IHeaderComponentProps {}

@withStyles<typeof Header>(styles)
export default class Header extends React.PureComponent<IHeaderComponentProps, {}> {
  public render() {
    return (
      <nav className={styles.navbar}>
        <div className={styles.headerContainer}>
          <span className={styles.title}>The future of Scholarly Communication</span>
          <div className={styles.rightBox}>
            <Link className={styles.rightBoxItem} to="/">
              About us
            </Link>
            <Link className={styles.rightBoxItem} to="/">
              Home page
            </Link>
            |
            <Link className={styles.rightBoxItem} to="/">
              Facebook
            </Link>
            |
            <Link className={styles.rightBoxItem} to="/">
              Twitter
            </Link>
            |
            <Link className={styles.rightBoxItem} to="/">
              Blog
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
