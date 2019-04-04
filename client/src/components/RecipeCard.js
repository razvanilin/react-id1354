import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card, Label, Icon, Image, Container,
} from "semantic-ui-react";

import recipeImg from "../assets/recipe1.jpg";
/*
  Description
*/
class RecipeCard extends Component {
  render() {
    const {
      title, summary, image, onClick
    } = this.props;

    return (
      <Card link onClick={onClick}>
        <Card.Content style={styles.cardContent} onClick={() => {}}>
          <Label size="large" style={styles.peopleLabel}>
            <Icon name="star" />
            4.5
          </Label>
          <Image centered src={image} style={styles.cardImage} />
          <Container style={styles.cardInfo}>
            <Card.Header style={styles.cardHeader}>{title}</Card.Header>
            <Card.Meta style={styles.metaText}>
              {summary}
            </Card.Meta>
          </Container>
        </Card.Content>
      </Card>
    );
  }
}
const styles = {
  container: {
    flex: 1,
  },
  peopleLabel: {
    position: "absolute",
    left: 3,
    bottom: 10,
    backgroundColor: "transparent",
  },
  cardContent: {
    padding: 0,
    paddingBottom: 30,
  },
  cardImage: {
    borderRadius: 5,
  },
  metaText: {
    fontSize: "1.2em",
    paddingTop: 10,
    paddingBottom: 10,
  },
  cardHeader: {
    paddingTop: 20,
    fontSize: "1.8em",
  },
  cardInfo: {
    paddingLeft: 10,
    paddingRight: 10,
  },
};

RecipeCard.defaultProps = {
  summary: "",
  image: recipeImg,
  onClick: () => {},
};

RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string,
  image: PropTypes.string,
  onClick: PropTypes.func,
};

export default RecipeCard;
