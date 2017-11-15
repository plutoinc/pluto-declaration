import * as React from "react";
import { Link } from "react-router-dom";

import { withStyles } from "../../helpers/withStylesHelper";
const styles = require("./footer.scss");

interface IFooterComponentProps {}

@withStyles<typeof Footer>(styles)
export default class Footer extends React.PureComponent<IFooterComponentProps, {}> {
  public render() {
    return (
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <span className={styles.title}>© 2017 Pluto Nerwork. All rights reserved</span>
          <div className={styles.rightBox}>
            <Link className={styles.rightBoxItem} to="/">
              About us
            </Link>
            <a className={styles.rightBoxItem} href="mailto:team@pluto.network">
              Contact us
            </a>
            <a target="_blank" className={styles.rightBoxItem} href="https://medium.com/pluto-network">
              Blog
            </a>
          </div>
        </div>
      </footer>
    );
  }
}
