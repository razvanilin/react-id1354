const user = require("./User");
const recipe = require("./Recipe");
const comment = require("./Comment");

// initialize sequelize entity relations
comment.belongsTo(user, { foreignKey: "user_id" });
recipe.hasMany(comment, { foreignKey: "recipe_id" });

module.exports = {
  user,
  recipe,
  comment,
};
