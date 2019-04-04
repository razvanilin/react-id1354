import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Dimmer, Loader, Message, Grid, Header, Form, Button, Comment,
} from "semantic-ui-react";

import {
  getRecipe as getRecipeAction, postComment as postCommentAction,
} from "../actions/recipe";
import RecipeCard from "../components/RecipeCard";
import MPComment from "../components/MPComment";
/*
  Description
*/
class Recipe extends Component {
  state = {
    newComment: "",
  }

  componentWillMount() {
    const { getRecipe, match } = this.props;
    getRecipe(match.params.recipeId);
  }

  _onChangeComment = (e, data) => {
    this.setState({ newComment: data.value });
  }

  _onSubmit = () => {
    const { postComment, match } = this.props;
    const { newComment } = this.state;
    if (!newComment) return;

    postComment(match.params.recipeId, newComment).then(() => {}).catch(() => {});
  }

  render() {
    const {
      recipe, loading, error, user
    } = this.props;
    const { newComment } = this.state;

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
        <Grid columns={2} stackable>
          <Grid.Column width={4}>
            <RecipeCard image={recipe.picture} title={recipe.title} />
          </Grid.Column>
          <Grid.Column width={12}>
            <Header as="h1" dividing>Description</Header>
            <p>{recipe.description}</p>

            <Comment.Group>
              <Header as="h3" dividing>
                Comments
              </Header>
              {user.id &&
                <Form reply size="small">
                  <Form.TextArea
                    rows={1}
                    placeholder="Write a comment"
                    onChange={this._onChangeComment}
                    value={newComment}
                  />
                  <Button
                    content="Add Comment"
                    labelPosition="left"
                    icon="edit"
                    primary
                    onClick={this._onSubmit}
                    disabled={newComment === ""}
                  />
                </Form>
              }

              {recipe.Comments && recipe.Comments.map((comment) => {
                return (
                  <MPComment key={comment.id} comment={comment} />
                );
              })}
              {recipe.Comments && recipe.Comments.length === 0 &&
                <i>No comments yet</i>
              }
            </Comment.Group>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    paddingTop: 10,
  },
};

Recipe.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  recipe: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  postComment: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    recipe: state.recipes.selected,
    user: state.user.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecipe: id => dispatch(getRecipeAction(id)),
    postComment: (id, data) => dispatch(postCommentAction(id, data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipe));
