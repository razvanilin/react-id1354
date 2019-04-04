import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Card, Dimmer, Loader, Message
} from "semantic-ui-react";

import RecipeCard from "../components/RecipeCard";
import { getRecipes as getRecipesAction } from "../actions/recipe";
/*
  Description
*/
class Recipes extends Component {
  componentWillMount() {
    const { getRecipes } = this.props;

    getRecipes().then(() => {})
      .catch(() => {});
  }

  _onCardClick = (id) => {
    const { history } = this.props;
    history.push(`recipe/${id}`);
  }

  render() {
    const { loading, error, recipes } = this.props;

    if (loading) {
      return (
        <div style={styles.container}>
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>
        </div>
      );
    }

    if (error) {
      return (
        <div style={styles.container}>
          <Message negative>
            <Message.Header>Oh Snap, server error!</Message.Header>
            <p>Please try refreshing the page.</p>
          </Message>
        </div>
      );
    }

    return (
      <div style={styles.container}>
        <Card.Group itemsPerRow={3}>
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              summary={recipe.description.substring(0, 50)}
              image={recipe.picture}
              onClick={() => this._onCardClick(recipe.id)}
            />
          ))}
        </Card.Group>
      </div>
    );
  }
}
const styles = {
  container: {
    flex: 1,
  },
};

Recipes.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  recipes: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.data,
    loading: state.recipes.loading,
    error: state.recipes.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecipes: () => dispatch(getRecipesAction()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipes));
