const Sequelize = require("sequelize");
const sequelize = require("../db");
const User = require("../users/model")
const Event = require("../events/model")

const Ticket = sequelize.define('tickets', {
  price: {
    type: Sequelize.DECIMAL(6, 2),
    field: "price",
    allowNull: false,
    validate: {
      notNull: {
        msg: "Must enter a valid price"
      }
    }
  },
  image: {
    type: Sequelize.TEXT,
    field: "image_url",
    validate: {
      isUrl: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    field: "description",
    allowNull: false,
    validate: {
      notNull: {
        msg: "Must enter a description"
      }
    }
  },
},
  {
    updatedAt: false
  }
)

Ticket.belongsTo(User)
Ticket.belongsTo(Event)

module.exports = Ticket;