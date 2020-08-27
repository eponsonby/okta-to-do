//new from https://developer.okta.com/code/react/okta_react_sign-in_widget/

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import OktaSignInWidget from "./OktaSignInWidget";
import { withOktaAuth } from "@okta/okta-react";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

export default withOktaAuth(
  class LoginMenu extends Component {
    constructor(props) {
      super(props);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
    }
    state = {
      menuAnchorEl: null,
    };

    async login() {
      this.props.authService.login("/");
    }

    async logout() {
      this.props.authService.logout("/");
      this.handleMenuClose();
    }

    handleMenuOpen = (event) =>
      this.setState({ menuAnchorEl: event.currentTarget });
    handleMenuClose = () => this.setState({ menuAnchorEl: null });

    render() {
      const { menuAnchorEl } = this.state;

      if (this.props.authState.isPending) return null;
      if (!this.props.authState.isAuthenticated)
        return (
          <Button onClick={this.login} color="inherit">
            Login
          </Button>
        );

      const menuPosition = {
        vertical: "top",
        horizontal: "right",
      };

      return (
        <div>
          <IconButton onClick={this.handleMenuOpen} color="inherit">
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            anchorOrigin={menuPosition}
            transformOrigin={menuPosition}
            open={!!menuAnchorEl}
            onClose={this.handleMenuClose}
          >
            <MenuItem onClick={this.logout}>
              <ListItemText primary="Logout" />
            </MenuItem>
          </Menu>
        </div>
      );
    }
  }
);
