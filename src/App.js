import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { CssBaseline, withStyles } from "@material-ui/core";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import AppHeader from "./components/AppHeader";
import Home from "./pages/Home";
import TasksManager from "./pages/TasksManager";
import Login from "./components/Login";
import OktaSignInWidget from "./components/OktaSignInWidget";
import config from "./components/config";

const styles = (theme) => ({
  main: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
    },
  },
});

const HasAccessToRouter = () => {
  const history = useHistory(); // example from react-router

  const customAuthHandler = () => {
    // Redirect to the /login page that has a CustomLoginComponent
    history.push("/login");
  };

  return (
    <Fragment>
      <Security {...config.oidc} onAuthRequired={customAuthHandler}>
        <CssBaseline />
        <AppHeader />
        {/* <main className={classes.main}> */}
        <Route path="/" exact component={Home} />
        <Route path="/implicit/callback" component={LoginCallback} />
        <Route path="/login" component={OktaSignInWidget} />
        <SecureRoute path="/tasks" component={TasksManager} />
        {/* <SecureRoute path="/profile" component={Profile} /> */}
        {/* </main> */}
      </Security>
    </Fragment>
  );
};

const App = ({ classes }) => (
  <div>
    <Router>
      <HasAccessToRouter />
    </Router>
  </div>
);

export default withStyles(styles)(App);
