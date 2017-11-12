import * as React from "react";
const styles = require("./icons.scss");

interface IIconProps extends React.SVGAttributes<SVGElement> {
  icon: string;
}

const ICONS: { [key: string]: any } = {
  FACEBOOK: require("./facebook.svg").default,
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
      return (
        <img className={className} src={`https://d103giazgvc1eu.cloudfront.net/${imgSrc}`} alt={this.props.icon} />
      );
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
