import React, { Fragment } from "react";
import { Route, useHistory } from "react-router-dom";
import { CssBaseline, withStyles } from "@material-ui/core";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";
import AppHeader from "./components/AppHeader";
import Home from "./pages/Home";
import TasksManager from "./pages/TasksManager";
import Login from "./components/Login";
import OktaSignInWidget from "./components/OktaSignInWidget";

const styles = (theme) => ({
  main: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
    },
  },
});

const App = ({ classes }) => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push("/login");
  };

  return (
    <Fragment>
      <Security
        issuer="https://dev-803649.okta.com/oauth2/default"
        clientId="0oarwz3sbXzZHxTVJ4x6"
        redirectUri="http://localhost:3000/implicit/callback"
        scopes={["openid", "profile", "email"]}
        onAuthRequired={onAuthRequired}
        pkce={true}
      >
        <CssBaseline />
        <AppHeader />
        <main className={classes.main}>
          <Route exact path="/" component={Home} />
          <SecureRoute path="/tasks" component={TasksManager} />
          <Route path="/login" component={Login} />
          <Route path="/implicit/callback" component={ImplicitCallback} />
        </main>
      </Security>
    </Fragment>
  );
};
export default withStyles(styles)(App);
