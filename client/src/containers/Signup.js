import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Grid, Header, Form, Image, Segment, Button, Message,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import logo from "../assets/logo_black.png";
import { signup as signupAction } from "../actions/user";

const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line

/*
  Description
*/
class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: "",
        email: "",
        password: "",
        passwordCheck: "",
      },
      errors: {},
    };

    this.validators = {
      name: (text) => { return text.length > 0 ? false : "Please enter your full name"; },
      email: (text) => { return emailRegEx.test(text) ? false : "Invalid email address"; },
      password: (text) => { return text.length >= 6 ? false : "Password has to be at least 6 characters long"; },
      passwordCheck: (text, password) => { return text === password ? false : "The passwords don't match"; },
    };
  }

  _onChangeName = (e, data) => {
    const { user, errors } = this.state;
    this.setState({
      user: { ...user, name: data.value },
    });

    // insert a delay for checking typing errors
    setTimeout(() => {
      this.setState({
        errors: { ...errors, name: this.validators.name(data.value) },
      });
    }, 1000);
  }

  _onChangeEmail = (e, data) => {
    const { user, errors } = this.state;
    this.setState({
      user: { ...user, email: data.value },
    });

    // insert a delay for checking typing errors
    setTimeout(() => {
      this.setState({
        errors: { ...errors, email: this.validators.email(data.value) },
      });
    }, 1000);
  }

  _onChangePassword = (e, data) => {
    const { user, errors } = this.state;
    this.setState({
      user: { ...user, password: data.value },
    });

    // insert a delay for checking typing errors
    setTimeout(() => {
      this.setState({
        errors: { ...errors, password: this.validators.password(data.value) },
      });
    }, 1000);
  }

  _onChangePasswordCheck = (e, data) => {
    const { user, errors } = this.state;
    this.setState({
      user: { ...user, passwordCheck: data.value },
    });

    // insert a delay for checking typing errors
    setTimeout(() => {
      this.setState({
        errors: {
          ...errors,
          passwordCheck: this.validators.passwordCheck(data.value, user.password)
        },
      });
    }, 1000);
  }

  _onSubmit = () => {
    const { signup, history } = this.props;
    const { user, errors } = this.state;

    this.setState({ errors: {}, error: false }, () => {
      if (errors.name || errors.email || errors.password || errors.passwordCheck
       || !user.name || !user.email || !user.password || !user.passwordCheck) {
        this.setState({
          errors: {
            ...errors,
            name: this.validators.name(user.name),
            email: this.validators.email(user.email),
            password: this.validators.password(user.password),
            passwordCheck: this.validators.passwordCheck(user.passwordCheck, user.password),
          },
        });
        return;
      }

      this.setState({ loading: true, error: false, errors: {} });
      signup(user)
        .then(() => {
          this.setState({ loading: false, error: false, errors: {} });
          history.push("/");
        })
        .catch(() => {
          this.setState({ loading: false, error: true });
        });
    });
  };

  render() {
    const {
      loading, error, errors, user,
    } = this.state;

    return (
      <div style={styles.container}>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" textAlign="center">
              <Image src={logo} />
              {" Sign up for a new account"}
            </Header>
            <Form size="large" loading={loading}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Your name"
                  value={user.name}
                  onChange={this._onChangeName}
                  error={!!errors.name}
                />
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail address"
                  value={user.email}
                  onChange={this._onChangeEmail}
                  error={!!errors.email}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={user.password}
                  onChange={this._onChangePassword}
                  error={!!errors.password}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm password"
                  type="password"
                  value={user.passwordCheck}
                  onChange={this._onChangePasswordCheck}
                  error={!!errors.passwordCheck}
                />

                <Button primary fluid size="large" onClick={this._onSubmit}>
                  Sign up!
                </Button>
              </Segment>
            </Form>

            <Message>
              {"You already have an account? "}
              <Link to="/login">Log in here</Link>
            </Message>
            {error &&
              <Message negative>
                There was an error with the request. Please try again.
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

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: data => dispatch(signupAction(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
