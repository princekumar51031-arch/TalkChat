const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Message = sequelize.define("Message", {
  senderId: { type: DataTypes.INTEGER, allowNull: false },
  receiverId: { type: DataTypes.INTEGER, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: true },
  file: { type: DataTypes.TEXT, allowNull: true } // Base64 for images/videos
});

module.exports = Message;
