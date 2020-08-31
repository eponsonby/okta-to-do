import React from "react";
import { withOktaAuth } from "@okta/okta-react";

class Home extends React.Component {
  state = {
    name: null,
    isAuthenticated: false,
  };

  async getUser() {
    this.state.isAuthenticated = this.props.authState.isAuthenticated;
    if (this.state.isAuthenticated) {
      let results = await this.props.authService.getUser();
      this.setState({ name: results.name });
    }
  }

  render() {
    this.getUser();
    if (this.state.name !== null) {
      return `Welcome ${this.state.name}!`;
    } else {
      return "Loading...";
    }
  }
}

export default withOktaAuth(Home);
