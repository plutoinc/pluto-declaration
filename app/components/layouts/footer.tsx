import * as React from "react";

import { withStyles } from "../../helpers/withStylesHelper";
import { trackAndOpenLink } from "../../helpers/handleGA";
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
            <a
              onClick={() => {
                trackAndOpenLink("https://pluto.network", "footer");
              }}
              className={styles.rightBoxItem}
            >
              Home page
            </a>
            <a
              onClick={() => {
                trackAndOpenLink("mailto:team@pluto.network", "footer");
              }}
              className={styles.rightBoxItem}
            >
              Contact us
            </a>
            <a
              onClick={() => {
                trackAndOpenLink("https://medium.com/pluto-network", "footer");
              }}
              className={styles.rightBoxItem}
            >
              Blog
            </a>
          </div>
        </div>
      </footer>
    );
  }
}
