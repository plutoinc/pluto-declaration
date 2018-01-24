import * as React from "react";
import { withStyles } from "../../helpers/withStylesHelper";
import Icon from "../../icons";
import { trackAndOpenLink } from "../../helpers/handleGA";

const styles = require("./header.scss");

interface IHeaderComponentProps {}
interface IHeaderComponentStates {
  isMenuOpen: boolean;
}

@withStyles<typeof Header>(styles)
class Header extends React.PureComponent<IHeaderComponentProps, IHeaderComponentStates> {
  constructor(props: IHeaderComponentProps) {
    super(props);

    this.state = {
      isMenuOpen: false,
    };
  }

  private toggleMobileMenu = () => {
    const curState = this.state.isMenuOpen;

    this.setState({ isMenuOpen: !curState });
  };

  public render() {
    return (
      <nav className={styles.navbar}>
        <div
          className={`${styles.menuListOverlay} ${this.state.isMenuOpen ? styles.isOpen : ""}`}
          onClick={this.toggleMobileMenu}
        />
        <div className={`${styles.headerContainer} ${this.state.isMenuOpen ? styles.isOpen : ""}`}>
          <span className={styles.title}>The future of Scholarly Communication</span>
          <div className={styles.rightBox}>
            <span className={styles.aboutUs}>About us</span>
            <a
              href="https://pluto.network"
              target="_blank"
              onClick={() => {
                trackAndOpenLink("headerHomePage");
              }}
              className={styles.rightBoxItem}
            >
              Home page
            </a>
            <span className={styles.separatorLine} />
            <a
              href="https://www.facebook.com/PlutoNetwork"
              target="_blank"
              onClick={() => {
                trackAndOpenLink("headerFacebook");
              }}
              className={styles.rightBoxItem}
            >
              Facebook
            </a>
            <span className={styles.separatorLine} />
            <a
              href="https://twitter.com/pluto_network"
              target="_blank"
              onClick={() => {
                trackAndOpenLink("headerTwitter");
              }}
              className={styles.rightBoxItem}
            >
              Twitter
            </a>
            <span className={styles.separatorLine} />
            <a
              href="https://medium.com/pluto-network"
              target="_blank"
              onClick={() => {
                trackAndOpenLink("headerBlog");
              }}
              className={styles.rightBoxItem}
            >
              Blog
            </a>
          </div>
          <div className={styles.mobileBtn} onClick={this.toggleMobileMenu}>
            <Icon icon="MOBILE_MENU_OPEN" className={styles.menuOpen} />
            <Icon icon="MOBILE_MENU_CLOSE" className={styles.menuClose} />
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
