const DataTypes = require('sequelize');
const sequelize = require('../config/sequelize');

const Event = sequelize.define('Event',{
    title: {
        type:DataTypes.STRING,
        allowNull:false
    },
    description: {
        type:DataTypes.STRING,
        allowNull:false
    },
    ticket_price: {
        type:DataTypes.FLOAT,
        allowNull:false
    },
    starts_at: {
        type:DataTypes.DATE,
        allowNull:false
    },
    ends_at: {
        type:DataTypes.DATE,
        allowNull:false
    },
    contact_number: {
        type:DataTypes.STRING,
        allowNull:false
    },
});

Event.associate = function(models) {
    Event.belongsToMany(models.User,{through:'UserEvent'});//N-N
    Event.belongsTo(models.Location);//1-N
}

module.exports = Event;