import React from "react";
import { Switch, Route } from "react-router-dom";
import Menu from "./Menu";
import Info from "./Info";
import App from "./App";

const Routers = () => (
    <Switch>
      <Route exact path="/" component={Menu} />
      <Route path="/info" component={Info} />
      <Route path="/app" component={App} />
    </Switch>
);

export default Routers;
