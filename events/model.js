const Sequelize = require("sequelize");
const sequelize = require("../db");
const Ticket = require("../tickets/model")
const User = require('../users/model')

const Event = sequelize.define('events', {
  name: {
    type: Sequelize.STRING,
    field: "name",
    allowNull: false,
    validate: {
      notNull: {
        msg: "Must enter an eventname"
      }
    }
  },
  image: {
    type: Sequelize.STRING,
    field: "image_url",
    allowNull: false,
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
  start: {
    type: Sequelize.DATEONLY,
    field: "start_date",
    allowNull: false,
    validate: {
      isDate: true
    }
  },
  end: {
    type: Sequelize.DATEONLY,
    field: "end_date",
    allowNull: false,
    validate: {
      isDate: true
    }
  },
},
  {
    updatedAt: false
  }
)

// Event.belongsTo(User)
Event.hasMany(Ticket, { as: 'tickets', foreignKey: 'eventId'})

module.exports = Event;