const Sequelize = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define('users', {
  username: {
    type: Sequelize.STRING,
    field: "username",
    allowNull: false,
    validate: {
      notNull: {
        msg: "Must enter a username"
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    field: "password",
    allowNull: false
  }
},
  {
    updatedAt: false,
    createdAt: false
  }
)


module.exports = User;