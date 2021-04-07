const DataTypes = require('sequelize');
const sequelize = require('../config/sequelize');

const Location = sequelize.define('Location',{
    address: DataTypes.STRING
});

Location.associate = function(models) {
    Location.hasMany(models.Event);//1-N
};

module.exports = Location;