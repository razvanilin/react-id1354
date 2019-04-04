const Comment = require("../models/Comment");
const User = require("../models/User");

class CommentController {
  constructor() {
    this.comment = Comment;
  }

  create(recipeId, userId, comment) {
    return this.comment.create({
      "message": comment.message,
      "recipe_id": recipeId,
      "user_id": userId,
    })
      .then((newComment) => {
        return this.findById(newComment.id);
      })
      .catch((error) => {
        return new Promise((resolve, reject) => reject(new Error(error.message)));
      });
  }

  findByRecipe(recipeId) {
    return this.comment.findAll({
      where: { recipe_id: recipeId },
      include: [{ model: User, attributes: ["id", "name"] }]
    })
      .then((comments) => {
        if (!comments) {
          return new Promise((resolve, reject) => reject(new Error(404)));
        }

        return comments;
      })
      .catch((error) => {
        return new Promise((resolve, reject) => reject(new Error(error.message)));
      });
  }

  findById(id) {
    return this.comment.findOne({
      where: { "id": id },
      include: [{ model: User, attributes: ["id", "name"] }]
    }).then((comment) => {
      if (!comment) return new Promise((resolve, reject) => reject(new Error(404)));
      return comment;
    }).catch((error) => {
      return new Promise((resolve, reject) => reject(error.message));
    });
  }

  update(id, data) {
    return this.comment.update(data, { where: { "id": id } })
      .then(() => this.findById(id))
      .catch((error) => {
        return new Promise((resolve, reject) => reject(new Error(error)));
      });
  }

  delete(id) {
    return this.comment.destroy({ where: { id } })
      .then(() => true)
      .catch((error) => {
        return new Promise((resolve, reject) => reject(error));
      });
  }
}

module.exports = CommentController;
