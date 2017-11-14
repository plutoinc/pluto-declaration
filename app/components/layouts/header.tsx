import * as React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "../../helpers/withStylesHelper";

const styles = require("./header.scss");

interface IHeaderComponentProps {}

@withStyles<typeof Header>(styles)
class Header extends React.PureComponent<IHeaderComponentProps, {}> {
  public render() {
    return (
      <nav className={styles.navbar}>
        <div className={styles.headerContainer}>
          <span className={styles.title}>The future of Scholarly Communication</span>
          <div className={styles.rightBox}>
            <Link className={styles.rightBoxItem} to="/">
              About us
            </Link>
            <a target="_blank" className={styles.rightBoxItem} href="https://pluto.network">
              Home page
            </a>
            |
            <a target="_blank" className={styles.rightBoxItem} href="https://www.facebook.com/PlutoNetwork">
              Facebook
            </a>
            |
            <a target="_blank" className={styles.rightBoxItem} href="https://twitter.com/pluto_network">
              Twitter
            </a>
            |
            <a target="_blank" className={styles.rightBoxItem} href="https://medium.com/pluto-network">
              Blog
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
