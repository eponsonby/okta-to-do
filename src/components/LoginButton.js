// import React, { Component } from "react";
// import {
//   Button,
//   IconButton,
//   Menu,
//   MenuItem,
//   ListItemText,
// } from "@material-ui/core";
// import { AccountCircle } from "@material-ui/icons";
// import { withOktaAuth } from "@okta/okta-react";
// import { useHistory } from "react-router-dom";

// class LoginButton extends Component {
//   state = {
//     menuAnchorEl: null,
//   };

//   logout = () => {
//     this.handleMenuClose();
//   };

//   handleMenuOpen = (event) =>
//     this.setState({ menuAnchorEl: event.currentTarget });
//   handleMenuClose = () => this.setState({ menuAnchorEl: null });

//   routeChange = () => {
//     let path = "./login";
//     let history = useHistory();
//     history.push(path);
//   };

//   render() {
//     const { menuAnchorEl } = this.state;
//     console.log(this.props.authState);
//     if (this.props.authState.isPending) return null;
//     if (!this.props.authState.isAuthenticated)
//       return (
//         <Button color="inherit" onClick={this.routeChange}>
//           Login
//         </Button>
//       );

//     const menuPosition = {
//       vertical: "top",
//       horizontal: "right",
//     };

//     return (
//       <div>
//         <IconButton onClick={this.handleMenuOpen} color="inherit">
//           <AccountCircle />
//         </IconButton>
//         <Menu
//           anchorEl={menuAnchorEl}
//           anchorOrigin={menuPosition}
//           transformOrigin={menuPosition}
//           open={!!menuAnchorEl}
//           onClose={this.handleMenuClose}
//         >
//           <MenuItem onClick={this.logout}>
//             <ListItemText primary="Logout" />
//           </MenuItem>
//         </Menu>
//       </div>
//     );
//   }
// }

// export default withOktaAuth(LoginButton);
