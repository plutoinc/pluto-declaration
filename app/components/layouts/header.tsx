import * as React from "react";
import { withStyles } from "../../helpers/withStylesHelper";
import Icon from "../../icons";

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
            <a target="_blank" className={styles.rightBoxItem} href="https://pluto.network">
              Home page
            </a>
            <span className={styles.separatorLine} />
            <a target="_blank" className={styles.rightBoxItem} href="https://www.facebook.com/PlutoNetwork">
              Facebook
            </a>
            <span className={styles.separatorLine} />
            <a target="_blank" className={styles.rightBoxItem} href="https://twitter.com/pluto_network">
              Twitter
            </a>
            <span className={styles.separatorLine} />
            <a target="_blank" className={styles.rightBoxItem} href="https://medium.com/pluto-network">
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
