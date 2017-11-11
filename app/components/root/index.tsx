import * as React from "react";
// components
import { Header, Footer } from "../layouts";
// styles
import { withStyles } from "../../helpers/withStylesHelper";

const styles = require("./root.scss");

interface IRootComponentProps {}

@withStyles<typeof RootComponent>(styles)
export default class RootComponent extends React.PureComponent<IRootComponentProps, {}> {
  public render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
