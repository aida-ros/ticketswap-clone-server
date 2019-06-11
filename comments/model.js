const Sequelize = require("sequelize");
const sequelize = require("../db");
const User = require("../users/model")
const Ticket = require("../tickets/model")

const Comment = sequelize.define('comments', {
  content: {
    type: Sequelize.TEXT,
    field: "text_content",
    allowNull: false,
    validate: {
      notNull: {
        msg: "Cannot submit an empty"
      }
    }
  },
},
  {
    updatedAt: false
  }
)

Comment.belongsTo(User)
Comment.belongsTo(Ticket)

module.exports = Comment;