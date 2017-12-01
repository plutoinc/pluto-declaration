import * as React from "react";
import { Store } from "redux";
import { Route, Switch } from "react-router-dom";
// containers
import Root from "./components/root";
import HomeComponent from "./components/home";
import { IAppState } from "./rootReducer";

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
    loadData: null
  }
];

export const RootRoutes = () => (
  <div>
    <Root>
      <Switch>
        <Route path="/" component={HomeComponent} />
      </Switch>
    </Root>
  </div>
);
