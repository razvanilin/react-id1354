const Sequelize = require("sequelize");
const db = require("../modules/dbConnection");

const Comment = db.define("Comment", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  recipe_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    reference: {
      model: "Recipe",
      key: "id",
      onDelete: "cascade",
    },
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    reference: {
      model: "User",
      key: "id",
      onDelete: "cascade",
    },
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  },
}, {
  freezeTableName: true
});

module.exports = Comment;
