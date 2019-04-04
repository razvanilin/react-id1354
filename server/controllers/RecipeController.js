const Recipe = require("../models/Recipe");
const Comment = require("../models/Comment");
const User = require("../models/User");

// this will be used to populate the payload of the recipes with comments
const includeCommentOpt = [{
  model: Comment,
  include: [{
    model: User,
    attributes: ["id", "name"],
  }],
}];

class RecipeController {
  constructor() {
    this.recipe = Recipe;
  }

  create(recipe) {
    return this.recipe.create(recipe)
      .then(newRecipe => newRecipe)
      .catch((error) => {
        return new Promise((resolve, reject) => reject(new Error(error.message)));
      });
  }

  find(ids) {
    // build the query - set the where attribute if ids is a populated array
    const conditions = Array.isArray(ids) && ids.length > 0 ? {
      where: ids,
    } : {};

    // make sure to include the comments as well
    // this works because the relationships were initialised in models/index.js
    conditions.include = includeCommentOpt;

    return this.recipe.findAll(conditions)
      .then((recipes) => {
        if (!recipes) return new Promise((resolve, reject) => reject(new Error(404)));
        return recipes;
      })
      .catch((error) => {
        return new Promise((resolve, reject) => reject(new Error(error.message)));
      });
  }

  findById(id) {
    return this.recipe.findOne({
      where: { "id": id },
      include: includeCommentOpt,
    }).then((recipe) => {
      if (!recipe) return new Promise((resolve, reject) => reject(new Error(404)));
      return recipe;
    }).catch((error) => {
      return new Promise((resolve, reject) => reject(error.message));
    });
  }

  update(id, data) {
    return this.recipe.update(data, { where: { "id": id } })
      .then(() => this.findById(id))
      .catch((error) => {
        return new Promise((resolve, reject) => reject(new Error(error)));
      });
  }

  delete(id) {
    return this.recipe.destroy({ where: { id } })
      .then(() => true)
      .catch((error) => {
        return new Promise((resolve, reject) => reject(error));
      });
  }
}

module.exports = RecipeController;
