const Sequelize = require("sequelize");
const sequelize = require("../db");
const User = require("../users/model")
const Ticket = require("../tickets/model")

const Comment = sequelize.define('comments', {
  content: {
    type: Sequelize.TEXT,
    field: "text_content",
    allowNull: false
  },
  ticketId: {
    type: Sequelize.INTEGER,
    field: 'ticketId',
    allowNull: false,
    primaryKey: true
  }
},
  {
    updatedAt: false
  }
)

module.exports = Comment;