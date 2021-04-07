const DataTypes = require('sequelize');
const sequelize = require('../config/sequelize');

const Cellphone = sequelize.define('Cellphone',{
    manufacturer: DataTypes.STRING,
    number: DataTypes.STRING
});

Cellphone.associate = function(models) {
    Cellphone.belongsTo(models.User);//1-1
};

module.exports = Cellphone;