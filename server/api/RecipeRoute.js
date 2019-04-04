const RecipeController = require("../controllers/RecipeController");
const CommentController = require("../controllers/CommentController");
const verifyToken = require("../modules/verifyToken");

module.exports = (app) => {
  const recipeController = new RecipeController();
  const commentController = new CommentController();
  /*
  ** Route to create a new recipe
  */
  app.post("/recipe", (req, res) => {
    return recipeController.create(req.body)
      .then((recipe) => {
        return res.status(200).send(recipe);
      })
      .catch((error) => {
        return res.status(400).send(error);
      });
  });

  /*
  ** Route to get all recipes
  */
  app.get("/recipe", (req, res) => {
    return recipeController.find().then((recipes) => {
      return res.status(200).send(recipes);
    })
      .catch((error) => {
        return res.status(400).send(error);
      });
  });

  /*
  ** Route to get one recipe by ID
  */
  app.get("/recipe/:id", (req, res) => {
    return recipeController.findById(req.params.id)
      .then((recipe) => {
        return res.status(200).send(recipe);
      })
      .catch((error) => {
        return res.status(400).send(error);
      });
  });

  /*
  ** Route to update a recipe
  */
  app.put("/recipe/:id", (req, res) => {
    return recipeController.update(req.params.id, req.body)
      .then((newRecipe) => {
        return res.status(200).send(newRecipe);
      })
      .catch((error) => {
        return res.status(400).send(error);
      });
  });

  /*
  ** Route to create a new comment on a recipe
  */
  app.post("/recipe/:id/comment", verifyToken, (req, res) => {
    return commentController.create(req.params.id, req.user.id, req.body)
      .then(() => {
        return recipeController.findById(req.params.id);
      })
      .then((recipe) => {
        return res.status(200).send(recipe);
      })
      .catch((error) => {
        return res.status(400).send(error);
      });
  });

  /*
  ** Route to delete a comment
  */
  app.delete("/recipe/:id/comment/:commentId", verifyToken, (req, res) => {
    return commentController.delete(req.params.commentId)
      .then(() => {
        return recipeController.findById(req.params.id);
      })
      .then((recipe) => {
        return res.status(200).send(recipe);
      })
      .catch((error) => {
        return res.status(400).send(error);
      });
  });

  return (req, res, next) => {
    next();
  };
};
