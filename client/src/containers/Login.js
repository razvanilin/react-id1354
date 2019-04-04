import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import {
  Grid, Header, Form, Image, Segment, Button, Message,
} from "semantic-ui-react";

import { login as loginAction } from "../actions/user";
import logo from "../assets/logo_black.png";

/*
  Description
*/
class Login extends Component {
  state = {
    user: {
      email: "",
      password: "",
    },
  }

  _onChangeEmail = (e, data) => {
    const { user } = this.state;
    this.setState({
      user: { ...user, email: data.value },
    });
  }

  _onChangePassword = (e, data) => {
    const { user } = this.state;
    this.setState({
      user: { ...user, password: data.value },
    });
  }

  _onSubmit = () => {
    const { user } = this.state;
    const { login, history } = this.props;

    if (!user.email || !user.password) {
      this.setState({ error: true });
      return;
    }

    this.setState({ loading: true });
    login(user).then(() => {
      this.setState({ loading: false, error: false });
      history.push("/");
    })
      .catch(() => {
        this.setState({ loading: false, error: true });
      });
  }

  render() {
    const { location } = this.props;
    const { user, error, loading } = this.state;

    return (
      <div style={styles.container}>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            {location.state && location.state.loginToPlaner &&
              <Message info>
                {"You need to be logged in to access your meal planner. "}
              </Message>
            }
            <Header as="h2" textAlign="center">
              <Image src={logo} />
              {" Log-in to your account"}
            </Header>
            <Form size="large" loading={loading}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail address"
                  value={user.email}
                  onChange={this._onChangeEmail}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={user.password}
                  onChange={this._onChangePassword}
                />

                <Button primary fluid size="large" onClick={this._onSubmit}>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              {"You don't have an account yet? "}
              <Link to="/signup">Sign Up</Link>
            </Message>
            {error &&
              <Message negative>
                Wrong email or password
              </Message>
            }
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    marginTop: "10em",
  },
};

Login.propTypes = {
  location: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: data => dispatch(loginAction(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
