const Sequelize = require("sequelize");
const sequelize = require("../db");
const User = require("../users/model")
const Comment = require("../Comments/model")

const Ticket = sequelize.define('tickets', {
  price: {
    type: Sequelize.STRING,
    field: "price",
    allowNull: false
  },
  image: {
    type: Sequelize.TEXT,
    field: "image_url"
  },
  description: {
    type: Sequelize.TEXT,
    field: "description",
    allowNull: false,
  },
},
  {
    updatedAt: false
  }
)

Ticket.hasMany(Comment, { as: 'comments', foreignKey: 'ticketId'})
Ticket.belongsTo(User)


module.exports = Ticket;