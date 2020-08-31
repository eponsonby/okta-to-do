import React, { Component, Fragment } from "react";
import { withOktaAuth } from "@okta/okta-react";
import { withRouter, Route, Redirect, Link } from "react-router-dom";
import {
  withStyles,
  Typography,
  Fab,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { Delete as DeleteIcon, Add as AddIcon } from "@material-ui/icons";
import moment from "moment";
import { find, orderBy } from "lodash";
import { compose } from "recompose";

import TaskEditor from "../components/TaskEditor";
import ErrorSnackbar from "../components/ErrorSnackbar";

const styles = (theme) => ({
  tasks: {
    marginTop: theme.spacing(2),
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
});

const API = process.env.REACT_APP_API || "http://localhost:3001";

class TasksManager extends Component {
  state = {
    loading: true,
    tasks: [],
    error: null,
  };

  componentDidMount() {
    this.getTasks();
  }

  async fetch(method, endpoint, body) {
    try {
      const response = await fetch(`${API}${endpoint}`, {
        method,
        headers: {
          // "Content-Type": "application/json",
          // accept: "application/json",
          Authorization: "Bearer " + this.props.authState.accessToken,
        },
        body: body && JSON.stringify(body),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      this.setState({ error });
    }
  }

  async getTasks() {
    this.setState({
      loading: false,
      tasks: (await this.fetch("get", "/tasks")) || [],
    });
  }

  saveTask = async (task) => {
    if (task.id) {
      await this.fetch("put", `/tasks/${task.id}`, task);
    } else {
      await this.fetch("post", "/tasks", task);
    }

    this.props.history.goBack();
    this.getTasks();
  };

  async deleteTask(task) {
    if (window.confirm(`Are you sure you want to delete "${task.title}"`)) {
      await this.fetch("delete", `/tasks/${task.id}`);
      this.getTasks();
    }
  }

  renderTaskEditor = ({
    match: {
      params: { id },
    },
  }) => {
    if (this.state.loading) return null;
    const task = find(this.state.tasks, { id: Number(id) });

    if (!task && id !== "new") return <Redirect to="/tasks" />;

    return <TaskEditor task={task} onSave={this.saveTask} />;
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Typography variant="h4">To do</Typography>
        {this.state.tasks.length > 0 ? (
          <Paper elevation={1} className={classes.tasks}>
            <List>
              {orderBy(
                this.state.tasks,
                ["updatedAt", "title"],
                ["desc", "asc"]
              ).map((task) => (
                <ListItem
                  key={task.id}
                  button
                  component={Link}
                  to={`/tasks/${task.id}`}
                >
                  <ListItemText
                    primary={task.title}
                    secondary={
                      task.updatedAt &&
                      `Updated ${moment(task.updatedAt).fromNow()}`
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => this.deleteTask(task)}
                      color="inherit"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          !this.state.loading && (
            <Typography variant="subtitle1">No tasks to display</Typography>
          )
        )}
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          component={Link}
          to="/tasks/new"
        >
          <AddIcon />
        </Fab>
        <Route exact path="/tasks/:id" render={this.renderTaskEditor} />
        {this.state.error && (
          <ErrorSnackbar
            onClose={() => this.setState({ error: null })}
            message={this.state.error.message}
          />
        )}
      </Fragment>
    );
  }
}

export default compose(
  withOktaAuth,
  withRouter,
  withStyles(styles)
)(TasksManager);
