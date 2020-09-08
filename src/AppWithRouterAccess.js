import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import Home from "./pages/Home";
import AppHeader from "./components/AppHeader";
import TasksManager from "./pages/TasksManager";
import OktaSignInWidget from "./components/OktaSignInWidget";
import config from "./components/config";
import { CssBaseline } from "@material-ui/core";

export default withRouter(
  class AppWithRouterAccess extends Component {
    constructor(props) {
      super(props);
      this.onAuthRequired = this.onAuthRequired.bind(this);
    }

    onAuthRequired() {
      this.props.history.push("/login");
    }

    render() {
      return (
        <Security {...config.oidc} onAuthRequired={this.onAuthRequired}>
          <CssBaseline />
          <AppHeader />
          <SecureRoute path="/" exact component={Home} />
          <Route path="/implicit/callback" component={LoginCallback} />
          <Route path="/login" exact component={OktaSignInWidget} />
          <SecureRoute
            path="/tasks"
            component={TasksManager}
            onAuthRequired={this.onAuthRequired}
          />
        </Security>
      );
    }
  }
);
