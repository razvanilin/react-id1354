import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router";
import {
  Menu, Container, Image, Dropdown, Button, Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import Recipes from "./Recipes";
import Login from "./Login";
import Signup from "./Signup";
import Recipe from "./Recipe";
import { relog as relogAction, logout as logoutAction } from "../actions/user";
import logo from "../assets/logo_white.png";

/*
  Description
*/
class Main extends Component {
  componentWillMount() {
    const { relog } = this.props;
    relog().then(() => {}).catch(() => {});
  }

  _onLogout = () => {
    const { logout, history } = this.props;
    logout();
    setTimeout(() => { history.push("/"); }, 100);
  }

  render() {
    const { user } = this.props;

    return (
      <div style={styles.container}>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as={Link} to="/" header>
              <Image size="mini" src={logo} style={{ marginRight: "1.5em" }} />
              Meal Planner
            </Menu.Item>
            <Menu.Item as={Link} to="/">Recipes</Menu.Item>
            <Menu.Item
              as={Link}
              to={user.id ? "/planner" : {
                pathname: "/login",
                state: {
                  loginToPlaner: true,
                },
              }}
            >
              Your plan
            </Menu.Item>

            <Menu.Menu position="right">
              {user.id &&
                <Dropdown item simple text={user.name}>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={this._onLogout}>
                      <Icon name="sign-out" />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              }
              {!user.id &&
                <Menu.Item>
                  <Button primary as={Link} to="/signup">Sign Up</Button>
                  <Button basic inverted style={styles.btnSpacing} as={Link} to="/login">Login</Button>
                </Menu.Item>
              }
            </Menu.Menu>
          </Container>
        </Menu>
        <Container style={styles.mainContentContainer}>
          <Switch>
            <Route exact path="/" component={Recipes} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/recipe/:recipeId" component={Recipe} />
          </Switch>
        </Container>
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  mainContentContainer: {
    marginTop: "5em",
  },
  btnSpacing: {
    marginLeft: 10,
  },
};

Main.propTypes = {
  user: PropTypes.object.isRequired,
  relog: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    relog: () => dispatch(relogAction()),
    logout: () => dispatch(logoutAction()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
