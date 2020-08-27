// new from https://developer.okta.com/code/react/okta_react_sign-in_widget/

import React, { Component } from "react";
import ReactDOM from "react-dom";
import OktaSignIn from "@okta/okta-signin-widget";
import { withOktaAuth } from "@okta/okta-react";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";

export default withOktaAuth(
  class OktaSignInWidget extends Component {
    constructor(props) {
      super(props);
      this.onSuccess = this.onSuccess.bind(this);
      this.onError = this.onError.bind(this);
    }

    onSuccess(res) {
      if (res.status === "SUCCESS") {
        return this.props.authService.redirect({
          sessionToken: res.session.token,
        });
      } else {
        // The user can be in another authentication state that requires further action.
        // For more information about these states, see:
        //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
      }
    }

    onError(err) {
      console.log("error logging in", err);
    }

    componentDidMount() {
      const el = ReactDOM.findDOMNode(this);
      this.widget = new OktaSignIn({
        baseUrl: this.props.baseUrl,
        authParams: {},
      });
      this.widget.renderEl({ el }, this.onSuccess, this.onError);
    }

    componentWillUnmount() {
      this.widget.remove();
    }

    render() {
      return <div />;
    }
  }
);
