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
              href="https://pluto.network"
              target="_blank"
              onClick={() => {
                trackAndOpenLink("footerHomePage");
              }}
              className={styles.rightBoxItem}
            >
              Home page
            </a>
            <a
              href="mailto:team@pluto.network"
              target="_blank"
              onClick={() => {
                trackAndOpenLink("footerContactUs");
              }}
              className={styles.rightBoxItem}
            >
              Contact us
            </a>
            <a
              href="https://medium.com/pluto-network"
              target="_blank"
              onClick={() => {
                trackAndOpenLink("footerBlog");
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
