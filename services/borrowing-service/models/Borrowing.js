const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const Borrowing = sequelize.define('Borrowing', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  borrowDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isReturned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Borrowing;
