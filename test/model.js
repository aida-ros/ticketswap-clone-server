const Sequelize = require("sequelize");
const sequelize = require("../db");

const Test = sequelize.define('testing', {
  column: {
    type: Sequelize.STRING,
    field: "user_name",
  },
  anothercolumn: {
    type: Sequelize.STRING,
    field: "user_somthing",
  }
})

module.exports = Test;