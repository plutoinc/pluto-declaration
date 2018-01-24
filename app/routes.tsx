import * as React from "react";
import { Store } from "redux";
import { Route, Switch } from "react-router-dom";
import { IAppState } from "./reducers";
import "normalize.css";
import { Header, Footer } from "./components/layouts";
import { withStyles } from "./helpers/withStylesHelper";
import HomeComponent from "./components/home";

const styles = require("./root.scss");
interface IServerRoutesMap {
  path: string;
  component: any;
  exact?: boolean;
  loadData: (store: Store<IAppState>, params: any) => Promise<any> | null;
}

export const serverRootRoutes: IServerRoutesMap[] = [
  {
    path: "/",
    component: HomeComponent,
    loadData: null,
  },
];

@withStyles<typeof RootRoutes>(styles)
export class RootRoutes extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/" component={HomeComponent} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
