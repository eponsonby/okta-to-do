import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import AppWithRouterAccess from "./AppWithRouterAccess";

const styles = (theme) => ({
  main: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
    },
  },
});

const App = ({ classes }) => (
  <div>
    <main className={classes.main}>
      <Router>
        <AppWithRouterAccess />
      </Router>
    </main>
  </div>
);

export default withStyles(styles)(App);
