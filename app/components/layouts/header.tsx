import * as React from "react";
import { Link } from "react-router-dom";
import { connect, DispatchProp } from "react-redux";
import { withStyles } from "../../helpers/withStylesHelper";
import { IHomeStateRecord } from "../home/records";
import { IAppState } from "../../rootReducer";
import { reachScrollTop, leaveScrollTop } from "../home/actions";
import { throttle } from "lodash";
import EnvChecker from "../../helpers/envChecker";

const styles = require("./header.scss");
const HEADER_BACKGROUND_START_HEIGHT = 10;

interface IHeaderComponentProps extends DispatchProp<IHeaderMappedState> {
  homeState: IHomeStateRecord;
}

interface IHeaderMappedState {
  homeState: IHomeStateRecord;
}

function mapStateToProps(state: IAppState) {
  return {
    homeState: state.home,
  };
}

@withStyles<typeof Header>(styles)
class Header extends React.PureComponent<IHeaderComponentProps, {}> {
  public componentDidMount() {
    if (!EnvChecker.isServer()) {
      window.addEventListener("scroll", this.handleScroll);
    }
  }

  public componentWillUnmount() {
    if (!EnvChecker.isServer()) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  }

  private handleScrollEvent = () => {
    const { dispatch } = this.props;
    const top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

    if (top < HEADER_BACKGROUND_START_HEIGHT) {
      dispatch(reachScrollTop());
    } else {
      dispatch(leaveScrollTop());
    }
  };

  private handleScroll = throttle(this.handleScrollEvent, 100);

  public render() {
    const { homeState } = this.props;
    return (
      <nav className={styles.navbar}>
        <div className={homeState.isTop ? `${styles.headerContainer} ${styles.isTop}` : styles.headerContainer}>
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

export default connect(mapStateToProps)(Header);
