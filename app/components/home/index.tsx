import * as React from "react";
import Helmet from "react-helmet";
import { withStyles } from "../../helpers/withStylesHelper";
import JoinForm from "../joinForm";
import UserList from "../userList";
import Declaration from "../declaration/index";

const styles = require("./home.scss");

interface IHomeComponentProps {}

@withStyles<typeof HomeComponent>(styles)
export default class HomeComponent extends React.PureComponent<IHomeComponentProps, {}> {
  public render() {
    return (
      <div className={styles.homeWrapper}>
        <Helmet title="Join Pluto Network!" />
        <Declaration />
        <JoinForm />
        <UserList />
      </div>
    );
  }
}
