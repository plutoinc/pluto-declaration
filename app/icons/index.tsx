import * as React from "react";
import { PLUTO_DECLARATION_ASSET_S3 } from "../server";
const styles = require("./icons.scss");

interface IIconProps extends React.SVGAttributes<SVGElement> {
  icon: string;
}

const ICONS: { [key: string]: any } = {
  AFFILIATION: require("./affiliation.svg").default,
  EMAIL: require("./email.svg").default,
  FACEBOOK: require("./facebook.svg").default,
  MOBILE_MENU_OPEN: require("./mobile-menu-open.svg").default,
  MOBILE_MENU_CLOSE: require("./mobile-menu-close.svg").default,
  NAME: require("./name.svg").default,
  SHARE: require("./share.svg").default,
  TWITTER: require("./twitter.svg").default,
};

class Icon extends React.PureComponent<IIconProps, {}> {
  public render() {
    let className = styles.icon;
    if (this.props.className) {
      className += ` ${this.props.className}`;
    }

    const imgSrc = ICONS[this.props.icon];
    if (!imgSrc) {
      return <i className={className}>{imgSrc}</i>;
    } else if (typeof imgSrc === "string") {
      return <img className={className} src={`${PLUTO_DECLARATION_ASSET_S3}/${imgSrc}`} alt={this.props.icon} />;
    } else {
      const icon = `
      <svg viewBox="${imgSrc.viewBox}">
        <use xlink:href="#${imgSrc.id}" />
      </svg>`;

      return <i className={className} dangerouslySetInnerHTML={{ __html: icon }} />;
    }
  }
}

export default Icon;
