import * as React from "react";
import { Link } from "react-router-dom";

const styles = require("./header.scss");

const Header = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.headerContainer}>
        <Link className={styles.headerLogo} to="/" />
        <ul className={styles.menuList}>
          <li>
            <a
              className={styles.menuItem}
              href="https://medium.com/pluto-network/introducing-plutos-proof-of-concept-prototype-41c4b871861b"
              target="_blank"
            >
              ABOUT
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
